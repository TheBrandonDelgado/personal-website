import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

/** A single technology chip with its FontAwesome icon (used in portfolio cards). */
export interface ProjectTechnology {
  name: string;
  icon: IconDefinition;
}

/** A social/contact link rendered in the hero Links row. */
export interface SocialLink {
  name: string;
  username: string;
  link: string;
  icon: IconDefinition;
}

/** A portfolio project card. `title` is optional — JAN3 omits it and the
 *  card falls back to `company` (project.title || project.company). */
export interface Project {
  year: string;
  title?: string;
  company: string;
  image: string;
  link: string;
  description: string;
  technologies: ProjectTechnology[];
}

/** A work-experience timeline entry. `type` and `link` are optional —
 *  the component guards both (job.type && ..., job.link ? ... : ...). */
export interface ExperienceEntry {
  years: string;
  title: string;
  company: string;
  type?: string;
  link?: string;
  descriptions: string[];
  technologies: string[];
}
