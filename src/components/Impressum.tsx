"use client";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface ImpressumSection {
  heading?: string;
  body?: string;
}

interface ImpressumData {
  heading?: string;
  companyName?: string;
  address?: string;
  contactHeading?: string;
  email?: string;
  phone?: string;
  legalHeading?: string;
  legalForm?: string;
  vatNumber?: string;
  registerEntry?: string;
  responsiblePerson?: string;
  sections?: ImpressumSection[];
}

export function Impressum() {
  const [data, setData] = useState<ImpressumData>({});

  useEffect(() => {
    fetch("/api/impressum")
      .then((r) => r.json())
      .then((d: ImpressumData) => setData(d))
      .catch(() => {});
  }, []);

  const heading          = data.heading          ?? "Impressum";
  const companyName      = data.companyName      ?? "";
  const address          = data.address          ?? "";
  const contactHeading   = data.contactHeading   ?? "Contact";
  const email            = data.email            ?? "";
  const phone            = data.phone            ?? "";
  const legalHeading     = data.legalHeading     ?? "Legal Information";
  const legalForm        = data.legalForm        ?? "";
  const vatNumber        = data.vatNumber        ?? "";
  const registerEntry    = data.registerEntry    ?? "";
  const responsiblePerson = data.responsiblePerson ?? "";
  const sections         = data.sections         ?? [];

  const hasContact = email || phone;
  const hasLegal   = legalForm || vatNumber || registerEntry || responsiblePerson;

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Heading */}
        <motion.h1
          className="text-7xl md:text-9xl uppercase tracking-tighter mb-16"
          style={{ fontFamily: "var(--font-heading)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {heading}
        </motion.h1>

        {/* Legal entity */}
        {(companyName || address) && (
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {companyName && (
              <p className="text-xl font-semibold mb-3">{companyName}</p>
            )}
            {address && (
              <p className="text-white/70 whitespace-pre-line leading-relaxed">
                {address}
              </p>
            )}
          </motion.section>
        )}

        {/* Contact */}
        {hasContact && (
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2
              className="text-2xl uppercase tracking-wider mb-4 text-red-500"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {contactHeading}
            </h2>
            <dl className="space-y-2 text-white/70">
              {email && (
                <div className="flex gap-4">
                  <dt className="w-24 shrink-0 uppercase tracking-widest text-xs text-white/40 font-mono pt-0.5">
                    Email
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${email}`}
                      className="hover:text-red-400 transition-colors"
                    >
                      {email}
                    </a>
                  </dd>
                </div>
              )}
              {phone && (
                <div className="flex gap-4">
                  <dt className="w-24 shrink-0 uppercase tracking-widest text-xs text-white/40 font-mono pt-0.5">
                    Phone
                  </dt>
                  <dd>
                    <a
                      href={`tel:${phone.replace(/\D/g, "")}`}
                      className="hover:text-red-400 transition-colors"
                    >
                      {phone}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </motion.section>
        )}

        {/* Legal info */}
        {hasLegal && (
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2
              className="text-2xl uppercase tracking-wider mb-4 text-red-500"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {legalHeading}
            </h2>
            <dl className="space-y-2 text-white/70">
              {legalForm && (
                <div className="flex gap-4">
                  <dt className="w-32 shrink-0 uppercase tracking-widest text-xs text-white/40 font-mono pt-0.5">
                    Legal Form
                  </dt>
                  <dd>{legalForm}</dd>
                </div>
              )}
              {vatNumber && (
                <div className="flex gap-4">
                  <dt className="w-32 shrink-0 uppercase tracking-widest text-xs text-white/40 font-mono pt-0.5">
                    VAT / Tax No.
                  </dt>
                  <dd>{vatNumber}</dd>
                </div>
              )}
              {registerEntry && (
                <div className="flex gap-4">
                  <dt className="w-32 shrink-0 uppercase tracking-widest text-xs text-white/40 font-mono pt-0.5">
                    Register
                  </dt>
                  <dd>{registerEntry}</dd>
                </div>
              )}
              {responsiblePerson && (
                <div className="flex gap-4">
                  <dt className="w-32 shrink-0 uppercase tracking-widest text-xs text-white/40 font-mono pt-0.5">
                    Responsible
                  </dt>
                  <dd>{responsiblePerson}</dd>
                </div>
              )}
            </dl>
          </motion.section>
        )}

        {/* Additional sections */}
        {sections.map((section, i) => (
          <motion.section
            key={i}
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
          >
            {section.heading && (
              <h2
                className="text-2xl uppercase tracking-wider mb-4 text-red-500"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {section.heading}
              </h2>
            )}
            {section.body && (
              <p className="text-white/70 whitespace-pre-line leading-relaxed">
                {section.body}
              </p>
            )}
          </motion.section>
        ))}

        {/* Kunsttech credit */}
        <motion.div
          className="mt-20 pt-8 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-xs font-mono uppercase tracking-widest text-white/30">
            Developed by{" "}
            <a
              href="https://kunsttech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-red-500 transition-colors duration-200"
            >
              Kunsttech
            </a>
          </p>
        </motion.div>

      </div>
    </div>
  );
}
