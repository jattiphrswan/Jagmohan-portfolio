import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import SEO from './SEO';

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <>
        <SEO title="Verifying Authorization... | Jagmohan Singh Portfolio" noindex={true} />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#0a66c2] border-t-transparent mb-3" />
            <p className="text-xs text-slate-500 font-medium">Verifying authorization...</p>
          </div>
        </div>
      </>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <SEO
        title="Admin Dashboard | Jagmohan Singh Portfolio"
        description="Private administrative portal for Jagmohan Singh portfolio management."
        noindex={true}
      />
      {children}
    </>
  );
}
