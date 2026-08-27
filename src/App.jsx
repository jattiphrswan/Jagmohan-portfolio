import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";
import SkillsPage from "./pages/SkillsPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
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
        {/* /projects and /projects/:slug — slug handled in N6 */}
        <Route
          path="/projects/*"
          element={
            <Layout>
              <ProjectsPage />
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
  );
}
