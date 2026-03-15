#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// --- Config ---
const exportDir = process.argv[2] || path.join(__dirname, '..', 'linkedin-export');
const csvPath = path.join(exportDir, 'Positions.csv');
const dataPath = path.join(__dirname, '..', 'src', 'data', 'data.js');

// --- Phase 1: Parse Positions.csv ---

function parseCsv(raw) {
    // Strip BOM and normalize line endings
    const text = raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    const rows = [];
    let row = [];
    let field = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const next = text[i + 1];

        if (inQuotes) {
            if (ch === '"' && next === '"') {
                // Escaped quote
                field += '"';
                i++;
            } else if (ch === '"') {
                inQuotes = false;
            } else {
                field += ch;
            }
        } else {
            if (ch === '"') {
                inQuotes = true;
            } else if (ch === ',') {
                row.push(field);
                field = '';
            } else if (ch === '\n') {
                row.push(field);
                field = '';
                if (row.some(f => f !== '')) {
                    rows.push(row);
                }
                row = [];
            } else {
                field += ch;
            }
        }
    }

    // Handle final field/row
    if (field || row.length) {
        row.push(field);
        if (row.some(f => f !== '')) {
            rows.push(row);
        }
    }

    if (rows.length === 0) return [];

    const headers = rows[0].map(h => h.trim());
    return rows.slice(1).map(cols => {
        const obj = {};
        headers.forEach((h, i) => {
            obj[h] = (cols[i] || '').trim();
        });
        return obj;
    });
}

// --- Phase 2: Format dates ---

function formatYear(dateStr) {
    if (!dateStr || !dateStr.trim()) return 'present';
    const parts = dateStr.trim().split(' ');
    return parts[parts.length - 1];
}

function formatYears(startStr, endStr) {
    const start = formatYear(startStr);
    const end = formatYear(endStr);
    if (end === 'present') return `${start} - present`;
    if (start === end) return start;
    return `${start} - ${end}`;
}

// --- Phase 3: Extract existing data from data.js ---

function extractExistingEntries(content) {
    const startMarker = 'export const experience = [';
    const startIdx = content.indexOf(startMarker);
    if (startIdx === -1) return [];

    const block = content.slice(startIdx);

    // Split on top-level object boundaries
    const entries = [];
    let depth = 0;
    let inObj = false;
    let objStart = -1;

    for (let i = 0; i < block.length; i++) {
        const ch = block[i];
        if (ch === '{') {
            if (!inObj) {
                inObj = true;
                objStart = i;
            }
            depth++;
        } else if (ch === '}') {
            depth--;
            if (inObj && depth === 0) {
                entries.push(block.slice(objStart, i + 1));
                inObj = false;
                objStart = -1;
            }
        }
    }

    return entries.map(entry => {
        const companyMatch = entry.match(/company:\s*"((?:[^"\\]|\\.)*)"/);
        const linkMatch = entry.match(/link:\s*"((?:[^"\\]|\\.)*)"/);
        const techMatch = entry.match(/technologies:\s*\[([\s\S]*?)\]/);

        const company = companyMatch ? companyMatch[1] : null;
        const link = linkMatch ? linkMatch[1] : null;

        let technologies = [];
        if (techMatch) {
            technologies = techMatch[1]
                .split(',')
                .map(t => t.replace(/"/g, '').trim())
                .filter(t => t.length > 0);
        }

        return { company, link, technologies };
    }).filter(e => e.company);
}

// --- Phase 4: Merge ---

function mergeEntries(positions, existing) {
    const existingMap = new Map();
    existing.forEach(e => {
        existingMap.set(e.company.toLowerCase().trim(), e);
    });

    return positions.map(pos => {
        const key = (pos['Company Name'] || '').toLowerCase().trim();
        const found = existingMap.get(key);

        const descriptions = (pos['Description'] || '')
            .split('\n')
            .map(l => l.trim())
            .filter(l => l.length > 0);

        const entry = {
            years: formatYears(pos['Started On'], pos['Finished On']),
            title: pos['Title'] || '',
            company: pos['Company Name'] || '',
            descriptions,
            technologies: found ? found.technologies : [],
        };

        if (found && found.link) {
            entry.link = found.link;
        }

        return entry;
    });
}

// --- Phase 5: Serialize and rewrite data.js ---

function serializeExperience(entries) {
    const lines = ['export const experience = ['];

    entries.forEach((entry, idx) => {
        lines.push('    {');
        lines.push(`        years: ${JSON.stringify(entry.years)},`);
        lines.push(`        title: ${JSON.stringify(entry.title)},`);
        lines.push(`        company: ${JSON.stringify(entry.company)},`);

        if (entry.link) {
            lines.push(`        link: ${JSON.stringify(entry.link)},`);
        }

        if (entry.descriptions.length === 0) {
            lines.push('        descriptions: [],');
        } else {
            lines.push('        descriptions: [');
            entry.descriptions.forEach(d => {
                lines.push(`            ${JSON.stringify(d)},`);
            });
            lines.push('        ],');
        }

        if (entry.technologies.length === 0) {
            lines.push('        technologies: [],');
        } else {
            lines.push('        technologies: [');
            entry.technologies.forEach(t => {
                lines.push(`            ${JSON.stringify(t)},`);
            });
            lines.push('        ],');
        }

        lines.push('    }' + (idx < entries.length - 1 ? ',' : ''));
    });

    lines.push('];');
    return lines.join('\n');
}

// --- Main ---

if (!fs.existsSync(csvPath)) {
    console.error(`Error: Positions.csv not found at ${csvPath}`);
    console.error('Download your LinkedIn data export and place it at ./linkedin-export/ (or pass path as argument).');
    process.exit(1);
}

const csvRaw = fs.readFileSync(csvPath, 'utf8');
const positions = parseCsv(csvRaw);

if (positions.length === 0) {
    console.error('Error: No positions found in Positions.csv.');
    process.exit(1);
}

const content = fs.readFileSync(dataPath, 'utf8');
const existing = extractExistingEntries(content);
const merged = mergeEntries(positions, existing);
const serialized = serializeExperience(merged);

const startIdx = content.indexOf('export const experience = [');
const endIdx = content.lastIndexOf('];') + 2;

const newContent = content.slice(0, startIdx) + serialized + '\n';
fs.writeFileSync(dataPath, newContent, 'utf8');

console.log(`Updated ${merged.length} experience entries.`);
