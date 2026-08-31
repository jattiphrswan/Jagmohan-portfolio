import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionCard from '../components/SectionCard';
import { API_BASE } from '../config/api';
import {
  FiBriefcase,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiAlertCircle,
  FiCheckCircle,
  FiCalendar,
  FiMapPin
} from 'react-icons/fi';

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/api/admin/experience`, {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to fetch experiences');
      const json = await res.json();
      setExperiences(json.data || []);
    } catch (err) {
      setError(err.message || 'Error loading experience entries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      const res = await fetch(`${API_BASE}/api/admin/experience/${deleteTarget.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to delete experience record');
      setActionSuccess(`Experience at "${deleteTarget.company}" deleted successfully.`);
      setExperiences((prev) => prev.filter((e) => e.id !== deleteTarget.id));
      setDeleteTarget(null);
      setTimeout(() => setActionSuccess(''), 4000);
    } catch (err) {
      setError(err.message || 'Could not delete experience');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link to="/admin" className="hover:text-[#0a66c2] transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Experience Management</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Work Experience ({experiences.length})
          </h1>
        </div>

        <Link
          to="/admin/experience/new"
          className="inline-flex items-center gap-2 rounded-full bg-[#0a66c2] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#004182] transition-colors cursor-pointer"
        >
          <FiPlus className="text-sm" />
          <span>Add New Experience</span>
        </Link>
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

      {/* Experience Table */}
      <SectionCard>
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-500">
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[#0a66c2] border-t-transparent mb-2" />
            Loading experience records...
          </div>
        ) : experiences.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            <FiBriefcase className="mx-auto text-2xl text-slate-400 mb-2" />
            <p className="font-semibold text-slate-700">No experience records found</p>
            <p className="mt-1 text-slate-400">Click "Add New Experience" to add your work history.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="pb-3 pr-4 font-semibold">Role &amp; Company</th>
                  <th className="pb-3 px-3 font-semibold">Type</th>
                  <th className="pb-3 px-3 font-semibold">Period</th>
                  <th className="pb-3 px-3 font-semibold">Location</th>
                  <th className="pb-3 px-3 font-semibold text-center">Order</th>
                  <th className="pb-3 pl-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {experiences.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="font-bold text-slate-900 leading-snug">{exp.role}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{exp.company}</div>
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
                        {exp.type || 'Full-time'}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap text-slate-700">
                      {exp.start} – {exp.isCurrent ? 'Present' : exp.end}
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap text-slate-500">
                      {exp.location || 'Remote'}
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono text-slate-600">
                      {exp.displayOrder ?? 0}
                    </td>

                    <td className="py-3.5 pl-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          to={`/admin/experience/${exp.id}/edit`}
                          title="Edit experience"
                          className="rounded p-1.5 text-slate-600 hover:bg-blue-50 hover:text-[#0a66c2] transition"
                        >
                          <FiEdit2 className="text-sm" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(exp)}
                          title="Delete experience"
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
          aria-labelledby="delete-exp-dialog"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 mb-4">
              <FiTrash2 className="text-xl" />
            </div>
            <h3 id="delete-exp-dialog" className="text-base font-bold text-slate-900">
              Delete Experience Entry
            </h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-900 font-semibold">"{deleteTarget.role} at {deleteTarget.company}"</strong>? This will remove the position from your public portfolio.
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
