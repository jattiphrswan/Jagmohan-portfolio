import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionCard from '../components/SectionCard';
import { API_BASE } from '../config/api';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiAlertCircle,
  FiCheckCircle,
  FiStar,
  FiSave,
  FiX
} from 'react-icons/fi';

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState('');

  // Editing or adding modal/inline state
  const [editingSkill, setEditingSkill] = useState(null); // null or skill object or { name: '', category: 'Frontend', displayOrder: 0, featured: true }
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/api/admin/skills`, {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to fetch skills');
      const json = await res.json();
      setSkills(json.data || []);
    } catch (err) {
      setError(err.message || 'Error loading skills catalogue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingSkill?.name?.trim()) {
      setError('Skill name is required.');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      const isEdit = Boolean(editingSkill.id);
      const url = isEdit
        ? `${API_BASE}/api/admin/skills/${editingSkill.id}`
        : `${API_BASE}/api/admin/skills`;

      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...editingSkill,
          displayOrder: parseInt(editingSkill.displayOrder, 10) || 0
        })
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to save skill');
      }

      setActionSuccess(isEdit ? 'Skill updated successfully!' : 'Skill added successfully!');
      setEditingSkill(null);
      fetchSkills();
      setTimeout(() => setActionSuccess(''), 4000);
    } catch (err) {
      setError(err.message || 'Could not save skill.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      const res = await fetch(`${API_BASE}/api/admin/skills/${deleteTarget.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to delete skill');
      setActionSuccess(`Skill "${deleteTarget.name}" deleted successfully.`);
      setSkills((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      setDeleteTarget(null);
      setTimeout(() => setActionSuccess(''), 4000);
    } catch (err) {
      setError(err.message || 'Could not delete skill.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link to="/admin" className="hover:text-[#0a66c2] transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Skills Management</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Skills &amp; Expertise ({skills.length})
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setEditingSkill({ name: '', category: 'Frontend', displayOrder: skills.length + 1, featured: true })}
          className="inline-flex items-center gap-2 rounded-full bg-[#0a66c2] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#004182] transition-colors cursor-pointer"
        >
          <FiPlus className="text-sm" />
          <span>Add New Skill</span>
        </button>
      </div>

      {/* Alerts */}
      {actionSuccess && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-800">
          <FiCheckCircle className="text-base shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700">
          <FiAlertCircle className="text-base shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Inline / Modal Editor Form */}
      {editingSkill && (
        <SectionCard>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h2 className="text-sm font-bold text-slate-900">
              {editingSkill.id ? 'Edit Skill' : 'Add New Skill'}
            </h2>
            <button
              type="button"
              onClick={() => setEditingSkill(null)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <FiX className="text-base" />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs items-end">
            <div className="sm:col-span-2">
              <label htmlFor="skill-name" className="block font-semibold text-slate-700 mb-1">
                Skill Name <span className="text-red-500">*</span>
              </label>
              <input
                id="skill-name"
                type="text"
                required
                value={editingSkill.name || ''}
                onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                placeholder="e.g. Tailwind CSS, WooCommerce"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="skill-category" className="block font-semibold text-slate-700 mb-1">
                Category
              </label>
              <input
                id="skill-category"
                type="text"
                value={editingSkill.category || ''}
                onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                placeholder="Frontend / WordPress / Tools"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="skill-order" className="block font-semibold text-slate-700 mb-1">
                Display Order
              </label>
              <input
                id="skill-order"
                type="number"
                value={editingSkill.displayOrder ?? 0}
                onChange={(e) => setEditingSkill({ ...editingSkill, displayOrder: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-900 focus:border-[#0a66c2] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-4 flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingSkill(null)}
                className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0a66c2] px-5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#004182] transition disabled:opacity-60 cursor-pointer"
              >
                <FiSave />
                <span>{saving ? 'Saving...' : 'Save Skill'}</span>
              </button>
            </div>
          </form>
        </SectionCard>
      )}

      {/* Skills Table */}
      <SectionCard>
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-500">
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[#0a66c2] border-t-transparent mb-2" />
            Loading skills...
          </div>
        ) : skills.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            No skills found. Click "Add New Skill" to start.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="pb-3 pr-4 font-semibold">Skill Name</th>
                  <th className="pb-3 px-3 font-semibold">Category</th>
                  <th className="pb-3 px-3 font-semibold text-center">Featured</th>
                  <th className="pb-3 px-3 font-semibold text-center">Order</th>
                  <th className="pb-3 pl-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {skills.map((skill) => (
                  <tr key={skill.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 pr-4 font-bold text-slate-900">
                      {skill.name}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
                        {skill.category || 'General'}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center">
                      {skill.featured ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <FiStar className="text-xs fill-emerald-500 text-emerald-500" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">—</span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-center font-mono text-slate-600">
                      {skill.displayOrder ?? 0}
                    </td>

                    <td className="py-3 pl-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingSkill(skill)}
                          title="Edit skill"
                          className="rounded p-1.5 text-slate-600 hover:bg-blue-50 hover:text-[#0a66c2] transition cursor-pointer"
                        >
                          <FiEdit2 className="text-sm" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(skill)}
                          title="Delete skill"
                          className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
                        >
                          <FiTrash2 className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-skill-dialog"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 mb-4">
              <FiTrash2 className="text-xl" />
            </div>
            <h3 id="delete-skill-dialog" className="text-base font-bold text-slate-900">
              Delete Skill
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-900 font-semibold">"{deleteTarget.name}"</strong>?
            </p>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteTarget(null)}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 transition cursor-pointer disabled:opacity-60"
              >
                {deleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
