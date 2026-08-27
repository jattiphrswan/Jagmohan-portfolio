import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-xl border bg-white px-5 py-12 text-center">
        <div className="text-4xl font-bold text-slate-900">404</div>
        <div className="mt-2 text-sm text-slate-500">Page not found.</div>
        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
