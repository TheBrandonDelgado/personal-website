/** A social or contact link. */
export interface SocialLink {
  name: string;
  username: string;
  link: string;
  /** Same-origin download filename. External profiles omit this. */
  download?: string;
}

/** A portfolio project. Copy stays in data.ts so proof pages can cite it. */
export interface Project {
  year: string;
  title?: string;
  company: string;
  link: string;
  description: string;
  technologies: readonly string[];
}

/** A work-experience entry. `type` and `link` are optional. */
export interface ExperienceEntry {
  years: string;
  title: string;
  company: string;
  type?: string;
  link?: string;
  descriptions: readonly string[];
  technologies: readonly string[];
}
