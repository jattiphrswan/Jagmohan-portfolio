export default function ProfileCard({ profile }) {
  const withBase = (p) => {
    if (!p) return "";
    const base = import.meta.env.BASE_URL; // "/" locally, "/Jagmohan-portfolio/" on GitHub Pages
    // if path starts with "/", remove it and prefix base
    if (p.startsWith("/")) return `${base}${p.slice(1)}`;
    // if already absolute http(s), keep it
    if (p.startsWith("http")) return p;
    // otherwise treat as filename in /images
    return `${base}images/${p}`;
  };

  const bannerUrl = withBase(profile.banner);
  const avatarUrl = withBase(profile.avatar);

  return (
    <div className="rounded-xl border bg-white">
      {/* Banner */}
      <div className="relative h-36 overflow-hidden rounded-t-xl bg-slate-200">
        {profile.banner && (
          <img
            src={bannerUrl}
            alt="Profile banner"
            className="h-full w-full object-cover"
            onError={(e) => {
              console.log("Banner failed:", bannerUrl);
              e.currentTarget.style.display = "none";
            }}
          />
        )}
      </div>

      <div className="relative px-5 pb-5">
        <div className="-mt-12 flex items-end justify-between gap-3">
          {/* Avatar */}
          <div className="relative z-10 h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-slate-300 shadow">
            {profile.avatar && (
              <img
                src={avatarUrl}
                alt={profile.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  console.log("Avatar failed:", avatarUrl);
                  e.currentTarget.style.display = "none";
                }}
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
