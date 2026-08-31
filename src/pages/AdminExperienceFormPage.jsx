import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SectionCard from '../components/SectionCard';
import { API_BASE } from '../config/api';
import { FiArrowLeft, FiSave, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

export default function AdminExperienceFormPage({ mode = 'create' }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: '',
    company: '',
    type: 'Full-time',
    start: '',
    end: '',
    isCurrent: false,
    location: 'Remote',
    bullets: '',
    displayOrder: 0
  });

  const [loading, setLoading] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (mode === 'edit' && id) {
      async function fetchExperience() {
        try {
          setLoading(true);
          const res = await fetch(`${API_BASE}/api/admin/experience/${id}`, {
            credentials: 'include'
          });
          if (!res.ok) throw new Error('Failed to load experience details');
          const json = await res.json();
          if (json.data) {
            const exp = json.data;
            setFormData({
              role: exp.role || '',
              company: exp.company || '',
              type: exp.type || 'Full-time',
              start: exp.start || '',
              end: exp.end || '',
              isCurrent: Boolean(exp.isCurrent || exp.end === 'Present'),
              location: exp.location || 'Remote',
              bullets: Array.isArray(exp.bullets) ? exp.bullets.join('\n') : (exp.bullets || ''),
              displayOrder: exp.displayOrder ?? 0
            });
          }
        } catch (err) {
          setError(err.message || 'Error loading experience');
        } finally {
          setLoading(false);
        }
      }
      fetchExperience();
    }
  }, [mode, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.role.trim()) {
      setError('Job Role / Title is required.');
      return;
    }
    if (!formData.company.trim()) {
      setError('Company name is required.');
      return;
    }
    if (!formData.start.trim()) {
      setError('Start date/year is required.');
      return;
    }

    try {
      setSaving(true);
      const url =
        mode === 'edit'
          ? `${API_BASE}/api/admin/experience/${id}`
          : `${API_BASE}/api/admin/experience`;

      const method = mode === 'edit' ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        bullets: formData.bullets.split('\n').map((b) => b.trim()).filter(Boolean),
        displayOrder: parseInt(formData.displayOrder, 10) || 0
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to save experience');
      }

      setSuccess(mode === 'edit' ? 'Experience updated successfully!' : 'Experience created successfully!');
      setTimeout(() => {
        navigate('/admin/experience');
      }, 1000);
    } catch (err) {
      setError(err.message || 'Error saving experience record.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl py-12 text-center text-xs text-slate-500">
        Loading experience editor...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/experience"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a66c2] hover:underline"
        >
          <FiArrowLeft />
          <span>Back to Experience List</span>
        </Link>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {mode === 'edit' ? 'Edit Mode' : 'Create Mode'}
        </span>
      </div>

      <SectionCard>
        <h1 className="text-xl font-bold text-slate-900">
          {mode === 'edit' ? 'Edit Work Experience' : 'Add Work Experience'}
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Manage your career history, accomplishments, and team leadership bullets.
        </p>
      </SectionCard>

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

      <SectionCard>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="role" className="block font-semibold text-slate-700 mb-1">
                Role / Job Title <span className="text-red-500">*</span>
              </label>
              <input
                id="role"
                name="role"
                type="text"
                value={formData.role}
                onChange={handleChange}
                required
                placeholder="Senior WordPress Developer"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="company" className="block font-semibold text-slate-700 mb-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                required
                placeholder="SkyFish Development"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="type" className="block font-semibold text-slate-700 mb-1">
                Employment Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block font-semibold text-slate-700 mb-1">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="Remote / On-site / Delhi, India"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="displayOrder" className="block font-semibold text-slate-700 mb-1">
                Display Order
              </label>
              <input
                id="displayOrder"
                name="displayOrder"
                type="number"
                value={formData.displayOrder}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label htmlFor="start" className="block font-semibold text-slate-700 mb-1">
                Start Year / Date <span className="text-red-500">*</span>
              </label>
              <input
                id="start"
                name="start"
                type="text"
                value={formData.start}
                onChange={handleChange}
                required
                placeholder="2025 or Jun 2024"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="end" className="block font-semibold text-slate-700 mb-1">
                End Year / Date
              </label>
              <input
                id="end"
                name="end"
                type="text"
                disabled={formData.isCurrent}
                value={formData.isCurrent ? 'Present' : formData.end}
                onChange={handleChange}
                placeholder="2025"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none disabled:opacity-60"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isCurrent"
                checked={formData.isCurrent}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-[#0a66c2] focus:ring-[#0a66c2]"
              />
              <span className="font-semibold text-slate-800">I currently work in this role (Present)</span>
            </label>
          </div>

          {/* Bullet points */}
          <div>
            <label htmlFor="bullets" className="block font-semibold text-slate-700 mb-1">
              Key Achievements &amp; Responsibilities (one per line)
            </label>
            <textarea
              id="bullets"
              name="bullets"
              rows={5}
              value={formData.bullets}
              onChange={handleChange}
              placeholder="Leading WordPress design and front-end development across 20+ client projects.&#10;Building custom page templates using Elementor and Divi Builder.&#10;Handling performance optimizations and Core Web Vitals audits."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none font-sans"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link
              to="/admin/experience"
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
              <span>{saving ? 'Saving...' : mode === 'edit' ? 'Update Experience' : 'Create Experience'}</span>
            </button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
}
