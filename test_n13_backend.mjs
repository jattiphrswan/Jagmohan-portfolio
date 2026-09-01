import http from "http";
import app from "./server/src/app.js";

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
console.log("N13 BACKEND & API REGRESSION TEST SUITE");
console.log("============================================================\n");

const server = http.createServer(app);

await new Promise((resolve) => {
  server.listen(0, () => {
    resolve();
  });
});

const port = server.address().port;
const baseUrl = `http://127.0.0.1:${port}`;

try {
  // Test 1: GET /api/health
  const resHealth = await fetch(`${baseUrl}/api/health`);
  const jsonHealth = await resHealth.json();
  assert(resHealth.status === 200, "GET /api/health returns 200 OK");
  assert(jsonHealth.success === true, "GET /api/health reports success: true");

  // Test 2: GET /api/profile
  const resProfile = await fetch(`${baseUrl}/api/profile`);
  const jsonProfile = await resProfile.json();
  assert(resProfile.status === 200, "GET /api/profile returns 200 OK");
  assert(jsonProfile.success === true, "GET /api/profile reports success");
  assert(jsonProfile.data && jsonProfile.data.name === "Jagmohan Singh", "Profile name is Jagmohan Singh");

  // Test 3: GET /api/projects
  const resProjects = await fetch(`${baseUrl}/api/projects`);
  const jsonProjects = await resProjects.json();
  assert(resProjects.status === 200, "GET /api/projects returns 200 OK");
  assert(Array.isArray(jsonProjects.data), "GET /api/projects returns an array of projects");
  assert(jsonProjects.data.length > 0, "GET /api/projects returns at least 1 project");

  // Test 4: GET /api/certifications
  const resCerts = await fetch(`${baseUrl}/api/certifications`);
  const jsonCerts = await resCerts.json();
  assert(resCerts.status === 200, "GET /api/certifications returns 200 OK");
  assert(Array.isArray(jsonCerts.data), "GET /api/certifications returns array");

  // Test 5: Protected Route Guard (GET /api/admin/projects unauthorized)
  const resAdmin = await fetch(`${baseUrl}/api/admin/projects`);
  assert(resAdmin.status === 401, "GET /api/admin/projects returns 401 Unauthorized without auth cookie");

} catch (err) {
  assert(false, "Backend test execution", err.message);
} finally {
  server.close();
}

console.log("\n============================================================");
console.log(`BACKEND RESULTS: ${passedTests}/${totalTests} PASSED (${failedTests} FAILED)`);
console.log("============================================================\n");

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
