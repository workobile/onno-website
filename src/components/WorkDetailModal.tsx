"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { PortfolioItem } from "@/components/Work";

interface WorkDetailModalProps {
  item: PortfolioItem;
  onClose: () => void;
}

export function WorkDetailModal({ item, onClose }: WorkDetailModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80"
          onClick={onClose}
        />

        {/* Panel */}
        <motion.div
          className="relative ml-auto w-full max-w-3xl h-full bg-white overflow-y-auto overflow-x-hidden flex flex-col rounded-l-3xl"
          style={{ maxWidth: "min(48rem, 100vw)" }}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 text-red-500 hover:text-red-400 transition-colors"
            aria-label="Close"
          >
            <X size={28} strokeWidth={1.5} />
          </button>

          {/* Hero image */}
          <div className="w-full aspect-[16/9] bg-black overflow-hidden shrink-0">
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-6 md:p-10">
            {/* Category + year */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[11px] uppercase tracking-widest font-mono text-white bg-black px-3 py-1">
                {item.category.replace("-", " ")}
              </span>
              <span className="text-sm font-mono text-black/40">{item.year}</span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl uppercase tracking-tight text-black mb-4 leading-none">
              {item.title}
            </h2>

            {/* Long description */}
            {item.longDescription && (
              <p className="text-base text-black/70 leading-relaxed mb-10 max-w-prose">
                {item.longDescription}
              </p>
            )}

            {/* Metadata — divider + grid only shown when at least one field exists */}
            {(item.client || item.location || item.medium || item.dimensions || item.collaborators) && (
              <>
                <div className="border-t border-black mb-8" />
                <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
                  {item.client && (
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest font-mono text-black/40 mb-1">Client</dt>
                      <dd className="text-sm font-mono text-black">{item.client}</dd>
                    </div>
                  )}
                  {item.location && (
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest font-mono text-black/40 mb-1">Location</dt>
                      <dd className="text-sm font-mono text-black">{item.location}</dd>
                    </div>
                  )}
                  {item.medium && (
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest font-mono text-black/40 mb-1">Medium</dt>
                      <dd className="text-sm font-mono text-black">{item.medium}</dd>
                    </div>
                  )}
                  {item.dimensions && (
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest font-mono text-black/40 mb-1">Scale / Dimensions</dt>
                      <dd className="text-sm font-mono text-black">{item.dimensions}</dd>
                    </div>
                  )}
                  {item.collaborators && (
                    <div className="col-span-2">
                      <dt className="text-[10px] uppercase tracking-widest font-mono text-black/40 mb-1">Collaborators</dt>
                      <dd className="text-sm font-mono text-black">{item.collaborators}</dd>
                    </div>
                  )}
                </dl>
              </>
            )}
          </div>

          {/* Footer stripe */}
          <div className="bg-black px-10 py-5 shrink-0">
            <p className="text-xs font-mono text-white/30 uppercase tracking-widest">
              {item.title} · {item.year}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
