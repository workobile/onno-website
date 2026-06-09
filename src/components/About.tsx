"use client";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Award, Globe, Briefcase } from "lucide-react";

const ZEBRA_BG =
  "https://images.unsplash.com/photo-1579828921452-bf8cbbd6168d?w=1920&h=1080&fit=crop&auto=format";

interface ExperienceItem {
  year: string;
  title: string;
  company: string;
  location: string;
}

const DEFAULT_BIO_PARAGRAPHS = [
  "A stage designer specializing in theatrical models, set design, and lighting for contemporary performance spaces. With a focus on bold visual storytelling and innovative spatial compositions.",
  "Each project combines architectural precision with artistic vision, creating immersive environments that serve the narrative and enhance the audience experience. From intimate black box theaters to grand opera houses, the work spans diverse scales and genres.",
  "The design process begins with deep collaboration with directors, choreographers, and performers, translating abstract concepts into tangible spatial experiences that amplify the emotional resonance of live performance.",
];

const DEFAULT_EXPERIENCE: ExperienceItem[] = [
  {
    year: "2020 - Present",
    title: "Principal Designer",
    company: "National Theater Collective",
    location: "London, UK",
  },
  {
    year: "2018 - 2020",
    title: "Set Designer",
    company: "Metropolitan Opera House",
    location: "New York, US",
  },
  {
    year: "2015 - 2018",
    title: "MFA in Scenic Design",
    company: "Yale School of Drama",
    location: "New Haven, US",
  },
];

interface AboutData {
  heading?: string;
  bio?: string;
  portraitUrl?: string;
  experience?: ExperienceItem[];
  stats?: { number: string; label: string }[];
  skills?: string[];
}

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [heading, setHeading] = useState("About");
  const [skills, setSkills] = useState<string[]>([]);
  const [bioParagraphs, setBioParagraphs] = useState<string[]>(DEFAULT_BIO_PARAGRAPHS);
  const [portraitUrl, setPortraitUrl] = useState<string | null>(null);
  const [experience, setExperience] = useState<ExperienceItem[]>(DEFAULT_EXPERIENCE);
  const [stats, setStats] = useState([
    { icon: Briefcase, number: "15+", label: "Productions" },
    { icon: Globe,     number: "8",   label: "Countries" },
    { icon: Award,     number: "3",   label: "Awards" },
  ]);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((data: AboutData) => {
        if (data?.heading)    setHeading(data.heading);
        if (data?.bio)        setBioParagraphs(data.bio.split(/\n\n+/).filter(Boolean));
        if (data?.portraitUrl) setPortraitUrl(data.portraitUrl);
        if (data?.experience?.length) setExperience(data.experience);
        if (data?.skills?.length)  setSkills(data.skills);
        if (data?.stats?.length) {
          const icons = [Briefcase, Globe, Award];
          setStats(data.stats.map((s, i) => ({ icon: icons[i % icons.length], number: s.number, label: s.label })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-white pt-24 relative overflow-hidden">
      {/* Zebra Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ZEBRA_BG})` }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10" ref={ref}>
        {/* Header */}
        <motion.h1
          className="text-7xl md:text-9xl uppercase tracking-tighter text-black mb-12"
          style={{ fontFamily: "var(--font-heading)" }}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {heading}
        </motion.h1>

        {/* Portrait */}
        {portraitUrl && (
          <motion.div
            className="mb-16 overflow-hidden rounded-3xl max-w-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img src={portraitUrl} alt={heading} className="w-full h-auto object-cover" />
          </motion.div>
        )}

        {/* Story */}
        <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-black/80 mb-20">
          {bioParagraphs.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.2, duration: 0.8 }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
            >
              <stat.icon
                className="w-12 h-12 mx-auto mb-4 text-black group-hover:text-red-500 transition-all group-hover:[filter:drop-shadow(0_0_20px_rgba(239,68,68,0.8))]"
                strokeWidth={1}
              />
              <motion.div
                className="text-7xl mb-4 text-black group-hover:text-red-500 transition-all"
                style={{ fontFamily: "var(--font-heading)" }}
                whileHover={{
                  scale: 1.1,
                  textShadow: "0 0 30px rgba(239,68,68,0.8)",
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

        {/* Experience */}
        <motion.div
          className="border-t-2 border-black/10 pt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <h2
            className="text-4xl uppercase tracking-wider mb-8 text-black"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Experience
          </h2>
          <div className="space-y-6 text-black/70">
            {experience.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-start pl-6 ${
                  index === 0
                    ? "border-l-2 border-red-500 shadow-[-4px_0_20px_rgba(239,68,68,0.3)]"
                    : "border-l-2 border-black/20"
                }`}
              >
                <div>
                  <h3 className="text-xl uppercase tracking-wider text-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-mono">{item.company}</p>
                </div>
                <span className="text-sm font-mono">{item.year}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        {skills.length > 0 && (
          <motion.div
            className="border-t-2 border-black/10 pt-16 mt-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <h2
              className="text-4xl uppercase tracking-wider mb-8 text-black"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-5 py-2 border border-black/20 rounded-full text-xs uppercase tracking-widest font-mono text-black/70 hover:border-red-500 hover:text-red-500 transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
