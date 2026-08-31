import SectionCard from "../components/SectionCard";
import { useProfile } from "../context/useProfile";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiSend,
  FiInfo,
} from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";

function ContactItem({ icon: Icon, label, value, href }) {
  if (!href || !value) return null;
  const isExternal = href.startsWith("http");
  return (
    <div className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/60 p-3 text-xs">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0a66c2] text-sm">
        <Icon />
      </div>
      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-medium text-slate-500 block">{label}</span>
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-slate-900 font-semibold hover:text-[#0a66c2] hover:underline break-all transition-colors"
        >
          {value}
        </a>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { profile } = useProfile();
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("The contact backend will be connected in Node N11 with Gmail API.");
  };


  return (
    <div className="mx-auto max-w-4xl space-y-5">
      {/* Direct Contact Cards */}
      <SectionCard
        title="Get in Touch"
        subtitle="Direct communication channels"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ContactItem
            icon={FiPhone}
            label="Direct Phone"
            value={profile?.contact?.phone?.label}
            href={profile?.contact?.phone?.href}
          />
          <ContactItem
            icon={FiMail}
            label="Email Address"
            value={profile?.contact?.email?.label}
            href={profile?.contact?.email?.href}
          />
          <ContactItem
            icon={FaLinkedin}
            label="LinkedIn Profile"
            value="linkedin.com/in/jagmohan-singh49"
            href={profile?.contact?.linkedin?.href}
          />
          <ContactItem
            icon={FaGithub}
            label="GitHub Profile"
            value="github.com/jattiphrswan"
            href={profile?.contact?.github?.href}
          />
        </div>
      </SectionCard>

      {/* Form Visual System Prototype (Backend in N11) */}
      <SectionCard
        title="Send an Enquiry"
        subtitle="Visual form system — full backend submission connects in Node N11"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 transition focus:border-[#0a66c2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a66c2]"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 transition focus:border-[#0a66c2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a66c2]"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 transition focus:border-[#0a66c2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a66c2]"
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-xs font-semibold text-slate-700 mb-1">
                Company / Organization
              </label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="e.g. Acme Corp"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 transition focus:border-[#0a66c2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a66c2]"
              />
            </div>

            {/* Project Type */}
            <div>
              <label htmlFor="projectType" className="block text-xs font-semibold text-slate-700 mb-1">
                Project Type
              </label>
              <select
                id="projectType"
                name="projectType"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 transition focus:border-[#0a66c2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a66c2]"
              >
                <option value="wordpress">WordPress Website / WooCommerce</option>
                <option value="frontend">Custom React / Tailwind Frontend</option>
                <option value="redesign">Website Redesign / UI Polish</option>
                <option value="fulltime">Full-Time / Contract Role</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-xs font-semibold text-slate-700 mb-1">
                Estimated Budget (Optional)
              </label>
              <select
                id="budget"
                name="budget"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 transition focus:border-[#0a66c2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a66c2]"
              >
                <option value="flexible">Flexible / Discussion</option>
                <option value="small">&lt; $500 (Basic Website)</option>
                <option value="medium">$500 – $1,500 (Custom CMS / Store)</option>
                <option value="large">$1,500+ (Full Web App / Enterprise)</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1">
              Project Details / Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Describe your project, timeline, or inquiry..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-3 text-xs text-slate-900 placeholder-slate-400 transition focus:border-[#0a66c2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a66c2]"
            ></textarea>
          </div>

          {/* Backend Info Notice */}
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 border border-slate-100 p-3 text-[11px] text-slate-500">
            <FiInfo className="text-slate-400 text-sm shrink-0" />
            <span>
              In Node N11, this form will validate via Zod, store in PostgreSQL, and send instant notification to <strong>jattiphrswan49@gmail.com</strong> via Resend API.
            </span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0a66c2] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#004182] active:scale-95 cursor-pointer"
            >
              <FiSend className="text-sm" />
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
}

