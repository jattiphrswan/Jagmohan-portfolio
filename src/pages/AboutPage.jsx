import { profile } from '../data/profile';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="rounded-xl border bg-white">
        <div className="border-b px-5 py-4">
          <h1 className="text-base font-semibold">About</h1>
        </div>
        <div className="px-5 py-4">
          <p className="text-sm leading-6 text-slate-700">{profile.about}</p>
        </div>
      </div>

      <div className="rounded-xl border bg-white">
        <div className="border-b px-5 py-4">
          <h2 className="text-base font-semibold">Services</h2>
        </div>
        <div className="px-5 py-4">
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            {(profile.services || []).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
