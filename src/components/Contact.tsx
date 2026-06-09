"use client";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

const ZEBRA_PATTERN =
  "https://images.unsplash.com/photo-1592227361629-8e83b605f9c4?w=1920&h=1080&fit=crop&auto=format";

const DEFAULT_CONTACT = {
  email: "hello@stagedesigner.com",
  phone: "+1 (555) 123-4567",
  instagram: "@stagedesigner",
  instagramHref: "https://instagram.com/stagedesigner",
  location: "London, UK",
};

interface ContactData {
  page?: {
    heading?: string;
    introText?: string;
    formHeadline?: string;
    submitLabel?: string;
  };
  settings?: {
    email?: string;
    phone?: string;
    location?: string;
    instagram?: string;
    linkedin?: string;
  };
}

type FormStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [pageHeading, setPageHeading] = useState("Contact");
  const [introText, setIntroText] = useState("Let's collaborate on your next production. Available for theatrical design projects worldwide.");
  const [formHeadline, setFormHeadline] = useState("Send a Message");
  const [submitLabel, setSubmitLabel] = useState("Send Message");
  const [contactInfo, setContactInfo] = useState(DEFAULT_CONTACT);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then((data: ContactData) => {
        const p = data?.page;
        if (p) {
          if (p.heading)      setPageHeading(p.heading);
          if (p.introText)    setIntroText(p.introText);
          if (p.formHeadline) setFormHeadline(p.formHeadline);
          if (p.submitLabel)  setSubmitLabel(p.submitLabel);
        }
        const s = data?.settings;
        if (s) {
          setContactInfo((prev) => ({
            ...prev,
            email: s.email ?? prev.email,
            phone: s.phone ?? prev.phone,
            location: s.location ?? prev.location,
            instagram: s.instagram ? `@${s.instagram.replace("@", "")}` : prev.instagram,
            instagramHref: s.instagram
              ? `https://instagram.com/${s.instagram.replace("@", "")}`
              : prev.instagramHref,
          }));
        }
      })
      .catch(() => {
        // Silently fall back to defaults
      });
  }, []);

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone.replace(/\D/g, "")}`,
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: contactInfo.instagram,
      href: contactInfo.instagramHref,
    },
    {
      icon: MapPin,
      label: "Location",
      value: contactInfo.location,
      href: null,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    const accessKey = (import.meta as { env: { PUBLIC_WEB3FORMS_ACCESS_KEY?: string } }).env?.PUBLIC_WEB3FORMS_ACCESS_KEY;

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey ?? "",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      const result = (await res.json()) as { success: boolean };
      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 relative overflow-hidden">
      {/* Zebra Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ZEBRA_PATTERN})` }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Red lighting effects */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,0,0,0.2) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: ["10%", "80%", "10%"],
          y: ["20%", "70%", "20%"],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <motion.h1
          className="text-7xl md:text-9xl uppercase tracking-tighter mb-12"
          style={{ fontFamily: "var(--font-heading)" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {pageHeading}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white/60 mb-20 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {introText}
        </motion.p>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
            >
              {method.href ? (
                <motion.a
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-start gap-6 p-6 border-2 border-white/10 hover:border-red-500 transition-all duration-500 rounded-2xl hover:shadow-[0_0_30px_rgba(239,68,68,0.6),inset_0_0_20px_rgba(239,68,68,0.2)]"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,0,0,0.05)" }}
                >
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                    <method.icon className="w-8 h-8 text-red-500" strokeWidth={1} />
                  </motion.div>
                  <div>
                    <div className="text-sm uppercase tracking-widest text-white/40 mb-2 font-mono">
                      {method.label}
                    </div>
                    <div className="text-xl group-hover:text-red-500 transition-all group-hover:[text-shadow:0_0_20px_rgba(239,68,68,0.8)]">
                      {method.value}
                    </div>
                  </div>
                </motion.a>
              ) : (
                <div className="flex items-start gap-6 p-6 border-2 border-white/10 rounded-2xl">
                  <method.icon className="w-8 h-8 text-red-500" strokeWidth={1} />
                  <div>
                    <div className="text-sm uppercase tracking-widest text-white/40 mb-2 font-mono">
                      {method.label}
                    </div>
                    <div className="text-xl">{method.value}</div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          className="border-t-2 border-white/10 pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h2
            className="text-4xl uppercase tracking-wider mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {formHeadline}
          </h2>

          {formStatus === "success" ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-6xl mb-4">✓</div>
              <p className="text-xl text-white/70">
                Message sent! I'll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  required
                  className="bg-transparent border-2 border-white/10 px-6 py-4 text-white placeholder:text-white/30 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.5)] outline-none transition-all uppercase tracking-wider rounded-2xl"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  required
                  className="bg-transparent border-2 border-white/10 px-6 py-4 text-white placeholder:text-white/30 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.5)] outline-none transition-all uppercase tracking-wider rounded-2xl"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                required
                className="w-full bg-transparent border-2 border-white/10 px-6 py-4 text-white placeholder:text-white/30 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.5)] outline-none transition-all uppercase tracking-wider rounded-2xl"
              />
              <textarea
                rows={6}
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                required
                className="w-full bg-transparent border-2 border-white/10 px-6 py-4 text-white placeholder:text-white/30 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.5)] outline-none transition-all uppercase tracking-wider resize-none rounded-2xl"
              />

              {formStatus === "error" && (
                <p className="text-red-400 text-sm font-mono">
                  Something went wrong. Please try again or email directly.
                </p>
              )}

              <motion.button
                type="submit"
                disabled={formStatus === "sending"}
                className="px-8 py-4 bg-red-600 rounded-full text-white uppercase tracking-widest hover:bg-red-700 transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.8),inset_0_0_20px_rgba(239,68,68,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={{ scale: formStatus === "sending" ? 1 : 1.05 }}
                whileTap={{ scale: formStatus === "sending" ? 1 : 0.95 }}
              >
                {formStatus === "sending" ? "Sending..." : submitLabel}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-20 pt-12 border-t-2 border-white/10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-sm uppercase tracking-widest font-mono text-white/40">
            &copy; {new Date().getFullYear()} Stage Designer. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
