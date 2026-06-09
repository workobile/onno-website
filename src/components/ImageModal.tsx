"use client";
import { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ImageModalProps {
  image: {
    src: string;
    title: string;
    year: string;
    category: string;
  };
  onClose: () => void;
}

export function ImageModal({ image, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black z-50 flex items-center justify-center p-6"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Red spotlight effect */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,0,0,0.2) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: ["-30%", "130%"],
            y: ["20%", "80%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        <motion.button
          onClick={onClose}
          className="absolute top-8 right-8 text-white hover:text-red-500 transition-all z-50 hover:[filter:drop-shadow(0_0_20px_rgba(239,68,68,0.8))]"
          aria-label="Close modal"
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={48} strokeWidth={1} />
        </motion.button>

        <motion.div
          className="max-w-6xl max-h-[90vh] relative"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <motion.img
            src={image.src}
            alt={image.title}
            className="max-w-full max-h-[80vh] object-contain"
            initial={{ filter: "blur(20px)" }}
            animate={{ filter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="mt-8 text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-4xl uppercase tracking-wider mb-2">
              {image.title}
            </h2>
            <p className="text-xl tracking-widest font-mono text-red-400 [text-shadow:0_0_15px_rgba(239,68,68,0.8)]">
              {image.year} · {image.category.replace("-", " ").toUpperCase()}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
