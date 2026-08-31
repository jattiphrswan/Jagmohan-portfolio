import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import SectionCard from '../components/SectionCard';
import { FiShield, FiLogOut, FiUser, FiCheckCircle, FiFolder, FiAward } from 'react-icons/fi';


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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Projects Card */}
        <SectionCard title="Projects" bodyClassName="p-4 space-y-2 flex flex-col justify-between h-full">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <FiFolder />
              <span>Projects Catalogue</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Create, edit, feature, and delete showcase projects.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0a66c2] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#004182] transition"
            >
              <span>Manage Projects</span>
            </Link>
          </div>
        </SectionCard>

        {/* Profile Card */}
        <SectionCard title="Profile &amp; About" bodyClassName="p-4 space-y-2 flex flex-col justify-between h-full">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <FiUser />
              <span>Profile Settings</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Update headline, location, bio summary, and contact channels.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/admin/profile"
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition"
            >
              <span>Edit Profile</span>
            </Link>
          </div>
        </SectionCard>

        {/* Experience Card */}
        <SectionCard title="Experience" bodyClassName="p-4 space-y-2 flex flex-col justify-between h-full">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-600">
              <FiCheckCircle />
              <span>Career History</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Manage past and current employment, achievements, and order.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/admin/experience"
              className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-purple-700 transition"
            >
              <span>Manage Experience</span>
            </Link>
          </div>
        </SectionCard>

        {/* Skills Card */}
        <SectionCard title="Skills" bodyClassName="p-4 space-y-2 flex flex-col justify-between h-full">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600">
              <FiShield />
              <span>Expertise &amp; Tools</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Manage frontend, WordPress, design tools, and categories.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/admin/skills"
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 transition"
            >
              <span>Manage Skills</span>
            </Link>
          </div>
        </SectionCard>

        {/* Certifications Card */}
        <SectionCard title="Certifications" bodyClassName="p-4 space-y-2 flex flex-col justify-between h-full">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
              <FiAward />
              <span>Licenses &amp; Badges</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Upload certificate images, issuers, dates, and credential URLs.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/admin/certifications"
              className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 transition"
            >
              <span>Manage Certifications</span>
            </Link>
          </div>
        </SectionCard>
      </div>

    </div>
  );
}

