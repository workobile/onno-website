"use client";
import { motion } from "motion/react";
import { ZebraBackground } from "@/components/ZebraBackground";

export function Hero() {
  return (
    <section className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <ZebraBackground />

      {/* Red spotlight effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,0,0,0.3) 0%, transparent 70%)",
            filter: "blur(60px)",
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
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,0,0,0.2) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: ["100%", "-20%"],
            y: ["60%", "10%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.h1
          className="text-[12vw] md:text-[10vw] leading-none tracking-tighter uppercase mb-6 text-white"
          style={{ fontFamily: "var(--font-heading)" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.span
            className="inline-block"
            animate={{
              textShadow: [
                "0 0 20px rgba(255,0,0,0.5)",
                "0 0 40px rgba(255,0,0,0.8)",
                "0 0 20px rgba(255,0,0,0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Stage
          </motion.span>
          <br />
          <motion.span
            className="inline-block"
            animate={{
              textShadow: [
                "0 0 40px rgba(255,0,0,0.8)",
                "0 0 20px rgba(255,0,0,0.5)",
                "0 0 40px rgba(255,0,0,0.8)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            Designer
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl tracking-widest uppercase text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Theatrical Models &amp; Set Design
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-12 left-0 right-0 text-center"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="inline-block w-px h-16 bg-red-500" />
      </motion.div>
    </section>
  );
}
