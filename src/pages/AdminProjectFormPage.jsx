import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SectionCard from '../components/SectionCard';
import MediaUpload from '../components/MediaUpload';
import { API_BASE } from '../config/api';
import { FiArrowLeft, FiSave, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';


export default function AdminProjectFormPage({ mode = 'create' }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'WordPress',
    description: '',
    overview: '',
    technologies: '',
    role: '',
    liveUrl: '',
    githubUrl: '',
    image: '',
    featured: false,
    order: 0,
    status: 'published'
  });

  const [loading, setLoading] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Helper to auto-generate slug from title
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-_]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  useEffect(() => {
    if (mode === 'edit' && id) {
      const fetchProject = async () => {
        try {
          setLoading(true);
          const res = await fetch(`${API_BASE}/api/admin/projects/${id}`, {
            credentials: 'include'
          });

          if (!res.ok) throw new Error('Failed to load project details');
          const json = await res.json();
          if (json.data) {
            const p = json.data;
            setFormData({
              title: p.title || '',
              slug: p.slug || '',
              category: p.category || 'WordPress',
              description: p.description || '',
              overview: p.overview || '',
              technologies: Array.isArray(p.technologies) ? p.technologies.join(', ') : '',
              role: p.role || '',
              liveUrl: p.liveUrl || '',
              githubUrl: p.githubUrl || '',
              image: p.image || '',
              featured: Boolean(p.featured),
              order: p.order ?? 0,
              status: p.status || 'published'
            });
          }
        } catch (err) {
          setError(err.message || 'Error loading project');
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [mode, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'title' && mode === 'create') {
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: generateSlug(value)
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title.trim()) {
      setError('Project title is required.');
      return;
    }

    if (!formData.slug.trim()) {
      setError('Project slug is required.');
      return;
    }

    try {
      setSaving(true);
      const url =
        mode === 'edit'
          ? `${API_BASE}/api/admin/projects/${id}`
          : `${API_BASE}/api/admin/projects`;

      const method = mode === 'edit' ? 'PUT' : 'POST';


      const payload = {
        ...formData,
        technologies: formData.technologies
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        order: parseInt(formData.order, 10) || 0
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to save project');
      }

      setSuccess(mode === 'edit' ? 'Project updated successfully!' : 'Project created successfully!');
      setTimeout(() => {
        navigate('/admin/projects');
      }, 1000);
    } catch (err) {
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl py-12 text-center text-xs text-slate-500">
        Loading project editor...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      {/* Back link */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a66c2] hover:underline"
        >
          <FiArrowLeft />
          <span>Back to Projects List</span>
        </Link>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {mode === 'edit' ? 'Edit Mode' : 'Create Mode'}
        </span>
      </div>

      {/* Header Card */}
      <SectionCard>
        <h1 className="text-xl font-bold text-slate-900">
          {mode === 'edit' ? 'Edit Portfolio Project' : 'Create New Project'}
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Fill in the details below. All updates are synchronized with the live public portfolio.
        </p>
      </SectionCard>

      {/* Alerts */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700">
          <FiAlertCircle className="text-base shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-800">
          <FiCheckCircle className="text-base shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Form Card */}
      <SectionCard>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Row 1: Title & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block font-semibold text-slate-700 mb-1">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. Modern WooCommerce Store"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block font-semibold text-slate-700 mb-1">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                value={formData.slug}
                onChange={handleChange}
                required
                placeholder="modern-woocommerce-store"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 font-mono text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Row 2: Category & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block font-semibold text-slate-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                id="category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                required
                placeholder="WordPress, Front-End, WooCommerce"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="role" className="block font-semibold text-slate-700 mb-1">
                Role / Contribution
              </label>
              <input
                id="role"
                name="role"
                type="text"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Senior WordPress Developer"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label htmlFor="description" className="block font-semibold text-slate-700 mb-1">
              Short Description (Card summary)
            </label>
            <input
              id="description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief 1-2 sentence overview for the projects grid"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Full Overview */}
          <div>
            <label htmlFor="overview" className="block font-semibold text-slate-700 mb-1">
              Full Overview &amp; Architecture Details
            </label>
            <textarea
              id="overview"
              name="overview"
              rows={4}
              value={formData.overview}
              onChange={handleChange}
              placeholder="Detailed explanation of technical implementation, features delivered, and optimizations applied..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Technologies */}
          <div>
            <label htmlFor="technologies" className="block font-semibold text-slate-700 mb-1">
              Technologies (comma-separated)
            </label>
            <input
              id="technologies"
              name="technologies"
              type="text"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="WordPress, WooCommerce, Elementor, PHP, Tailwind CSS"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Project Featured Image Media Upload */}
          <div className="pt-2 border-t border-slate-100">
            <MediaUpload
              label="Project Showcase Image"
              value={formData.image}
              onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
              placeholder="Upload project screenshot or banner image (PNG, JPG, WebP)"
            />
          </div>


          {/* Row 3: URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="liveUrl" className="block font-semibold text-slate-700 mb-1">
                Live Website URL
              </label>
              <input
                id="liveUrl"
                name="liveUrl"
                type="url"
                value={formData.liveUrl}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="githubUrl" className="block font-semibold text-slate-700 mb-1">
                GitHub Repository URL
              </label>
              <input
                id="githubUrl"
                name="githubUrl"
                type="url"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/username/project"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Row 4: Controls (Order, Status, Featured) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 items-center">
            <div>
              <label htmlFor="order" className="block font-semibold text-slate-700 mb-1">
                Display Order
              </label>
              <input
                id="order"
                name="order"
                type="number"
                value={formData.order}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="status" className="block font-semibold text-slate-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="sm:pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-slate-300 text-[#0a66c2] focus:ring-[#0a66c2]"
                />
                <span className="font-semibold text-slate-800">Feature this project</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link
              to="/admin/projects"
              className="rounded-full border border-slate-300 bg-white px-5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0a66c2] px-6 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#004182] transition disabled:opacity-60 cursor-pointer"
            >
              <FiSave />
              <span>{saving ? 'Saving...' : mode === 'edit' ? 'Update Project' : 'Create Project'}</span>
            </button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
}
