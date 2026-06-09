"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { ImageModal } from "@/components/ImageModal";

interface PortfolioItem {
  id: number;
  src: string;
  title: string;
  category: string;
  year: string;
}

interface PortfolioGridProps {
  items: PortfolioItem[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function PortfolioGrid({
  items,
  activeFilter,
  onFilterChange,
}: PortfolioGridProps) {
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);

  const filters = [
    { id: "all", label: "All Work" },
    { id: "models", label: "Models" },
    { id: "set-design", label: "Set Design" },
    { id: "lighting", label: "Lighting" },
  ];

  return (
    <section className="bg-white text-black py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`px-8 py-4 text-lg uppercase tracking-wider transition-all border-2 relative overflow-hidden ${
                activeFilter === filter.id
                  ? "bg-red-600 text-white border-red-600 shadow-[0_0_30px_rgba(239,68,68,0.8),inset_0_0_20px_rgba(239,68,68,0.3)]"
                  : "bg-transparent border-black hover:border-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeFilter === filter.id && (
                <motion.div
                  className="absolute inset-0 bg-red-600"
                  layoutId="activeFilter"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{filter.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter="24px">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="group cursor-pointer relative overflow-hidden bg-black"
                    onClick={() => setSelectedImage(item)}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-auto block transition-all duration-700 group-hover:scale-110"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-start p-6"
                      initial={false}
                    >
                      <div className="text-white">
                        <motion.h3
                          className="text-2xl uppercase tracking-wider mb-2"
                          initial={{ x: -20, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {item.title}
                        </motion.h3>
                        <motion.p
                          className="text-sm tracking-widest font-mono text-red-400 [text-shadow:0_0_15px_rgba(239,68,68,0.8)]"
                          initial={{ x: -20, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {item.year}
                        </motion.p>
                      </div>
                    </motion.div>

                    {/* Red light effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
                      <div
                        className="absolute top-0 right-0 w-32 h-32 rounded-full"
                        style={{
                          background: "radial-gradient(circle, rgba(255,0,0,0.8) 0%, transparent 70%)",
                          filter: "blur(40px)",
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </motion.div>
        </AnimatePresence>
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
}
