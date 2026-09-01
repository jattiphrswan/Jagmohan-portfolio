const FRONTEND_URL = "https://jagmohan-portfolio.vercel.app";
const BACKEND_URL = "https://jagmohan-portfolio-api.onrender.com";

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
console.log("N15 LIVE PRODUCTION QA TEST SUITE");
console.log("============================================================\n");

console.log(`Target Frontend: ${FRONTEND_URL}`);
console.log(`Target Backend:  ${BACKEND_URL}\n`);

// ------------------------------------------------------------
// TEST GROUP 1: LIVE BACKEND HEALTH & API INTEGRATION
// ------------------------------------------------------------
console.log("--- 1. Testing Live Render Backend & Neon PostgreSQL ---");
try {
  const healthRes = await fetch(`${BACKEND_URL}/api/health`);
  assert(healthRes.status === 200, "Backend /api/health returns HTTP 200");
  const healthData = await healthRes.json();
  assert(healthData.success === true, "Health payload reports success: true");
  assert(healthData.environment === "production" || healthData.environment === "development", `Environment reported: ${healthData.environment}`);
  console.log(`     Database status: ${healthData.database}`);

  // Test Profile API
  const profileRes = await fetch(`${BACKEND_URL}/api/profile`);
  assert(profileRes.status === 200, "Backend /api/profile returns HTTP 200");
  const profileData = await profileRes.json();
  assert(profileData.success === true, "Profile payload reports success: true");
  assert(profileData.data?.name === "Jagmohan Singh", "Profile name matches 'Jagmohan Singh'");

  // Test Projects API
  const projectsRes = await fetch(`${BACKEND_URL}/api/projects`);
  assert(projectsRes.status === 200, "Backend /api/projects returns HTTP 200");
  const projectsData = await projectsRes.json();
  assert(projectsData.success === true, "Projects payload reports success: true");
  assert(Array.isArray(projectsData.data) && projectsData.data.length > 0, `Projects array returned (${projectsData.data?.length || 0} projects)`);

  // Test Project Detail by Slug API
  const slug = projectsData.data[0]?.slug || "skyfish-wordpress-ecommerce";
  const projectDetailRes = await fetch(`${BACKEND_URL}/api/projects/${slug}`);
  assert(projectDetailRes.status === 200, `Backend /api/projects/${slug} returns HTTP 200`);
  const projectDetailData = await projectDetailRes.json();
  assert(projectDetailData.success === true, "Project detail reports success: true");

  // Test Certifications API
  const certsRes = await fetch(`${BACKEND_URL}/api/certifications`);
  assert(certsRes.status === 200, "Backend /api/certifications returns HTTP 200");
  const certsData = await certsRes.json();
  assert(certsData.success === true, "Certifications reports success: true");

} catch (err) {
  assert(false, "Backend API Connection Check", err.message);
}

// ------------------------------------------------------------
// TEST GROUP 2: SECURITY & UNAUTHORIZED GUARDS
// ------------------------------------------------------------
console.log("\n--- 2. Testing Production Security & Auth Guards ---");
try {
  const unauthorizedRes = await fetch(`${BACKEND_URL}/api/admin/projects`);
  assert(unauthorizedRes.status === 401, "GET /api/admin/projects returns 401 Unauthorized without auth cookie");

  const unauthorizedPostRes = await fetch(`${BACKEND_URL}/api/admin/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Unauthorized Attempt" })
  });
  assert(unauthorizedPostRes.status === 401, "POST /api/admin/projects returns 401 Unauthorized without auth cookie");

  const unauthMeRes = await fetch(`${BACKEND_URL}/api/auth/me`);
  assert(unauthMeRes.status === 401, "GET /api/auth/me returns 401 Unauthorized without session");

} catch (err) {
  assert(false, "Auth Guard Verification", err.message);
}

// ------------------------------------------------------------
// TEST GROUP 3: LIVE VERCEL FRONTEND & ROUTE REWRITES
// ------------------------------------------------------------
console.log("\n--- 3. Testing Live Vercel Frontend & Deep Linking ---");
const publicRoutes = [
  "/",
  "/about",
  "/experience",
  "/skills",
  "/projects",
  "/certifications",
  "/contact",
  "/admin/login"
];

for (const route of publicRoutes) {
  try {
    const res = await fetch(`${FRONTEND_URL}${route}`);
    assert(res.status === 200, `Frontend ${route} returns HTTP 200 (No Vercel 404)`);
    const html = await res.text();
    assert(html.includes('<div id="root"></div>') || html.includes('id="root"'), `${route} serves valid React SPA index.html`);
    assert(!html.includes('/Jagmohan-portfolio/assets/'), `${route} does NOT reference legacy GitHub Pages base path`);
    assert(!html.includes('?p=') && !html.includes('~and~'), `${route} has no legacy redirect query loop scripts`);
  } catch (err) {
    assert(false, `Frontend route check: ${route}`, err.message);
  }
}

// ------------------------------------------------------------
// TEST GROUP 4: STATIC SEO & PRODUCTION CRAWL ASSETS
// ------------------------------------------------------------
console.log("\n--- 4. Testing Robots.txt, Sitemap.xml, and Favicon ---");
try {
  const robotsRes = await fetch(`${FRONTEND_URL}/robots.txt`);
  assert(robotsRes.status === 200, "Frontend /robots.txt returns HTTP 200");
  const robotsText = await robotsRes.text();
  assert(robotsText.includes("User-agent: *"), "robots.txt contains User-agent directive");
  assert(robotsText.includes("Allow: /"), "robots.txt allows public crawling");
  assert(robotsText.includes("Disallow: /admin"), "robots.txt disallows /admin");

  const sitemapRes = await fetch(`${FRONTEND_URL}/sitemap.xml`);
  assert(sitemapRes.status === 200, "Frontend /sitemap.xml returns HTTP 200");
  const sitemapText = await sitemapRes.text();
  assert(sitemapText.includes('<?xml version="1.0" encoding="UTF-8"?>'), "sitemap.xml has valid XML header");
  assert(sitemapText.includes("<loc>"), "sitemap.xml contains public route URLs");
  assert(!sitemapText.includes("/admin"), "sitemap.xml does NOT expose admin routes");

  const faviconRes = await fetch(`${FRONTEND_URL}/favicon-j.svg`);
  assert(faviconRes.status === 200, "Frontend /favicon-j.svg returns HTTP 200");

} catch (err) {
  assert(false, "Static SEO Asset Verification", err.message);
}

// ------------------------------------------------------------
// TEST RESULTS SUMMARY
// ------------------------------------------------------------
console.log("\n============================================================");
console.log(`PRODUCTION QA RESULTS: ${passedTests}/${totalTests} PASSED (${failedTests} FAILED)`);
console.log("============================================================\n");

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
