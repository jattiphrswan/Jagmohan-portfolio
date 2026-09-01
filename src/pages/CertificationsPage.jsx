import { useState, useEffect } from 'react';
import SectionCard from '../components/SectionCard';
import SEO from '../components/SEO';
import { API_BASE } from '../config/api';
import {
  FiAward,
  FiExternalLink,
  FiCalendar,
  FiUserCheck,
  FiMaximize2,
  FiX
} from 'react-icons/fi';

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null); // For lightbox modal

  useEffect(() => {
    async function fetchCertifications() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/certifications`);
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data)) {
            setCertifications(json.data);
          }
        }
      } catch {
        // Fallback remains empty
      } finally {
        setLoading(false);
      }
    }
    fetchCertifications();
  }, []);

  // Escape key closes modal
  useEffect(() => {
    if (!selectedCert) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

  return (
    <>
      <SEO
        title="Verified Licenses & Certifications | Jagmohan Singh"
        description="Verified credentials and professional certifications in web design and front-end development earned by Jagmohan Singh."
        canonical="/certifications"
      />
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header Banner */}
        <SectionCard
          title="Licenses & Certifications"
          subtitle="Verified credentials, specializations, and professional development"
          headingLevel="h1"
        >
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Demonstrated technical competencies in Web Design, Front-End Development, WordPress architecture, and modern digital workflows.
          </p>
        </SectionCard>

        {/* Certifications Grid */}
        {loading ? (
          <div className="py-16 text-center text-xs text-slate-500">
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[#0a66c2] border-t-transparent mb-2" />
            Loading certifications...
          </div>
        ) : certifications.length === 0 ? (
          <SectionCard>
            <div className="py-12 text-center text-xs text-slate-500 space-y-2">
              <FiAward className="mx-auto text-3xl text-slate-300" />
              <p className="font-semibold text-slate-700">Certificates will be listed here soon</p>
              <p className="text-slate-400 max-w-md mx-auto">
                Professional credentials and course certifications are updated through the verified portfolio admin dashboard.
              </p>
            </div>
          </SectionCard>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs transition-all duration-200 hover:shadow-md hover:border-slate-300 group"
              >
                {/* Image Preview Box */}
                <div
                  onClick={() => setSelectedCert(cert)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelectedCert(cert)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open full image for ${cert.name}`}
                  className="relative h-44 w-full cursor-pointer overflow-hidden bg-slate-100 border-b border-slate-100 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:outline-none"
                >
                  {cert.imageUrl ? (
                    <img
                      src={cert.imageUrl}
                      alt={`${cert.name} certificate issued by ${cert.issuer || "verified provider"}`}
                      className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <FiAward className="text-4xl text-slate-300" />
                  )}
                  <div className="absolute inset-0 bg-slate-900/0 transition-colors group-hover:bg-slate-900/10 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-xs">
                      <FiMaximize2 />
                      <span>View Certificate</span>
                    </span>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#0a66c2] transition-colors">
                      {cert.name}
                    </h2>
                    {cert.issuer && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mt-1">
                        <FiUserCheck className="text-slate-400" />
                        <span>{cert.issuer}</span>
                      </div>
                    )}
                    {cert.issueDate && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                        <FiCalendar className="text-slate-400" />
                        <span>Issued {cert.issueDate}</span>
                      </div>
                    )}
                    {cert.description && (
                      <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {cert.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="font-semibold text-[#0a66c2] hover:underline cursor-pointer"
                    >
                      View Certificate
                    </button>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 transition"
                      >
                        <span>Credential</span>
                        <FiExternalLink className="text-[10px]" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Accessible Lightbox Modal */}
        {selectedCert && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4"
            onClick={() => setSelectedCert(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-2xl bg-white p-4 sm:p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 id="lightbox-title" className="text-base font-bold text-slate-900">
                    {selectedCert.name}
                  </h2>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {selectedCert.issuer && <span>{selectedCert.issuer} • </span>}
                    {selectedCert.issueDate && <span>Issued {selectedCert.issueDate}</span>}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
                  aria-label="Close certificate viewer"
                  title="Close viewer"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              <div className="flex-1 overflow-auto flex items-center justify-center bg-slate-50 rounded-xl p-2 min-h-[300px]">
                <img
                  src={selectedCert.imageUrl}
                  alt={`${selectedCert.name} certificate full preview`}
                  className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg shadow-sm"
                />
              </div>

              {selectedCert.credentialUrl && (
                <div className="flex justify-end pt-2">
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#0a66c2] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#004182] transition"
                  >
                    <span>Verify Online Credential</span>
                    <FiExternalLink />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
