/**
 * Structured Data (JSON-LD) generators using only verified authentic portfolio data.
 */

import { getSiteUrl } from "./seo.js";

/**
 * Generate Person schema for Jagmohan Singh
 */
export function getPersonSchema(profile) {
  const siteUrl = getSiteUrl();
  const avatarUrl = profile?.avatar
    ? (profile.avatar.startsWith("http") || profile.avatar.startsWith("data:")
        ? profile.avatar
        : `${siteUrl}/images/${profile.avatar.startsWith("/") ? profile.avatar.slice(1) : profile.avatar}`)
    : `${siteUrl}/images/profile.webp`;

  const sameAs = [];
  if (profile?.contact?.linkedin?.href) {
    sameAs.push(profile.contact.linkedin.href);
  } else if (profile?.linkedin) {
    sameAs.push(profile.linkedin);
  }
  if (profile?.contact?.github?.href) {
    sameAs.push(profile.contact.github.href);
  } else if (profile?.github) {
    sameAs.push(profile.github);
  }

  const skillsList = Array.isArray(profile?.skills) && profile.skills.length > 0
    ? profile.skills
    : ["Web Design", "Front-End Development", "WordPress", "WooCommerce", "React", "Tailwind CSS", "Bootstrap", "HTML", "CSS"];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile?.name || "Jagmohan Singh",
    jobTitle: profile?.headline || "Web Designer & Front-End Developer",
    description: profile?.about || "Web Designer & Front-End Developer with 3+ years of experience building responsive, modern websites.",
    url: siteUrl,
    image: avatarUrl,
    sameAs,
    knowsAbout: skillsList,
    worksFor: {
      "@type": "Organization",
      name: profile?.company || "SkyFish Development",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delhi",
      addressCountry: "IN",
    },
  };
}

/**
 * Generate WebSite schema
 */
export function getWebSiteSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jagmohan Singh Portfolio",
    url: siteUrl,
    description: "Professional portfolio of Jagmohan Singh — Web Designer & Front-End Developer specializing in WordPress, WooCommerce, React, and Tailwind CSS.",
    author: {
      "@type": "Person",
      name: "Jagmohan Singh",
    },
  };
}

/**
 * Generate CreativeWork schema for a single project
 */
export function getProjectSchema(project) {
  if (!project) return null;
  const siteUrl = getSiteUrl();
  const projectUrl = `${siteUrl}/projects/${project.slug}`;
  const imageUrl = project.image
    ? (project.image.startsWith("http") ? project.image : `${siteUrl}${project.image.startsWith("/") ? "" : "/"}${project.image}`)
    : `${siteUrl}/images/profile.webp`;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.description || project.overview,
    url: projectUrl,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: "Jagmohan Singh",
      url: siteUrl,
    },
    genre: project.category || "Web Development",
    keywords: Array.isArray(project.technologies) ? project.technologies.join(", ") : undefined,
  };
}

/**
 * Generate BreadcrumbList schema for nested routes (e.g. Projects -> Project Detail)
 */
export function getBreadcrumbSchema(items) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http") ? item.path : `${siteUrl}${item.path.startsWith("/") ? "" : "/"}${item.path}`,
    })),
  };
}
