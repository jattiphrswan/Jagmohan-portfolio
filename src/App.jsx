import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import ProfileProvider from "./context/ProfileProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

// Eagerly load main ProfilePage for instant LCP on root entry
import ProfilePage from "./pages/ProfilePage";

// Code-split other public routes for performance
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const CertificationsPage = lazy(() => import("./pages/CertificationsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Code-split admin routes
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const AdminProjectsPage = lazy(() => import("./pages/AdminProjectsPage"));
const AdminProjectFormPage = lazy(() => import("./pages/AdminProjectFormPage"));
const AdminProfilePage = lazy(() => import("./pages/AdminProfilePage"));
const AdminExperiencePage = lazy(() => import("./pages/AdminExperiencePage"));
const AdminExperienceFormPage = lazy(() => import("./pages/AdminExperienceFormPage"));
const AdminSkillsPage = lazy(() => import("./pages/AdminSkillsPage"));
const AdminCertificationsPage = lazy(() => import("./pages/AdminCertificationsPage"));
const AdminCertificationFormPage = lazy(() => import("./pages/AdminCertificationFormPage"));

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-[#0a66c2] border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <ProfilePage />
                  </Layout>
                }
              />
              <Route
                path="/about"
                element={
                  <Layout>
                    <AboutPage />
                  </Layout>
                }
              />
              <Route
                path="/projects"
                element={
                  <Layout>
                    <ProjectsPage />
                  </Layout>
                }
              />
              <Route
                path="/projects/:slug"
                element={
                  <Layout>
                    <ProjectDetailPage />
                  </Layout>
                }
              />
              <Route
                path="/experience"
                element={
                  <Layout>
                    <ExperiencePage />
                  </Layout>
                }
              />
              <Route
                path="/skills"
                element={
                  <Layout>
                    <SkillsPage />
                  </Layout>
                }
              />
              <Route
                path="/certifications"
                element={
                  <Layout>
                    <CertificationsPage />
                  </Layout>
                }
              />
              <Route
                path="/contact"
                element={
                  <Layout>
                    <ContactPage />
                  </Layout>
                }
              />

              {/* Admin Authentication & Control */}
              <Route
                path="/admin/login"
                element={
                  <Layout>
                    <LoginPage />
                  </Layout>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AdminDashboardPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/projects"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AdminProjectsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/projects/new"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AdminProjectFormPage mode="create" />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/projects/:id/edit"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AdminProjectFormPage mode="edit" />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              {/* N9 Profile / Experience / Skills Management */}
              <Route
                path="/admin/profile"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AdminProfilePage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/experience"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AdminExperiencePage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/experience/new"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AdminExperienceFormPage mode="create" />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/experience/:id/edit"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AdminExperienceFormPage mode="edit" />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/skills"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AdminSkillsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              {/* N10 Certifications Management */}
              <Route
                path="/admin/certifications"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AdminCertificationsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/certifications/new"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AdminCertificationFormPage mode="create" />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/certifications/:id/edit"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <AdminCertificationFormPage mode="edit" />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  <Layout>
                    <NotFoundPage />
                  </Layout>
                }
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ProfileProvider>
    </AuthProvider>
  );
}
