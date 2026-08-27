import { profile } from '../data/profile';

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="rounded-xl border bg-white">
        <div className="border-b px-5 py-4">
          <h1 className="text-base font-semibold">Skills</h1>
        </div>
        <div className="px-5 py-4">
          <div className="flex flex-wrap gap-2">
            {(profile.skills || []).map((s) => (
              <span
                key={s}
                className="cursor-pointer rounded-full border bg-white px-3 py-1 text-sm text-slate-700 transition-all duration-200 hover:bg-blue-700 hover:text-white hover:border-blue-700 hover:-translate-y-0.5 hover:shadow-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white">
        <div className="border-b px-5 py-4">
          <h2 className="text-base font-semibold">Tools</h2>
        </div>
        <div className="px-5 py-4">
          <div className="flex flex-wrap gap-2">
            {(profile.tools || []).map((t) => (
              <span key={t} className="rounded-full border px-2.5 py-1 text-xs text-slate-700">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
