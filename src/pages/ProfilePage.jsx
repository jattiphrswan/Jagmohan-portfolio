import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import Footer from "../components/Footer";
import { profile } from "../data/profile";
import { FiPhone, FiMail } from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";

function Section({ title, children, id }) {
  return (
    <section id={id} className="rounded-xl border bg-white scroll-mt-24">
      <div className="border-b px-5 py-4">
        <h2 className="text-base font-semibold">{title}</h2>
      </div>
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}

export default function ProfilePage() {
  const contactItems = [
    { key: "phone", Icon: FiPhone },
    { key: "email", Icon: FiMail },
    { key: "linkedin", Icon: FaLinkedin },
    { key: "github", Icon: FaGithub },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="mx-auto w-full max-w-[1600px] grid grid-cols-1 gap-6 px-6 py-5 lg:grid-cols-12">
        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:col-span-2 lg:block space-y-4">
          {/* Contact */}
          <div className="rounded-xl border bg-white p-4">
            <div className="text-sm font-semibold">Contact</div>

            <div className="mt-2 space-y-3 text-sm text-slate-600">
              {contactItems.map(({ key, Icon }) => {
                const item = profile?.contact?.[key];
                if (!item || typeof Icon !== "function") return null;

                const isExternal = item.href?.startsWith("http");

                return (
                  <div key={key} className="flex items-center gap-2">
                    <Icon className="text-slate-500" />
                    <a
                      href={item.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="text-blue-600 hover:underline break-all"
                    >
                      {item.label}
                    </a>
                  </div>
                );
              })}

              {/* Hire Me -> CALL */}
              <div className="pt-3">
                <a
                  href={profile?.contact?.phone?.href || "#"}
                  className="inline-flex w-full justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="rounded-xl border bg-white p-4">
            <div className="text-sm font-semibold">Services</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-1">
              {(profile?.services || []).map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className="rounded-xl border bg-white p-4">
            <div className="text-sm font-semibold">Tools</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(profile?.tools || []).map((t) => (
                <span
                  key={t}
                  className="rounded-full border px-2.5 py-1 text-xs text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* CENTER */}
        <section className="lg:col-span-8 space-y-4">
          <ProfileCard profile={profile} />

          <Section title="About" id="about">
            <p className="text-sm leading-6 text-slate-700">{profile?.about}</p>
          </Section>

          <Section title="Experience" id="experience">
            <div className="space-y-4">
              {(profile?.experience || []).map((x, i) => (
                <div key={i} className="border-b last:border-b-0 pb-4 last:pb-0">
                  <div className="font-semibold">{x.role}</div>
                  <div className="text-sm text-slate-700">
                    {x.company} {x.type ? `• ${x.type}` : ""}
                  </div>
                  <div className="text-sm text-slate-500">
                    {x.start} – {x.end} {x.location ? `• ${x.location}` : ""}
                  </div>

                  <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                    {(x.bullets || []).map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Education" id="education">
            <div className="space-y-3">
              {(profile?.education || []).map((e, i) => (
                <div key={i}>
                  <div className="font-semibold">{e.school}</div>
                  <div className="text-sm text-slate-700">{e.degree}</div>
                  <div className="text-sm text-slate-500">
                    {e.start} – {e.end}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Skills" id="skills">
            <div className="flex flex-wrap gap-2">
              {(profile?.skills || []).map((s) => (
                <span
                  key={s}
                  className="rounded-full border bg-white px-3 py-1 text-sm text-slate-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>
        </section>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden lg:col-span-2 lg:block">
          <div className="rounded-xl border bg-white p-4">
            <div className="text-sm font-semibold">People also viewed</div>

            <div className="mt-3 space-y-3">
              {(profile?.peopleAlsoViewed || []).map((p, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-200" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{p.name}</div>
                    <div className="truncate text-xs text-slate-500">{p.role}</div>
                  </div>
                  <button className="ml-auto rounded-full border px-3 py-1 text-xs font-semibold hover:bg-slate-50">
                    {p.button || "View"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
