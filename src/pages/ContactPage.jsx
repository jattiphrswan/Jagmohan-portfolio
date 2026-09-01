import { useState } from "react";
import SectionCard from "../components/SectionCard";
import SEO from "../components/SEO";
import { useProfile } from "../context/useProfile";
import { API_BASE } from "../config/api";
import {
  FiPhone,
  FiMail,
  FiSend,
  FiAlertCircle,
  FiCheckCircle,
  FiLoader
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "wordpress",
    budget: "flexible",
    message: "",
    website: "" // Honeypot field for bot protection
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Client-side validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError("Please provide your name (at least 2 characters).");
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setError("Please write a message with at least 10 characters.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to send message. Please try again shortly.");
      }

      setSuccess("Thanks! Your message has been sent. I'll get back to you soon.");
      // Reset form on successful delivery
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "wordpress",
        budget: "flexible",
        message: "",
        website: ""
      });
    } catch (err) {
      setError(err.message || "Message could not be sent right now. Please try again shortly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Jagmohan Singh | Web Designer & Front-End Developer"
        description="Get in touch with Jagmohan Singh for freelance web design, custom WordPress development, and front-end engineering opportunities."
        canonical="/contact"
      />
      <div className="mx-auto max-w-4xl space-y-5">
        {/* Direct Contact Cards */}
        <SectionCard
          title="Get in Touch"
          subtitle="Direct communication channels"
          headingLevel="h1"
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

        {/* Contact Enquiry Form */}
        <SectionCard
          title="Send an Enquiry"
          subtitle="Direct message notification to Jagmohan's Gmail"
        >
          {/* Success Alert */}
          {success && (
            <div
              role="alert"
              aria-live="polite"
              className="mb-4 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-800"
            >
              <FiCheckCircle className="text-lg shrink-0 text-emerald-600" />
              <span className="font-medium">{success}</span>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div
              role="alert"
              aria-live="polite"
              className="mb-4 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700"
            >
              <FiAlertCircle className="text-lg shrink-0 text-red-500" />
              <span className="font-medium">{error}</span>
            </div>
          )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Honeypot Bot Trap (Invisible to real users, trapped bots fill it) */}
          <div style={{ display: "none" }} aria-hidden="true">
            <label htmlFor="website">Leave this field blank</label>
            <input
              id="website"
              name="website"
              type="text"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block font-semibold text-slate-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={submitting}
                placeholder="e.g. Rahul Sharma"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 transition focus:border-[#0a66c2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a66c2] disabled:opacity-60"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-semibold text-slate-700 mb-1">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={submitting}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 transition focus:border-[#0a66c2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a66c2] disabled:opacity-60"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block font-semibold text-slate-700 mb-1">
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                disabled={submitting}
                placeholder="+91 98765 43210"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 transition focus:border-[#0a66c2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a66c2] disabled:opacity-60"
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block font-semibold text-slate-700 mb-1">
                Company / Organization (Optional)
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                disabled={submitting}
                placeholder="e.g. Acme Corp"
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 transition focus:border-[#0a66c2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a66c2] disabled:opacity-60"
              />
            </div>

            {/* Project Type */}
            <div>
              <label htmlFor="projectType" className="block font-semibold text-slate-700 mb-1">
                Project Type / Subject
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                disabled={submitting}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 transition focus:border-[#0a66c2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a66c2] disabled:opacity-60"
              >
                <option value="WordPress Website / WooCommerce">WordPress Website / WooCommerce</option>
                <option value="Custom React / Tailwind Frontend">Custom React / Tailwind Frontend</option>
                <option value="Website Redesign / UI Polish">Website Redesign / UI Polish</option>
                <option value="Full-Time / Contract Role">Full-Time / Contract Role</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block font-semibold text-slate-700 mb-1">
                Estimated Budget (Optional)
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                disabled={submitting}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-900 transition focus:border-[#0a66c2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a66c2] disabled:opacity-60"
              >
                <option value="Flexible / Discussion">Flexible / Discussion</option>
                <option value="< $500 (Basic Website)">&lt; $500 (Basic Website)</option>
                <option value="$500 – $1,500 (Custom CMS / Store)">$500 – $1,500 (Custom CMS / Store)</option>
                <option value="$1,500+ (Full Web App / Enterprise)">$1,500+ (Full Web App / Enterprise)</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block font-semibold text-slate-700 mb-1">
              Project Details / Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              disabled={submitting}
              placeholder="Describe your project, timeline, or requirements..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-3 text-xs text-slate-900 placeholder-slate-400 transition focus:border-[#0a66c2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a66c2] disabled:opacity-60"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0a66c2] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#004182] active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              {submitting ? (
                <>
                  <FiLoader className="text-sm animate-spin" />
                  <span>Sending enquiry...</span>
                </>
              ) : (
                <>
                  <FiSend className="text-sm" />
                  <span>Send Message</span>
                </>
              )}
            </button>

            <span className="text-[11px] text-slate-400">
              Direct delivery to Jagmohan's Gmail
            </span>
          </div>
        </form>
      </SectionCard>
    </div>
    </>
  );
}
