import { useEffect } from "react";
import { getSiteUrl } from "../utils/seo.js";

/**
 * Helper to update or create a <meta> tag by name or property
 */
function setMetaTag(attribute, key, content) {
  if (!content) {
    const existing = document.querySelector(`meta[${attribute}="${key}"]`);
    if (existing) existing.remove();
    return;
  }
  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

/**
 * Helper to update or create a <link rel="..."> tag
 */
function setLinkTag(rel, href) {
  if (!href) {
    const existing = document.querySelector(`link[rel="${rel}"]`);
    if (existing) existing.remove();
    return;
  }
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

/**
 * Reusable SEO component for React SPA.
 * Manages document title, meta description, canonical URL, OpenGraph,
 * Twitter Card, robots directives, and structured data (JSON-LD).
 */
export default function SEO({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage,
  noindex = false,
  schema = null,
}) {
  useEffect(() => {
    const siteUrl = getSiteUrl();
    const defaultTitle = "Jagmohan Singh | Web Designer & Front-End Developer";
    const defaultDescription =
      "Personal portfolio of Jagmohan Singh, a Web Designer and Front-End Developer with 3+ years experience building responsive websites with WordPress, WooCommerce, React, and Tailwind CSS.";
    const defaultImage = `${siteUrl}/images/profile.webp`;

    const finalTitle = title || defaultTitle;
    const finalDescription = description || defaultDescription;
    const finalImage = ogImage
      ? ogImage.startsWith("http")
        ? ogImage
        : `${siteUrl}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`
      : defaultImage;

    // Resolve Canonical URL
    let finalCanonical = "";
    if (canonical) {
      finalCanonical = canonical.startsWith("http")
        ? canonical
        : `${siteUrl}${canonical.startsWith("/") ? "" : "/"}${canonical}`;
    } else if (typeof window !== "undefined") {
      finalCanonical = `${siteUrl}${window.location.pathname}`;
    }

    // 1. Document Title
    document.title = finalTitle;

    // 2. Standard Meta Tags
    setMetaTag("name", "description", finalDescription);
    setMetaTag("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    // 3. Canonical Link
    if (!noindex && finalCanonical) {
      setLinkTag("canonical", finalCanonical);
    } else {
      setLinkTag("canonical", null);
    }

    // 4. Open Graph Meta Tags
    setMetaTag("property", "og:site_name", "Jagmohan Singh Portfolio");
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:title", finalTitle);
    setMetaTag("property", "og:description", finalDescription);
    if (!noindex && finalCanonical) {
      setMetaTag("property", "og:url", finalCanonical);
    } else {
      setMetaTag("property", "og:url", null);
    }
    setMetaTag("property", "og:image", finalImage);

    // 5. Twitter Card Meta Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", finalTitle);
    setMetaTag("name", "twitter:description", finalDescription);
    setMetaTag("name", "twitter:image", finalImage);

    // 6. Structured Data / JSON-LD Script Tag
    const scriptId = "seo-structured-data";
    const existingScript = document.getElementById(scriptId);

    if (schema && !noindex) {
      let script = existingScript;
      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      const schemaData = Array.isArray(schema)
        ? {
            "@context": "https://schema.org",
            "@graph": schema.map((s) => ({ ...s, "@context": undefined })),
          }
        : schema;
      script.textContent = JSON.stringify(schemaData);
    } else if (existingScript) {
      existingScript.remove();
    }

    return () => {
      // Cleanup structured data on unmount if needed
      const currentScript = document.getElementById(scriptId);
      if (currentScript) {
        currentScript.remove();
      }
    };
  }, [title, description, canonical, ogType, ogImage, noindex, schema]);

  return null;
}
