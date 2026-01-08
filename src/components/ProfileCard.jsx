export default function ProfileCard({ profile }) {
  // ✅ Fix paths for GitHub Pages + local dev
  const avatarUrl = profile.avatar
    ? `${import.meta.env.BASE_URL}images/${profile.avatar}`
    : null;

  const bannerUrl = profile.banner
    ? `${import.meta.env.BASE_URL}images/${profile.banner}`
    : null;

  return (
    <div className="rounded-xl border bg-white">
      {/* Banner */}
      <div className="relative h-36 overflow-hidden rounded-t-xl bg-slate-200">
        {bannerUrl && (
          <img
            src={bannerUrl}
            alt="Profile banner"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="relative px-5 pb-5">
        {/* Profile image + actions */}
        <div className="-mt-12 flex items-end justify-between gap-3">
          {/* Avatar */}
          <div className="relative z-10 h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-slate-300 shadow">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <a
              href={profile.contact?.phone?.href}
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Connect
            </a>
            <a
              href={profile.contact?.email?.href}
              className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Message
            </a>
          </div>
        </div>

        {/* Info */}
        <div className="mt-3">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="mt-1 text-slate-700">{profile.headline}</p>

          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
            <span>{profile.company}</span>
            <span>•</span>
            <span>{profile.projects} Projects</span>
          </div>
        </div>
      </div>
    </div>
  );
}
