import { profile } from '../data/profile';
import { FiPhone, FiMail } from 'react-icons/fi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

function ContactItem({ icon: Icon, label, item }) {
  if (!item) return null;
  const isExternal = item.href?.startsWith('http');
  return (
    <div className="flex items-center gap-3 text-sm">
      <Icon className="text-slate-500 shrink-0" />
      <span className="text-slate-500 w-16">{label}</span>
      <a
        href={item.href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="text-blue-600 hover:underline break-all"
      >
        {item.label}
      </a>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="rounded-xl border bg-white">
        <div className="border-b px-5 py-4">
          <h1 className="text-base font-semibold">Contact</h1>
        </div>
        <div className="px-5 py-4 space-y-3">
          <ContactItem icon={FiPhone}    label="Phone"    item={profile?.contact?.phone} />
          <ContactItem icon={FiMail}     label="Email"    item={profile?.contact?.email} />
          <ContactItem icon={FaLinkedin} label="LinkedIn" item={profile?.contact?.linkedin} />
          <ContactItem icon={FaGithub}   label="GitHub"   item={profile?.contact?.github} />
        </div>
      </div>

      <div className="rounded-xl border bg-white px-5 py-8 text-center text-sm text-slate-500">
        <p>Contact form coming soon.</p>
        <p className="mt-1 text-xs text-slate-400">
          Full enquiry form with email notification in a future update.
        </p>
      </div>
    </div>
  );
}
