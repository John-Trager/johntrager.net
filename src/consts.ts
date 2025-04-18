import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "John Trager",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "John Trager | Software Engineer",
  DESCRIPTION: "Portfolio of John Trager, a systems-focused software engineer building high-performance tools.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "John Trager's blog, where he shares his thoughts on life, tech, and more.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where John Trager has worked and what he has done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of John Trager's projects, with links to demos and repos.",
};

export const SOCIALS: Socials = [
  { 
    NAME: "github",
    HREF: "https://github.com/John-Trager"
  },
  { 
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/john-trager/",
  }
];
