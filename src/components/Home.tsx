"use client";
import { motion } from "motion/react";
import { ArrowRight, Box, Lightbulb, Palette } from "lucide-react";
import { useState, useEffect } from "react";
import { SectionDivider } from "@/components/SectionDivider";

const ZEBRA_BG =
  "https://images.unsplash.com/photo-1539770158377-43832757b687?w=1920&h=1080&fit=crop&auto=format";

const DEFAULT_PORTRAIT =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&auto=format";

const DEFAULT_BIO_PARAGRAPHS_HOME = [
  "A stage designer specializing in theatrical models, set design, and lighting for contemporary performance spaces. With a focus on bold visual storytelling and innovative spatial compositions.",
  "Each project combines architectural precision with artistic vision, creating immersive environments that serve the narrative and enhance the audience experience.",
];

const DEFAULT_STATS = [
  { number: "15+", label: "Productions Designed" },
  { number: "8",   label: "Countries Worldwide" },
  { number: "3",   label: "Design Awards" },
];

const DEFAULT_FEATURED_WORKS = [
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=1600&fit=crop&auto=format",
    title: "Opera Set Model",
    year: "2024",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=1200&h=800&fit=crop&auto=format",
    title: "Theater Lighting",
    year: "2023",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1000&h=1400&fit=crop&auto=format",
    title: "Contemporary Stage",
    year: "2024",
  },
];

const DEFAULT_SERVICES = [
  {
    icon: Box,
    title: "Theatrical Models",
    description: "Precision-crafted scale models",
    image:
      "https://images.unsplash.com/photo-1704120788707-7b1594f78e1f?w=800&h=600&fit=crop&auto=format",
  },
  {
    icon: Palette,
    title: "Set Design",
    description: "Immersive environments",
    image:
      "https://images.unsplash.com/photo-1596040078821-9b5f50e71ea5?w=800&h=600&fit=crop&auto=format",
  },
  {
    icon: Lightbulb,
    title: "Lighting Design",
    description: "Dynamic lighting schemes",
    image:
      "https://images.unsplash.com/photo-1471877325906-aee7c2240b5f?w=800&h=600&fit=crop&auto=format",
  },
];

interface FeaturedWork {
  id: number;
  src: string;
  title: string;
  year: string;
}

interface ServiceItem {
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
}

interface HomeData {
  home?: {
    heading?: string;
    tagline?: string;
    heroImageUrl?: string;
    ctaLabel?: string;
    stats?: { number: string; label: string }[];
  };
  pages?: {
    workPage?:     { heading?: string; introText?: string };
    servicesPage?: { heading?: string; introText?: string };
    aboutPage?:    { heading?: string; bio?: string };
    contactPage?:  { ctaHeading?: string; ctaText?: string };
  };
  featuredWorks?: { title: string; year: string; src: string }[];
  services?: { name: string; description: string; src: string }[];
}

interface Props {
  initialData?: HomeData | null;
}

export function Home({ initialData }: Props = {}) {
  const ih = initialData?.home;
  const ip = initialData?.pages;

  const [heading, setHeading] = useState(ih?.heading || "STAGE DESIGNER");
  const letters = heading.split("");
  const [worksHeading,    setWorksHeading]    = useState(ip?.workPage?.heading     || "Featured Work");
  const [worksIntro,      setWorksIntro]      = useState(ip?.workPage?.introText   || "");
  const [servicesHeading, setServicesHeading] = useState(ip?.servicesPage?.heading || "Services");
  const [servicesIntro,   setServicesIntro]   = useState(ip?.servicesPage?.introText || "");
  const [aboutHeading,    setAboutHeading]    = useState(ip?.aboutPage?.heading    || "About");
  const [ctaHeading,      setCtaHeading]      = useState(ip?.contactPage?.ctaHeading || "Let's Collaborate");
  const [ctaText,         setCtaText]         = useState(ip?.contactPage?.ctaText    || "");
  const [tagline, setTagline] = useState(ih?.tagline   || "");
  const [ctaLabel, setCtaLabel] = useState(ih?.ctaLabel || "View My Work");
  const [portraitUrl, setPortraitUrl] = useState(ih?.heroImageUrl || DEFAULT_PORTRAIT);
  const [introParagraphs, setIntroParagraphs] = useState(
    ip?.aboutPage?.bio ? ip.aboutPage.bio.split(/\n\n+/).filter(Boolean) : DEFAULT_BIO_PARAGRAPHS_HOME
  );
  const [stats, setStats] = useState(ih?.stats?.length ? ih.stats : DEFAULT_STATS);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [featuredWorks, setFeaturedWorks] = useState<FeaturedWork[]>(
    initialData?.featuredWorks?.length
      ? initialData.featuredWorks.map((w, i) => ({ id: i + 1, src: w.src ?? "", title: w.title ?? "", year: w.year ?? "" }))
      : []
  );
  const [services, setServices] = useState<ServiceItem[]>(
    initialData?.services?.length
      ? initialData.services.map((s, i) => ({
          icon: DEFAULT_SERVICES[i % DEFAULT_SERVICES.length].icon,
          title: s.name ?? "",
          description: s.description ?? "",
          image: s.src ?? "",
        }))
      : []
  );

  useEffect(() => {
    fetch("/api/home")
      .then((r) => r.json())
      .then((data: HomeData) => {
        const h = data?.home;
        if (h) {
          if (h.heading)      setHeading(h.heading);
          if (h.tagline)      setTagline(h.tagline);
          if (h.heroImageUrl) setPortraitUrl(h.heroImageUrl);
          if (h.ctaLabel)     setCtaLabel(h.ctaLabel);
          if (h.stats?.length) setStats(h.stats);
        }
        const p = data?.pages;
        if (p) {
          if (p.workPage?.heading)      setWorksHeading(p.workPage.heading);
          if (p.workPage?.introText)    setWorksIntro(p.workPage.introText);
          if (p.servicesPage?.heading)  setServicesHeading(p.servicesPage.heading);
          if (p.servicesPage?.introText) setServicesIntro(p.servicesPage.introText);
          if (p.aboutPage?.heading)     setAboutHeading(p.aboutPage.heading);
          if (p.aboutPage?.bio)         setIntroParagraphs(p.aboutPage.bio.split(/\n\n+/).filter(Boolean));
          if (p.contactPage?.ctaHeading) setCtaHeading(p.contactPage.ctaHeading);
          if (p.contactPage?.ctaText)   setCtaText(p.contactPage.ctaText);
        }
        if (data?.featuredWorks?.length) {
          setFeaturedWorks(
            data.featuredWorks.map((w, i) => ({
              id: i + 1,
              src: w.src ?? DEFAULT_FEATURED_WORKS[i % DEFAULT_FEATURED_WORKS.length].src,
              title: w.title ?? DEFAULT_FEATURED_WORKS[i % DEFAULT_FEATURED_WORKS.length].title,
              year: w.year ?? DEFAULT_FEATURED_WORKS[i % DEFAULT_FEATURED_WORKS.length].year,
            }))
          );
        }
        if (data?.services?.length) {
          setServices(
            data.services.map((s, i) => ({
              icon: DEFAULT_SERVICES[i % DEFAULT_SERVICES.length].icon,
              title: s.name ?? DEFAULT_SERVICES[i % DEFAULT_SERVICES.length].title,
              description: s.description ?? DEFAULT_SERVICES[i % DEFAULT_SERVICES.length].description,
              image: s.src ?? DEFAULT_SERVICES[i % DEFAULT_SERVICES.length].image,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen relative overflow-hidden group"
        style={{ zIndex: 45 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Real Zebra Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${ZEBRA_BG})` }}
          />

          {/* Portrait Image with Flowing Scarf Reveal */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${portraitUrl})`,
                backgroundPosition: "center center",
                maskImage: isHovering
                  ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, black 15%, transparent 40%)`
                  : "none",
                WebkitMaskImage: isHovering
                  ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, black 15%, transparent 40%)`
                  : "none",
              }}
            />

            {/* Dancing Scarf Layers */}
            {isHovering && (
              <>
                <motion.div
                  className="absolute inset-0 bg-cover bg-center pointer-events-none"
                  style={{
                    backgroundImage: `url(${portraitUrl})`,
                    backgroundPosition: "center center",
                  }}
                  animate={{
                    maskImage: [
                      `radial-gradient(ellipse 400px 600px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 40%)`,
                      `radial-gradient(ellipse 450px 550px at ${mousePosition.x + 30}px ${mousePosition.y - 20}px, black 0%, transparent 40%)`,
                      `radial-gradient(ellipse 380px 620px at ${mousePosition.x - 20}px ${mousePosition.y + 30}px, black 0%, transparent 40%)`,
                      `radial-gradient(ellipse 420px 580px at ${mousePosition.x + 15}px ${mousePosition.y - 15}px, black 0%, transparent 40%)`,
                      `radial-gradient(ellipse 400px 600px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 40%)`,
                    ],
                    WebkitMaskImage: [
                      `radial-gradient(ellipse 400px 600px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 40%)`,
                      `radial-gradient(ellipse 450px 550px at ${mousePosition.x + 30}px ${mousePosition.y - 20}px, black 0%, transparent 40%)`,
                      `radial-gradient(ellipse 380px 620px at ${mousePosition.x - 20}px ${mousePosition.y + 30}px, black 0%, transparent 40%)`,
                      `radial-gradient(ellipse 420px 580px at ${mousePosition.x + 15}px ${mousePosition.y - 15}px, black 0%, transparent 40%)`,
                      `radial-gradient(ellipse 400px 600px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 40%)`,
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                  className="absolute inset-0 bg-cover bg-center pointer-events-none"
                  style={{
                    backgroundImage: `url(${portraitUrl})`,
                    backgroundPosition: "center center",
                  }}
                  animate={{
                    maskImage: [
                      `radial-gradient(ellipse 500px 400px at ${mousePosition.x - 40}px ${mousePosition.y + 40}px, black 0%, transparent 35%)`,
                      `radial-gradient(ellipse 480px 420px at ${mousePosition.x - 20}px ${mousePosition.y + 60}px, black 0%, transparent 35%)`,
                      `radial-gradient(ellipse 520px 380px at ${mousePosition.x - 50}px ${mousePosition.y + 30}px, black 0%, transparent 35%)`,
                      `radial-gradient(ellipse 490px 410px at ${mousePosition.x - 35}px ${mousePosition.y + 50}px, black 0%, transparent 35%)`,
                      `radial-gradient(ellipse 500px 400px at ${mousePosition.x - 40}px ${mousePosition.y + 40}px, black 0%, transparent 35%)`,
                    ],
                    WebkitMaskImage: [
                      `radial-gradient(ellipse 500px 400px at ${mousePosition.x - 40}px ${mousePosition.y + 40}px, black 0%, transparent 35%)`,
                      `radial-gradient(ellipse 480px 420px at ${mousePosition.x - 20}px ${mousePosition.y + 60}px, black 0%, transparent 35%)`,
                      `radial-gradient(ellipse 520px 380px at ${mousePosition.x - 50}px ${mousePosition.y + 30}px, black 0%, transparent 35%)`,
                      `radial-gradient(ellipse 490px 410px at ${mousePosition.x - 35}px ${mousePosition.y + 50}px, black 0%, transparent 35%)`,
                      `radial-gradient(ellipse 500px 400px at ${mousePosition.x - 40}px ${mousePosition.y + 40}px, black 0%, transparent 35%)`,
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />

                <motion.div
                  className="absolute inset-0 bg-cover bg-center pointer-events-none"
                  style={{
                    backgroundImage: `url(${portraitUrl})`,
                    backgroundPosition: "center center",
                  }}
                  animate={{
                    maskImage: [
                      `radial-gradient(ellipse 350px 700px at ${mousePosition.x + 50}px ${mousePosition.y - 30}px, black 0%, transparent 30%)`,
                      `radial-gradient(ellipse 380px 670px at ${mousePosition.x + 60}px ${mousePosition.y - 50}px, black 0%, transparent 30%)`,
                      `radial-gradient(ellipse 340px 720px at ${mousePosition.x + 40}px ${mousePosition.y - 20}px, black 0%, transparent 30%)`,
                      `radial-gradient(ellipse 360px 690px at ${mousePosition.x + 55}px ${mousePosition.y - 40}px, black 0%, transparent 30%)`,
                      `radial-gradient(ellipse 350px 700px at ${mousePosition.x + 50}px ${mousePosition.y - 30}px, black 0%, transparent 30%)`,
                    ],
                    WebkitMaskImage: [
                      `radial-gradient(ellipse 350px 700px at ${mousePosition.x + 50}px ${mousePosition.y - 30}px, black 0%, transparent 30%)`,
                      `radial-gradient(ellipse 380px 670px at ${mousePosition.x + 60}px ${mousePosition.y - 50}px, black 0%, transparent 30%)`,
                      `radial-gradient(ellipse 340px 720px at ${mousePosition.x + 40}px ${mousePosition.y - 20}px, black 0%, transparent 30%)`,
                      `radial-gradient(ellipse 360px 690px at ${mousePosition.x + 55}px ${mousePosition.y - 40}px, black 0%, transparent 30%)`,
                      `radial-gradient(ellipse 350px 700px at ${mousePosition.x + 50}px ${mousePosition.y - 30}px, black 0%, transparent 30%)`,
                    ],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </>
            )}
          </div>

          <div className="absolute inset-0 bg-black/60" />

          {/* Red spotlight effects */}
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,0,0,0.4) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
            animate={{
              x: ["-20%", "120%"],
              y: ["20%", "80%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="text-center">
            {/* Animated Title - Letter by Letter */}
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="text-[8vw] md:text-[6vw] lg:text-[5vw] leading-none tracking-tighter text-white inline-block"
                  style={{ fontFamily: "var(--font-heading)" }}
                  initial={{ opacity: 0, y: 100, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.2,
                    color: "#ff0000",
                    textShadow: "0 0 30px rgba(255,0,0,0.8)",
                  }}
                >
                  {letter === " " ? " " : letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              className="text-xl md:text-2xl text-white/80 tracking-widest uppercase mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              {tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <a
                href="/work"
                className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 rounded-full text-white uppercase tracking-widest text-sm hover:bg-red-700 transition-all group hover:shadow-[0_0_30px_rgba(239,68,68,0.8),inset_0_0_20px_rgba(239,68,68,0.3)]"
              >
                {ctaLabel}
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
              </a>
            </motion.div>

            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-px h-16 bg-red-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <SectionDivider variant="black-to-white" style="wave" />

      {/* Featured Works Section */}
      <section id="work" className="bg-white py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1644432250799-69c6227880d4?w=1920&h=1080&fit=crop&auto=format)`,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-6xl md:text-8xl uppercase tracking-tighter text-black mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {worksHeading}
            </h2>
            <p className="text-xl text-black/60">{worksIntro}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredWorks.map((work, index) => (
              <FeaturedWorkCard key={work.id} work={work} index={index} />
            ))}
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="/work"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 rounded-full border-black text-black uppercase tracking-widest text-sm hover:bg-red-600 hover:border-red-600 hover:text-white transition-all group hover:shadow-[0_0_30px_rgba(239,68,68,0.8)]"
            >
              View All Projects
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <SectionDivider variant="white-to-black" style="wave" />

      {/* Services Preview Section */}
      <section id="services" className="bg-black text-white py-32 px-6 relative overflow-hidden">
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

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-6xl md:text-8xl uppercase tracking-tighter mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {servicesHeading}
            </h2>
            <p className="text-xl text-white/60">{servicesIntro}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="border-2 border-white/10 hover:border-red-500 transition-all duration-500 group relative overflow-hidden rounded-3xl hover:shadow-[0_0_30px_rgba(239,68,68,0.6),inset_0_0_20px_rgba(239,68,68,0.2)]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Service Image */}
                <div className="relative h-64 overflow-hidden rounded-t-3xl">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8 relative">
                  <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-2xl uppercase tracking-wider mb-2 group-hover:text-red-500 transition-all relative group-hover:[text-shadow:0_0_20px_rgba(239,68,68,0.8)]">
                    {service.title}
                  </h3>
                  <p className="text-white/60 relative">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="/services"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 rounded-full border-white text-white uppercase tracking-widest text-sm hover:bg-red-600 hover:border-red-600 transition-all group hover:shadow-[0_0_30px_rgba(239,68,68,0.8)]"
            >
              All Services
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <SectionDivider variant="black-to-white" style="wave" />

      {/* About Section */}
      <section id="about" className="bg-white py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-6xl md:text-8xl uppercase tracking-tighter text-black mb-12"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {aboutHeading}
          </motion.h2>

          <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-black/80 mb-20">
            {introParagraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.2, duration: 0.8 }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <motion.div
                  className="text-8xl mb-4 text-black"
                  style={{ fontFamily: "var(--font-heading)" }}
                  whileHover={{
                    scale: 1.1,
                    color: "#ff0000",
                    textShadow: "0 0 30px rgba(255,0,0,0.3)",
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm uppercase tracking-widest text-black/60 font-mono">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <SectionDivider variant="white-to-black" style="wave" />

      {/* Contact CTA Section */}
      <section id="contact" className="bg-black text-white py-32 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1579828921452-bf8cbbd6168d?w=1920&h=1080&fit=crop&auto=format)`,
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-6xl md:text-8xl uppercase tracking-tighter mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {ctaHeading}
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-white/60 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {ctaText}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-12 py-6 bg-red-600 rounded-full text-white uppercase tracking-widest text-sm hover:bg-red-700 transition-all group hover:shadow-[0_0_40px_rgba(239,68,68,0.9),inset_0_0_30px_rgba(239,68,68,0.4)]"
            >
              Get in Touch
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function FeaturedWorkCard({
  work,
  index,
}: {
  work: { id: number; src: string; title: string; year: string };
  index: number;
}) {
  return (
    <motion.div
      className="group relative overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.8 }}
      whileHover={{ scale: 1.05 }}
    >
      <a href="/work">
        <div className="relative">
          <img
            src={work.src}
            alt={work.title}
            className="w-full h-[500px] object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-black/50 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 rounded-3xl">
            <div>
              <h3 className="text-2xl uppercase tracking-wider text-white mb-1">
                {work.title}
              </h3>
              <p className="text-red-500 font-mono">{work.year}</p>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
