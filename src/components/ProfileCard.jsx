import { FiPhone, FiMail, FiMapPin, FiBriefcase, FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/image";

export default function ProfileCard({ profile }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Banner */}
      <div className="relative h-32 sm:h-44 md:h-52 w-full overflow-hidden bg-gradient-to-r from-slate-800 via-blue-950 to-slate-900">
        {profile?.banner && (
          <img
            src={getImageUrl(profile.banner)}
            alt="Jagmohan Singh profile cover banner"
            width="1200"
            height="350"
            loading="eager"
            className="h-full w-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
          />
        )}
      </div>

      <div className="relative px-5 pb-6">
        {/* Avatar & Action row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-20">
          {/* Avatar */}
          <div className="relative z-10 h-28 w-28 sm:h-36 sm:w-36 shrink-0 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md ring-1 ring-slate-200">
            {profile?.avatar ? (
              <img
                src={getImageUrl(profile.avatar)}
                alt={`${profile?.name || "Jagmohan Singh"} profile avatar`}
                width="144"
                height="144"
                loading="eager"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-200 text-xl font-bold text-slate-600">
                JS
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-0">
            <a
              href={profile?.contact?.phone?.href || "tel:+919315667284"}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0a66c2] px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#004182] active:scale-95"
            >
              <FiPhone className="text-sm" />
              <span>Connect</span>
            </a>
            <a
              href={profile?.contact?.email?.href || "mailto:jattiphrswan49@gmail.com"}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#0a66c2] px-5 py-2 text-xs sm:text-sm font-semibold text-[#0a66c2] transition-all hover:bg-blue-50/80 active:scale-95"
            >
              <FiMail className="text-sm" />
              <span>Message</span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-400 active:scale-95"
            >
              <span>More</span>
            </Link>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              {profile.name}
            </h1>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-[#0a66c2] border border-blue-200">
              1st
            </span>
          </div>

          <p className="mt-1 text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl font-normal">
            {profile.headline}
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            <span className="flex items-center gap-1 text-slate-600">
              <FiBriefcase className="text-slate-400 text-sm shrink-0" />
              <span className="capitalize">{profile.company || "SkyFish Development"}</span>
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <FiMapPin className="text-slate-400 text-sm shrink-0" />
              <span>{profile.location || "Delhi, India"}</span>
            </span>
            <Link
              to="/contact"
              className="font-semibold text-[#0a66c2] hover:underline flex items-center gap-1"
            >
              <span>Contact info</span>
              <FiExternalLink className="text-[10px]" />
            </Link>
          </div>

          {/* Open to work banner (LinkedIn style) */}
          <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/50 p-3 text-xs text-slate-700">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>Open to work</span>
            </div>
            <p className="mt-0.5 text-slate-600">
              Web Designer & Front-End Developer roles • Full-time & Remote projects
            </p>
            <Link
              to="/experience"
              className="mt-1.5 inline-block font-semibold text-[#0a66c2] hover:underline"
            >
              See all experience details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

