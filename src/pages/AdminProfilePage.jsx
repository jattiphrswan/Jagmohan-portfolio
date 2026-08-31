import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionCard from '../components/SectionCard';
import MediaUpload from '../components/MediaUpload';
import { API_BASE } from '../config/api';

import {
  FiUser,
  FiSave,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiGlobe,
  FiLinkedin,
  FiGithub
} from 'react-icons/fi';

export default function AdminProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    headline: '',
    location: '',
    about: '',
    company: '',
    projectsCount: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    avatar: '',
    banner: '',
    services: '',
    tools: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/admin/profile`, {
          credentials: 'include'
        });
        if (!res.ok) throw new Error('Failed to fetch profile settings');
        const json = await res.json();
        if (json.data) {
          const p = json.data;
          setFormData({
            name: p.name || '',
            headline: p.headline || '',
            location: p.location || '',
            about: p.about || '',
            company: p.company || '',
            projectsCount: p.projectsCount || '80+',
            email: p.email || '',
            phone: p.phone || '',
            linkedin: p.linkedin || '',
            github: p.github || '',
            avatar: p.avatar || '',
            banner: p.banner || '',
            services: Array.isArray(p.services) ? p.services.join(', ') : '',
            tools: Array.isArray(p.tools) ? p.tools.join(', ') : ''
          });
        }
      } catch (err) {
        setError(err.message || 'Error loading profile');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim()) {
      setError('Full Name is required.');
      return;
    }
    if (!formData.headline.trim()) {
      setError('Professional Headline is required.');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        ...formData,
        services: formData.services.split(',').map((s) => s.trim()).filter(Boolean),
        tools: formData.tools.split(',').map((t) => t.trim()).filter(Boolean)
      };

      const res = await fetch(`${API_BASE}/api/admin/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to update profile');
      }

      setSuccess('Profile updated successfully! Live portfolio updated.');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.message || 'Could not save profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl py-12 text-center text-xs text-slate-500">
        <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[#0a66c2] border-t-transparent mb-2" />
        Loading profile settings...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link to="/admin" className="hover:text-[#0a66c2] transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Profile &amp; About</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Profile Information
          </h1>
        </div>
      </div>

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

      {/* Main Profile Form */}
      <SectionCard>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Row 1: Name & Headline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block font-semibold text-slate-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="headline" className="block font-semibold text-slate-700 mb-1">
                Professional Headline <span className="text-red-500">*</span>
              </label>
              <input
                id="headline"
                name="headline"
                type="text"
                value={formData.headline}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Row 2: Location, Company, Projects Count */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                placeholder="Delhi, India"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="company" className="block font-semibold text-slate-700 mb-1">
                Current Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="SkyFish Development"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="projectsCount" className="block font-semibold text-slate-700 mb-1">
                Projects Completed Metric
              </label>
              <input
                id="projectsCount"
                name="projectsCount"
                type="text"
                value={formData.projectsCount}
                onChange={handleChange}
                placeholder="80+"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* About Biography */}
          <div>
            <label htmlFor="about" className="block font-semibold text-slate-700 mb-1">
              About Summary &amp; Bio
            </label>
            <textarea
              id="about"
              name="about"
              rows={4}
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell your professional story, specializations, and career achievements..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Contact Details Grid */}
          <div className="pt-3 border-t border-slate-100">
            <h3 className="font-bold text-slate-900 mb-3">Contact &amp; Social Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block font-semibold text-slate-700 mb-1">
                  Public Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jattiphrswan49@gmail.com"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block font-semibold text-slate-700 mb-1">
                  Public Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 931 566 7284"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="linkedin" className="block font-semibold text-slate-700 mb-1">
                  LinkedIn URL
                </label>
                <input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://www.linkedin.com/in/jagmohan-singh49"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="github" className="block font-semibold text-slate-700 mb-1">
                  GitHub URL
                </label>
                <input
                  id="github"
                  name="github"
                  type="url"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/jattiphrswan"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Profile Imagery Upload */}
          <div className="pt-3 border-t border-slate-100">
            <h3 className="font-bold text-slate-900 mb-3">Profile Imagery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MediaUpload
                label="Profile Avatar Picture"
                value={formData.avatar}
                onChange={(url) => setFormData((prev) => ({ ...prev, avatar: url }))}
                placeholder="Upload avatar photo (PNG, JPG, WebP)"
              />
              <MediaUpload
                label="Profile Cover / Banner Image"
                value={formData.banner}
                onChange={(url) => setFormData((prev) => ({ ...prev, banner: url }))}
                placeholder="Upload background banner image"
              />
            </div>
          </div>

          {/* Services & Tools */}
          <div className="pt-3 border-t border-slate-100">
            <h3 className="font-bold text-slate-900 mb-3">Services &amp; Tools Highlights</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="services" className="block font-semibold text-slate-700 mb-1">
                  Services Offered (comma-separated)
                </label>
                <input
                  id="services"
                  name="services"
                  type="text"
                  value={formData.services}
                  onChange={handleChange}
                  placeholder="Website Design (UI/UX), WordPress + WooCommerce, Speed Optimization"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="tools" className="block font-semibold text-slate-700 mb-1">
                  Sidebar Tools &amp; Technologies (comma-separated)
                </label>
                <input
                  id="tools"
                  name="tools"
                  type="text"
                  value={formData.tools}
                  onChange={handleChange}
                  placeholder="HTML, CSS, Bootstrap, Tailwind, React, WordPress, Photoshop, Affinity Photo"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0a66c2] px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#004182] transition disabled:opacity-60 cursor-pointer"
            >
              <FiSave />
              <span>{saving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
}
