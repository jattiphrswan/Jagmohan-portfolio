import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SectionCard from '../components/SectionCard';
import MediaUpload from '../components/MediaUpload';
import { API_BASE } from '../config/api';
import { FiArrowLeft, FiSave, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

export default function AdminCertificationFormPage({ mode = 'create' }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    credentialUrl: '',
    imageUrl: '',
    imagePublicId: '',
    description: '',
    displayOrder: 0,
    featured: true
  });

  const [loading, setLoading] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (mode === 'edit' && id) {
      async function fetchCertification() {
        try {
          setLoading(true);
          const res = await fetch(`${API_BASE}/api/admin/certifications/${id}`, {
            credentials: 'include'
          });
          if (!res.ok) throw new Error('Failed to load certification details');
          const json = await res.json();
          if (json.data) {
            const c = json.data;
            setFormData({
              name: c.name || '',
              issuer: c.issuer || '',
              issueDate: c.issueDate || '',
              credentialUrl: c.credentialUrl || '',
              imageUrl: c.imageUrl || '',
              imagePublicId: c.imagePublicId || '',
              description: c.description || '',
              displayOrder: c.displayOrder ?? 0,
              featured: c.featured !== undefined ? c.featured : true
            });
          }
        } catch (err) {
          setError(err.message || 'Error loading certification');
        } finally {
          setLoading(false);
        }
      }
      fetchCertification();
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

    if (!formData.name.trim()) {
      setError('Certification Name is required.');
      return;
    }
    if (!formData.imageUrl.trim()) {
      setError('Certificate Image is required. Please upload or provide an image.');
      return;
    }

    try {
      setSaving(true);
      const url =
        mode === 'edit'
          ? `${API_BASE}/api/admin/certifications/${id}`
          : `${API_BASE}/api/admin/certifications`;

      const method = mode === 'edit' ? 'PUT' : 'POST';

      const payload = {
        ...formData,
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
        throw new Error(json.message || 'Failed to save certification');
      }

      setSuccess(mode === 'edit' ? 'Certification updated successfully!' : 'Certification created successfully!');
      setTimeout(() => {
        navigate('/admin/certifications');
      }, 1000);
    } catch (err) {
      setError(err.message || 'Error saving certification record.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl py-12 text-center text-xs text-slate-500">
        Loading certification editor...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/certifications"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a66c2] hover:underline"
        >
          <FiArrowLeft />
          <span>Back to Certifications</span>
        </Link>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {mode === 'edit' ? 'Edit Mode' : 'Create Mode'}
        </span>
      </div>

      <SectionCard>
        <h1 className="text-xl font-bold text-slate-900">
          {mode === 'edit' ? 'Edit Certification' : 'Add New Certification'}
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Add verified credentials, certificates, and completion badges to your public portfolio.
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
          {/* Row 1: Name & Issuer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block font-semibold text-slate-700 mb-1">
                Certification Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Advanced WordPress Development Certification"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="issuer" className="block font-semibold text-slate-700 mb-1">
                Issuing Organization / Authority
              </label>
              <input
                id="issuer"
                name="issuer"
                type="text"
                value={formData.issuer}
                onChange={handleChange}
                placeholder="e.g. Google, freeCodeCamp, Udemy"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Row 2: Issue Date, Credential URL, Order */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="issueDate" className="block font-semibold text-slate-700 mb-1">
                Issue Date / Year
              </label>
              <input
                id="issueDate"
                name="issueDate"
                type="text"
                value={formData.issueDate}
                onChange={handleChange}
                placeholder="e.g. 2025 or Jan 2026"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="credentialUrl" className="block font-semibold text-slate-700 mb-1">
                Verification / Credential URL
              </label>
              <input
                id="credentialUrl"
                name="credentialUrl"
                type="url"
                value={formData.credentialUrl}
                onChange={handleChange}
                placeholder="https://..."
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

          {/* Reusable Certificate Media Upload Component */}
          <div className="pt-2 border-t border-slate-100">
            <MediaUpload
              label="Certificate Image"
              value={formData.imageUrl}
              onChange={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
              onPublicIdChange={(publicId) => setFormData((prev) => ({ ...prev, imagePublicId: publicId }))}
              placeholder="Upload certificate badge or document image (PNG, JPG, WebP)"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-semibold text-slate-700 mb-1">
              Description / Learning Outcomes (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of skills mastered or topics covered..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none font-sans"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-[#0a66c2] focus:ring-[#0a66c2]"
              />
              <span className="font-semibold text-slate-800">Featured Certification (Highlighted in showcase)</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link
              to="/admin/certifications"
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
              <span>{saving ? 'Saving...' : mode === 'edit' ? 'Update Certification' : 'Create Certification'}</span>
            </button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
}
