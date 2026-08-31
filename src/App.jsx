import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import ProfileProvider from "./context/ProfileProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ExperiencePage from "./pages/ExperiencePage";
import SkillsPage from "./pages/SkillsPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminProjectsPage from "./pages/AdminProjectsPage";
import AdminProjectFormPage from "./pages/AdminProjectFormPage";
import AdminProfilePage from "./pages/AdminProfilePage";
import AdminExperiencePage from "./pages/AdminExperiencePage";
import AdminExperienceFormPage from "./pages/AdminExperienceFormPage";
import AdminSkillsPage from "./pages/AdminSkillsPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <BrowserRouter>
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
        <Route
          path="*"
          element={
            <Layout>
              <NotFoundPage />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  </ProfileProvider>
</AuthProvider>


  );
}
