import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import SectionCard from '../components/SectionCard';
import { FiShield, FiLogOut, FiUser, FiCheckCircle, FiFolder, FiMail } from 'react-icons/fi';

export default function AdminDashboardPage() {
  const { admin, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Top Header Card */}
      <SectionCard>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 text-xl font-bold">
              <FiShield />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">Admin Control Center</h1>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                <FiUser className="text-slate-400" />
                <span>Logged in as:</span>
                <strong className="text-slate-800">{admin?.email}</strong>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-red-600 transition cursor-pointer"
          >
            <FiLogOut className="text-xs" />
            <span>Sign Out</span>
          </button>
        </div>
      </SectionCard>

      {/* Overview Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SectionCard title="N7 Authentication" bodyClassName="p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
            <FiCheckCircle />
            <span>Active &amp; Verified</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            JWT-signed HttpOnly cookie session active with bcrypt password protection.
          </p>
        </SectionCard>

        <SectionCard title="Projects Management" bodyClassName="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <FiFolder />
              <span>N8 Project CRUD Active</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Create, edit, reorder, feature, and delete portfolio project records.
          </p>
          <div className="pt-2">
            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0a66c2] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#004182] transition"
            >
              <FiFolder className="text-xs" />
              <span>Manage Projects</span>
            </Link>
          </div>
        </SectionCard>


        <SectionCard title="Upcoming: N12 Leads Inbox" bodyClassName="p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-600">
            <FiMail />
            <span>Scheduled</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Message viewer and contact form inquiry management.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
