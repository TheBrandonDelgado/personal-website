/** Scheduler center, shared with the CSS spin origin in App.css. */
const CX = 318;
const CY = 268;

function bezier(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

const FACILITY_Y = [72, 166, 260, 354, 448];

export default function DispatchDiagram() {
  const queueX = 28;
  return (
    <svg
      viewBox="0 0 920 560"
      role="img"
      aria-labelledby="dispatch-title dispatch-desc"
      className="h-full w-full"
    >
      <title id="dispatch-title">Dispatch across five facilities</title>
      <desc id="dispatch-desc">
        Commands leave a Redis queue, pass through a scheduler, and arrive at five
        facilities, throttled at each one.
      </desc>
      <defs>
        <radialGradient id="scheduler-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ff5a1f" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ff5a1f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2622" />
          <stop offset="1" stopColor="#121113" />
        </linearGradient>
      </defs>

      {Array.from({ length: 7 }, (_, index) => {
        const hot = index >= 5;
        return (
          <rect
            key={index}
            x={queueX}
            y={CY - 92 + index * 24}
            width={120}
            height={16}
            rx={2}
            fill={hot ? "#ff5a1f" : "none"}
            stroke={hot ? "#ff5a1f" : "#4a463f"}
          />
        );
      })}
      <text x={queueX} y={520} fill="#ffb27a" fontFamily="JetBrains Mono, monospace" fontSize={12} letterSpacing={2}>
        01 · QUEUE
      </text>
      <text x={queueX} y={540} fill="#cfc7ba" fontFamily="Inter Tight, sans-serif" fontSize={14}>
        Redis, in order
      </text>

      <line x1={queueX + 128} y1={CY} x2={CX - 64} y2={CY} stroke="#4a463f" />

      <circle cx={CX} cy={CY} r={120} fill="url(#scheduler-glow)" />
      <circle cx={CX} cy={CY} r={76} fill="none" stroke="#4a463f" strokeDasharray="2 6" />
      <circle cx={CX} cy={CY} r={58} fill="none" stroke="#ff5a1f" strokeWidth={1.4} />
      <line className="diagram-hand" x1={CX} y1={CY} x2={CX} y2={CY - 48} stroke="#ffd2ae" strokeWidth={2} />
      <text x={CX - 52} y={520} fill="#ffb27a" fontFamily="JetBrains Mono, monospace" fontSize={12} letterSpacing={2}>
        02 · SCHEDULER
      </text>
      <text x={CX - 52} y={540} fill="#cfc7ba" fontFamily="Inter Tight, sans-serif" fontSize={14}>
        sends everywhere
      </text>

      <text x={560} y={36} fill="#ffb27a" fontFamily="JetBrains Mono, monospace" fontSize={12} letterSpacing={2}>
        03 · THROTTLE, EACH FACILITY
      </text>

      {FACILITY_Y.map((y, index) => {
        const endX = 760;
        const c1x = CX + 190;
        const c2x = endX - 180;
        const startX = CX + 62;
        const d = `M${startX} ${CY} C${c1x} ${CY}, ${c2x} ${y}, ${endX - 16} ${y}`;
        return (
          <g key={y}>
            <path className="diagram-flow" d={d} fill="none" stroke="#3a3631" strokeWidth={1.2} />
            {[0.42, 0.68].map((t) => (
              <circle
                key={t}
                cx={bezier(t, startX, c1x, c2x, endX - 16)}
                cy={bezier(t, CY, CY, y, y)}
                r={3}
                fill="#ffd2ae"
              />
            ))}
            <rect x={endX - 28} y={y - 12} width={6} height={24} fill="#ff5a1f" />
            <rect x={endX - 8} y={y - 26} width={40} height={52} fill="url(#rack)" stroke="#4a463f" />
            {Array.from({ length: 4 }, (_, row) => (
              <line
                key={row}
                x1={endX}
                y1={y - 16 + row * 10}
                x2={endX + 24}
                y2={y - 16 + row * 10}
                stroke="#ff9a66"
                strokeOpacity={0.7}
              />
            ))}
            <text x={endX + 42} y={y + 4} fill="#f1ebe1" fontFamily="JetBrains Mono, monospace" fontSize={12}>
              {`DC-0${index + 1}`}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
