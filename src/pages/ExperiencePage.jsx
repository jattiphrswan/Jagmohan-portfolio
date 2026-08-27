import { profile } from '../data/profile';

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="rounded-xl border bg-white">
        <div className="border-b px-5 py-4">
          <h1 className="text-base font-semibold">Experience</h1>
        </div>
        <div className="px-5 py-4 space-y-4">
          {(profile.experience || []).map((x, i) => (
            <details key={i} className="group border rounded-xl p-4">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-slate-900">{x.role}</h2>
                  <div className="text-sm text-slate-700">
                    {x.company}
                    {x.type ? <span className="mx-1">&bull;</span> : null}
                    {x.type}
                  </div>
                  <div className="text-sm text-slate-500">
                    {x.start} &ndash; {x.end}
                    {x.location ? <span className="mx-1">&bull;</span> : null}
                    {x.location}
                  </div>
                </div>
                <span className="mt-1 text-slate-500 group-open:rotate-180 transition">&#9660;</span>
              </summary>
              {Array.isArray(x.bullets) && x.bullets.length > 0 && (
                <ul className="mt-3 list-disc pl-5 text-sm text-slate-700 space-y-1">
                  {x.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
