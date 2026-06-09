"use client";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Lightbulb, Box, Palette, Ruler } from "lucide-react";

const ZEBRA_PATTERN =
  "https://images.unsplash.com/photo-1644432250799-69c6227880d4?w=1920&h=1080&fit=crop&auto=format";

interface ServiceItem {
  title: string;
  description: string;
  image: string;
  features: string[];
}

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    title: "Theatrical Models",
    description:
      "Precision-crafted scale models that visualize stage designs with meticulous attention to architectural detail and spatial relationships.",
    image:
      "https://images.unsplash.com/photo-1704120788707-7b1594f78e1f?w=800&h=600&fit=crop&auto=format",
    features: [
      "Scale model construction",
      "Architectural precision",
      "Material experimentation",
      "3D visualization",
    ],
  },
  {
    title: "Set Design",
    description:
      "Comprehensive set design services from concept development to final production, creating immersive environments that serve the narrative.",
    image:
      "https://images.unsplash.com/photo-1596040078821-9b5f50e71ea5?w=800&h=600&fit=crop&auto=format",
    features: [
      "Concept development",
      "Technical drawings",
      "Material selection",
      "On-site collaboration",
    ],
  },
  {
    title: "Lighting Design",
    description:
      "Dynamic lighting schemes that enhance mood, direct focus, and transform spaces through strategic use of color, intensity, and movement.",
    image:
      "https://images.unsplash.com/photo-1471877325906-aee7c2240b5f?w=800&h=600&fit=crop&auto=format",
    features: [
      "Lighting plots",
      "Color programming",
      "Cue design",
      "Technical supervision",
    ],
  },
  {
    title: "Spatial Planning",
    description:
      "Strategic spatial design that maximizes performance potential while considering sightlines, acoustics, and audience experience.",
    image:
      "https://images.unsplash.com/photo-1558970439-add78fc68990?w=800&h=600&fit=crop&auto=format",
    features: [
      "Space analysis",
      "Sightline studies",
      "Flow optimization",
      "Accessibility planning",
    ],
  },
];

interface ServicesData {
  services?: { name: string; description: string; image: string; features?: string[] }[];
}

export function Services() {
  const [pageHeading, setPageHeading] = useState("Services");
  const [introText, setIntroText] = useState("Comprehensive stage design services for theater, opera, dance, and live performance.");
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data: ServicesData & { page?: { heading?: string; introText?: string } }) => {
        if (data?.page?.heading)   setPageHeading(data.page.heading);
        if (data?.page?.introText) setIntroText(data.page.introText);
        if (data?.services?.length) {
          setServices(
            data.services.map((s, i) => ({
              title: s.name ?? DEFAULT_SERVICES[i % DEFAULT_SERVICES.length].title,
              description: s.description ?? DEFAULT_SERVICES[i % DEFAULT_SERVICES.length].description,
              image: (s as { src?: string; image?: string }).src ?? s.image ?? DEFAULT_SERVICES[i % DEFAULT_SERVICES.length].image,
              features: s.features ?? DEFAULT_SERVICES[i % DEFAULT_SERVICES.length].features,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-24 relative overflow-hidden">
      {/* Zebra Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ZEBRA_PATTERN})` }}
        />
      </div>

      {/* Red spotlight */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,0,0,0.15) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
        animate={{
          x: ["0%", "100%", "0%"],
          y: ["0%", "50%", "0%"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <motion.h1
          className="text-7xl md:text-9xl uppercase tracking-tighter mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {pageHeading}
        </motion.h1>
        <motion.p
          className="text-xl text-white/60 max-w-2xl mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {introText}
        </motion.p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="border-2 border-white/10 hover:border-red-500 transition-all duration-500 group relative overflow-hidden rounded-3xl hover:shadow-[0_0_30px_rgba(239,68,68,0.6),inset_0_0_20px_rgba(239,68,68,0.2)]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Service Image */}
              <div className="relative h-72 overflow-hidden rounded-t-3xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 relative">
                <h3
                  className="text-3xl uppercase tracking-wider mb-4 group-hover:text-red-500 transition-all relative"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {service.title}
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      className="text-sm uppercase tracking-widest text-white/50 font-mono flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <span className="w-2 h-2 bg-red-500" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xl mb-6">Interested in collaborating?</p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 border-2 rounded-full border-white text-white uppercase tracking-widest hover:bg-red-500 hover:border-red-500 transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.8)]"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  );
}
