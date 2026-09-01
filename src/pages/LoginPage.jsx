import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import SEO from '../components/SEO';
import { FiLock, FiMail, FiAlertCircle, FiShield } from 'react-icons/fi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { admin, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect to admin or origin
  if (admin) {
    const destination = location.state?.from?.pathname || '/admin';
    return <Navigate to={destination} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setSubmitting(true);
      await login(email.trim(), password);
      const destination = location.state?.from?.pathname || '/admin';
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Admin Login | Jagmohan Singh Portfolio"
        description="Private administrative login for Jagmohan Singh portfolio management."
        noindex={true}
      />
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Top Monogram Banner */}
        <div className="text-center mb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#0a66c2] text-white shadow-md mb-3">
            <FiShield className="text-2xl" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Admin Portal</h1>
          <p className="mt-1 text-xs text-slate-500">
            Secure administrative access for portfolio management
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              <FiAlertCircle className="text-base shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email Field */}
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Admin Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                  placeholder="admin@example.com"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-3.5 text-xs text-slate-900 placeholder-slate-400 transition-colors focus:border-[#0a66c2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a66c2]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••••••"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-3.5 text-xs text-slate-900 placeholder-slate-400 transition-colors focus:border-[#0a66c2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a66c2]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full inline-flex items-center justify-center rounded-full bg-[#0a66c2] py-2.5 px-4 text-xs font-semibold text-white shadow-sm hover:bg-[#004182] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitting ? 'Authenticating...' : 'Sign In to Admin'}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
