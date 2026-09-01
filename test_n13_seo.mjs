import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = __dirname;

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = "") {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ❌ FAIL: ${testName}`);
    if (details) console.error(`     Details: ${details}`);
  }
}

console.log("\n============================================================");
console.log("N13 SEO, AEO/GEO, ACCESSIBILITY & PERFORMANCE TEST SUITE");
console.log("============================================================\n");

// ------------------------------------------------------------
// TEST GROUP 1: ROBOTS.TXT
// ------------------------------------------------------------
console.log("--- 1. Testing robots.txt ---");
const robotsPath = path.join(rootDir, "public", "robots.txt");
const robotsExists = fs.existsSync(robotsPath);
assert(robotsExists, "public/robots.txt exists");

if (robotsExists) {
  const robotsContent = fs.readFileSync(robotsPath, "utf8");
  assert(robotsContent.includes("User-agent: *"), "robots.txt has User-agent directive");
  assert(robotsContent.includes("Allow: /"), "robots.txt allows public site indexing");
  assert(robotsContent.includes("Disallow: /admin"), "robots.txt disallows /admin");
  assert(robotsContent.includes("Sitemap: /sitemap.xml") || robotsContent.includes("sitemap.xml"), "robots.txt references sitemap");
}

// ------------------------------------------------------------
// TEST GROUP 2: SITEMAP.XML
// ------------------------------------------------------------
console.log("\n--- 2. Testing sitemap.xml ---");
const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
const sitemapExists = fs.existsSync(sitemapPath);
assert(sitemapExists, "public/sitemap.xml exists");

if (sitemapExists) {
  const sitemapContent = fs.readFileSync(sitemapPath, "utf8");
  assert(sitemapContent.includes('<?xml version="1.0" encoding="UTF-8"?>'), "sitemap.xml has valid XML declaration");
  assert(sitemapContent.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), "sitemap.xml has schema namespace");
  
  const publicRoutes = ["/", "/about", "/experience", "/skills", "/projects", "/certifications", "/contact"];
  for (const route of publicRoutes) {
    assert(sitemapContent.includes(`<loc>${route}</loc>`) || sitemapContent.includes(`<loc>${route}`), `sitemap includes route ${route}`);
  }
  assert(!sitemapContent.includes("/admin"), "sitemap does NOT expose private /admin routes");
}

// ------------------------------------------------------------
// TEST GROUP 3: STRUCTURED DATA / SCHEMA GENERATOR
// ------------------------------------------------------------
console.log("\n--- 3. Testing JSON-LD Structured Data Utilities ---");
try {
  // Import profile data and schema helpers
  const profileModule = await import("./src/data/profile.js");
  const schemaModule = await import("./src/utils/schema.js");
  const profile = profileModule.profile;

  // Person Schema
  const personSchema = schemaModule.getPersonSchema(profile);
  assert(personSchema["@context"] === "https://schema.org", "Person schema has valid @context");
  assert(personSchema["@type"] === "Person", "Person schema @type is Person");
  assert(personSchema.name === "Jagmohan Singh", "Person name is authentic (Jagmohan Singh)");
  assert(personSchema.jobTitle.includes("Web Designer"), "Person jobTitle is authentic");
  assert(Array.isArray(personSchema.sameAs) && personSchema.sameAs.length >= 2, "Person sameAs contains verified external links");
  assert(personSchema.sameAs.some(l => l.includes("linkedin.com")), "sameAs includes LinkedIn");
  assert(personSchema.sameAs.some(l => l.includes("github.com")), "sameAs includes GitHub");
  assert(Array.isArray(personSchema.knowsAbout) && personSchema.knowsAbout.length > 0, "knowsAbout contains skills array");
  assert(personSchema.address && personSchema.address.addressLocality === "Delhi", "address is Delhi, India");

  // WebSite Schema
  const webSiteSchema = schemaModule.getWebSiteSchema();
  assert(webSiteSchema["@context"] === "https://schema.org", "WebSite schema has valid @context");
  assert(webSiteSchema["@type"] === "WebSite", "WebSite schema @type is WebSite");
  assert(webSiteSchema.name.includes("Jagmohan Singh"), "WebSite name matches brand");

  // Project Schema (CreativeWork)
  const sampleProject = {
    title: "SkyFish WordPress & WooCommerce Platform",
    slug: "skyfish-wordpress-ecommerce",
    description: "Custom WordPress website featuring Elementor Pro and ACF.",
    overview: "Engineered high-conversion custom layouts.",
    category: "WordPress & WooCommerce",
    image: null,
    technologies: ["WordPress", "WooCommerce", "Elementor Pro", "ACF"]
  };
  const projectSchema = schemaModule.getProjectSchema(sampleProject);
  assert(projectSchema["@context"] === "https://schema.org", "Project schema has valid @context");
  assert(projectSchema["@type"] === "CreativeWork", "Project schema @type is CreativeWork");
  assert(projectSchema.name === sampleProject.title, "Project schema has matching title");
  assert(projectSchema.author["@type"] === "Person", "Project author is Person");
  assert(projectSchema.author.name === "Jagmohan Singh", "Project author is Jagmohan Singh");

  // BreadcrumbList Schema
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: sampleProject.title, path: `/projects/${sampleProject.slug}` }
  ];
  const breadcrumbSchema = schemaModule.getBreadcrumbSchema(breadcrumbItems);
  assert(breadcrumbSchema["@context"] === "https://schema.org", "Breadcrumb schema has valid @context");
  assert(breadcrumbSchema["@type"] === "BreadcrumbList", "Breadcrumb schema @type is BreadcrumbList");
  assert(breadcrumbSchema.itemListElement.length === 3, "BreadcrumbList contains 3 items");
  assert(breadcrumbSchema.itemListElement[0].position === 1 && breadcrumbSchema.itemListElement[0].name === "Home", "Breadcrumb position 1 is Home");
  assert(breadcrumbSchema.itemListElement[2].position === 3, "Breadcrumb position 3 is Project Title");

} catch (err) {
  assert(false, "Schema utilities test execution", err.message);
}

// ------------------------------------------------------------
// TEST GROUP 4: SEO COMPONENT AND FAST REFRESH
// ------------------------------------------------------------
console.log("\n--- 4. Testing SEO Component Architecture ---");
const seoComponentPath = path.join(rootDir, "src", "components", "SEO.jsx");
const seoUtilityPath = path.join(rootDir, "src", "utils", "seo.js");

assert(fs.existsSync(seoComponentPath), "src/components/SEO.jsx exists");
assert(fs.existsSync(seoUtilityPath), "src/utils/seo.js exists");

const seoCode = fs.readFileSync(seoComponentPath, "utf8");
assert(seoCode.includes("export default function SEO"), "SEO.jsx default exports SEO component");
assert(!seoCode.includes("export function getSiteUrl"), "SEO.jsx complies with react-refresh by delegating utilities to seo.js");
assert(seoCode.includes("document.title ="), "SEO component sets document title");
assert(seoCode.includes("og:title"), "SEO component handles og:title");
assert(seoCode.includes("og:description"), "SEO component handles og:description");
assert(seoCode.includes("twitter:card"), "SEO component handles twitter:card");
assert(seoCode.includes("application/ld+json"), "SEO component handles JSON-LD structured data injection");

// ------------------------------------------------------------
// TEST GROUP 5: EXTERNAL LINK SECURITY AUDIT
// ------------------------------------------------------------
console.log("\n--- 5. Testing External Links (rel=noopener noreferrer) ---");
function checkDirLinks(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory() && file.name !== "node_modules" && file.name !== "dist") {
      checkDirLinks(fullPath);
    } else if (file.isFile() && (file.name.endsWith(".jsx") || file.name.endsWith(".js") || file.name.endsWith(".html"))) {
      const content = fs.readFileSync(fullPath, "utf8");
      const blankMatches = content.match(/target="_blank"/g);
      if (blankMatches) {
        const noopenerMatches = content.match(/rel="[^"]*noopener[^"]*"/g) || content.match(/rel="[^"]*noreferrer[^"]*"/g);
        const countBlank = blankMatches.length;
        const countRel = noopenerMatches ? noopenerMatches.length : 0;
        assert(countRel >= countBlank, `All target="_blank" in ${path.relative(rootDir, fullPath)} have rel="noopener noreferrer"`);
      }
    }
  }
}
checkDirLinks(path.join(rootDir, "src"));

// ------------------------------------------------------------
// TEST GROUP 6: ACCESSIBILITY CHECKS
// ------------------------------------------------------------
console.log("\n--- 6. Testing Accessibility (Headings, Alt text, ARIA) ---");
const certPageCode = fs.readFileSync(path.join(rootDir, "src", "pages", "CertificationsPage.jsx"), "utf8");
assert(certPageCode.includes('aria-modal="true"'), "Certifications modal includes aria-modal");
assert(certPageCode.includes('role="dialog"'), "Certifications modal includes role=dialog");
assert(certPageCode.includes('aria-label="Close certificate viewer"') || certPageCode.includes('aria-label='), "Modal close button has accessible aria-label");
assert(certPageCode.includes('e.key === "Escape"') || certPageCode.includes("Escape"), "Certifications lightbox closes on Escape key");

const contactPageCode = fs.readFileSync(path.join(rootDir, "src", "pages", "ContactPage.jsx"), "utf8");
assert(contactPageCode.includes('role="alert"') && contactPageCode.includes('aria-live="polite"'), "Contact form alert messages use role=alert and aria-live=polite");

const indexHtmlCode = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
assert(indexHtmlCode.includes('<html lang="en">'), "index.html has lang=en attribute");
assert(indexHtmlCode.includes('<link rel="icon" type="image/svg+xml" href="/favicon-j.svg" />'), "index.html links to favicon-j.svg");
assert(indexHtmlCode.includes('<meta name="theme-color"'), "index.html sets theme-color meta tag");
assert(indexHtmlCode.includes('<meta name="description"'), "index.html includes baseline meta description");

// ------------------------------------------------------------
// TEST GROUP 7: CODE SPLITTING IN APP.JSX
// ------------------------------------------------------------
console.log("\n--- 7. Testing Performance Code Splitting in App.jsx ---");
const appCode = fs.readFileSync(path.join(rootDir, "src", "App.jsx"), "utf8");
assert(appCode.includes("lazy("), "App.jsx uses React.lazy for route components");
assert(appCode.includes("<Suspense"), "App.jsx wraps routes in Suspense boundary");

// ------------------------------------------------------------
// TEST RESULTS SUMMARY
// ------------------------------------------------------------
console.log("\n============================================================");
console.log(`TEST RESULTS: ${passedTests}/${totalTests} PASSED (${failedTests} FAILED)`);
console.log("============================================================\n");

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
