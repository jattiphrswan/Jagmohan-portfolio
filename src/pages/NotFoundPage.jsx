import { Link } from "react-router-dom";
import SectionCard from "../components/SectionCard";
import SEO from "../components/SEO";
import { FiAlertCircle, FiHome, FiMail } from "react-icons/fi";

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found | Jagmohan Singh Portfolio"
        description="The page you are looking for doesn't exist, has been removed, or is temporarily unavailable."
        noindex={true}
      />
      <div className="mx-auto max-w-lg py-8">
        <SectionCard className="text-center p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[#0a66c2] text-2xl mb-4">
            <FiAlertCircle />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#0a66c2] px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#004182]"
            >
              <FiHome />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <FiMail />
              <span>Contact Support</span>
            </Link>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
