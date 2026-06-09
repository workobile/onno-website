"use client";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { WorkDetailModal } from "@/components/WorkDetailModal";

export interface PortfolioItem {
  id: number;
  src: string;
  title: string;
  category: string;
  year: string;
  description: string;
  client: string;
  location: string;
  medium: string;
  collaborators: string;
  dimensions?: string;
  longDescription: string;
}

const DEFAULT_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=1600&fit=crop&auto=format",
    title: "Stage Design Collection",
    category: "models",
    year: "2024",
    description: "Comprehensive collection of theatrical stage designs",
    client: "National Theatre",
    location: "London, UK",
    medium: "Scale model, mixed materials",
    collaborators: "Dir. Sarah Chen · LD Marcus Webb",
    dimensions: "1:25 scale",
    longDescription:
      "A comprehensive survey of theatrical stage architectures spanning classical proscenium to thrust configurations. Each model explores spatial relationships between performer and audience, using raw card, wire, and resin to communicate depth, weight, and light.",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=1600&fit=crop&auto=format",
    title: "Opera Set Model",
    category: "models",
    year: "2024",
    description: "Detailed architectural model for grand opera production",
    client: "Royal Opera House",
    location: "London, UK",
    medium: "Basswood, acrylic, brass",
    collaborators: "Dir. Emil Kowalski · Costume: Ana Reyes",
    dimensions: "1:50 scale",
    longDescription:
      "Monumental Baroque-inspired architecture rendered at 1:50 scale for a new production of Verdi's Aida. The model communicates the interplay of grand columns, raked platforms and a hydraulic lift system that raises the triumphal procession from below stage.",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=1200&h=800&fit=crop&auto=format",
    title: "Theater Lighting Design",
    category: "lighting",
    year: "2023",
    description: "Dynamic lighting scheme for contemporary theater",
    client: "Young Vic",
    location: "London, UK",
    medium: "LED, tungsten, haze",
    collaborators: "Dir. Fatima Hassan · Set: Oliver Grant",
    longDescription:
      "A sculpted lighting environment built around sharp diagonal shafts cutting through atmospheric haze. The design uses 240 moving lights and a custom cue structure that responds to live audio, making each performance subtly unique.",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1000&h=1400&fit=crop&auto=format",
    title: "Contemporary Stage Set",
    category: "set-design",
    year: "2024",
    description: "Minimalist set design for modern drama",
    client: "Barbican Theatre",
    location: "London, UK",
    medium: "Steel, glass, reclaimed timber",
    collaborators: "Dir. James Okafor · LD: Priya Nair",
    longDescription:
      "A stripped-back environment of exposed steel rigging and suspended glass panels that fracture light across the stage. The set collapses and reconfigures between acts, the mechanics deliberately visible to the audience.",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200&h=1200&fit=crop&auto=format",
    title: "Architectural Model",
    category: "models",
    year: "2023",
    description: "Precision architectural model for installation piece",
    client: "Serpentine Gallery",
    location: "London, UK",
    medium: "3D-printed resin, mirror film",
    collaborators: "Artist: Helena Voss",
    dimensions: "1:20 scale",
    longDescription:
      "Study model for a temporary pavilion commissioned by the Serpentine Gallery. The reflective interior surfaces create infinite recursion as visitors move through the space, collapsing interior and exterior.",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&h=900&fit=crop&auto=format",
    title: "Stage Performance",
    category: "set-design",
    year: "2024",
    description: "Multi-level stage design for ensemble performance",
    client: "Edinburgh International Festival",
    location: "Edinburgh, UK",
    medium: "Scaffold, timber, projection surface",
    collaborators: "Dir. Niamh O'Brien · Choreographer: Daniel Park",
    longDescription:
      "A scaffolded four-level structure transforms the historic Assembly Hall into a vertical performance space. Twenty-two performers inhabit separate floors simultaneously while a 360° projection maps architectural drawings onto the structure in real time.",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1000&h=1500&fit=crop&auto=format",
    title: "Concert Lighting",
    category: "lighting",
    year: "2023",
    description: "Dramatic lighting design for live concert",
    client: "Radiohead / XL Recordings",
    location: "O2 Arena, London",
    medium: "Beam movers, strobe, laser",
    collaborators: "Production designer: Tom Kirk",
    longDescription:
      "A 700-fixture touring rig designed to scale from 2,000-seat theatres to 20,000-capacity arenas. The design uses a single overhead chandelier of 240 beam movers that form evolving three-dimensional sculptures above the audience.",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&h=1800&fit=crop&auto=format",
    title: "Installation Model",
    category: "models",
    year: "2024",
    description: "Site-specific installation model",
    client: "Tate Modern",
    location: "London, UK",
    medium: "Card, monofilament, resin",
    collaborators: "Artist: Kiri Tanaka",
    dimensions: "1:15 scale",
    longDescription:
      "Preparatory model for a Turbine Hall commission. The installation suspends 4,000 hand-cast resin forms on monofilament at varying heights, creating a dense cloud that visitors walk beneath. The model tests sightlines, density, and shadow patterns.",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=900&fit=crop&auto=format",
    title: "Experimental Theater Space",
    category: "set-design",
    year: "2023",
    description: "Immersive environment design for avant-garde theater",
    client: "Battersea Arts Centre",
    location: "London, UK",
    medium: "Found objects, foam, paint",
    collaborators: "Dir. Collective: Forge Theatre",
    longDescription:
      "An immersive promenade environment built from salvaged architectural fragments. The audience follows performers through seventeen rooms, each with its own distinct material world.",
  },
];

// categories are derived dynamically from loaded projects — see filtered logic below

function WorkCard({
  item,
  index,
  onClick,
}: {
  item: PortfolioItem;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.article
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.10)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.18)] transition-shadow duration-300"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.5 }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-black aspect-[4/3]">
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Category badge */}
        <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs uppercase tracking-widest font-mono px-3 py-1 rounded-full">
          {item.category.replace("-", " ")}
        </span>
      </div>

      {/* Detail block */}
      <div className="p-6">
        {/* Title row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 className="text-xl uppercase tracking-tight text-black leading-tight group-hover:text-red-500 transition-colors duration-200">
            {item.title}
          </h2>
          <span className="shrink-0 font-mono text-sm text-black/40 mt-0.5">{item.year}</span>
        </div>

        {/* Short description */}
        {item.description && (
          <p className="text-sm text-black/60 leading-relaxed mb-5">{item.description}</p>
        )}

        {/* Metadata grid — only rendered if at least one field has a value */}
        {(item.client || item.location || item.medium || item.dimensions) && (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-black/8 pt-4">
            {item.client && (
              <div>
                <dt className="text-[10px] uppercase tracking-widest font-mono text-black/40 mb-0.5">Client</dt>
                <dd className="text-xs text-black font-mono">{item.client}</dd>
              </div>
            )}
            {item.location && (
              <div>
                <dt className="text-[10px] uppercase tracking-widest font-mono text-black/40 mb-0.5">Location</dt>
                <dd className="text-xs text-black font-mono">{item.location}</dd>
              </div>
            )}
            {item.medium && (
              <div>
                <dt className="text-[10px] uppercase tracking-widest font-mono text-black/40 mb-0.5">Medium</dt>
                <dd className="text-xs text-black font-mono">{item.medium}</dd>
              </div>
            )}
            {item.dimensions && (
              <div>
                <dt className="text-[10px] uppercase tracking-widest font-mono text-black/40 mb-0.5">Scale</dt>
                <dd className="text-xs text-black font-mono">{item.dimensions}</dd>
              </div>
            )}
          </dl>
        )}

        {/* Collaborators */}
        {item.collaborators && (
          <p className="mt-3 text-[11px] font-mono text-black/40 border-t border-black/8 pt-3">
            {item.collaborators}
          </p>
        )}

        {/* Read more */}
        <div className="mt-4 text-xs uppercase tracking-widest text-red-500 font-mono flex items-center gap-2">
          View project
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </motion.article>
  );
}

export function Work() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [pageHeading, setPageHeading] = useState("Work");
  const [introText, setIntroText] = useState("Theatrical models, set designs, and lighting installations — a record of collaborative practice across stage, opera, and live art.");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(DEFAULT_PORTFOLIO_ITEMS);

  useEffect(() => {
    fetch("/api/work")
      .then((r) => r.json())
      .then((data: { page?: { heading?: string; introText?: string }; projects?: PortfolioItem[] }) => {
        if (data?.page?.heading)    setPageHeading(data.page.heading);
        if (data?.page?.introText)  setIntroText(data.page.introText);
        if (data?.projects?.length) {
          setPortfolioItems(
            data.projects.map((p, i) => ({
              ...DEFAULT_PORTFOLIO_ITEMS[i % DEFAULT_PORTFOLIO_ITEMS.length],
              ...p,
              id: i + 1,
              src: (p as { src?: string }).src ?? DEFAULT_PORTFOLIO_ITEMS[i % DEFAULT_PORTFOLIO_ITEMS.length].src,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const categories = ["all", ...Array.from(new Set(portfolioItems.map((i) => i.category).filter(Boolean)))];

  const filtered =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((i) => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-white pt-24 overflow-x-hidden">
      {/* Header stripe — black, curved bottom */}
      <div className="bg-black px-6 py-16 rounded-b-[2.5rem]">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-7xl md:text-9xl uppercase tracking-tighter text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {pageHeading}
          </motion.h1>
          <motion.p
            className="text-base text-white/50 max-w-xl font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {introText}
          </motion.p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white sticky top-14 z-10 px-6 py-3 border-b border-black/10">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-5 py-2 text-xs uppercase tracking-widest font-mono rounded-full transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-black text-white shadow-sm"
                  : "bg-black/5 text-black hover:bg-black/10"
              }`}
            >
              {cat.replace("-", " ")}
            </button>
          ))}
          <span className="ml-auto shrink-0 px-3 text-xs font-mono text-black/30 whitespace-nowrap">
            {filtered.length} projects
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, index) => (
            <WorkCard key={item.id} item={item} index={index} onClick={() => setSelectedItem(item)} />
          ))}
        </div>
      </div>

      {selectedItem && (
        <WorkDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
