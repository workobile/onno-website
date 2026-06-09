"use client";
import { motion } from "motion/react";

interface SectionDividerProps {
  variant?: "white-to-black" | "black-to-white";
  style?: "wave" | "curve" | "zigzag";
}

export function SectionDivider({
  variant = "white-to-black",
  style = "wave",
}: SectionDividerProps) {
  const isWhiteToBlack = variant === "white-to-black";

  if (style === "wave") {
    return (
      <div className="relative w-full h-40 overflow-hidden -mt-1">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0,80 C360,140 720,20 1080,80 C1260,110 1350,50 1440,80 L1440,160 L0,160 Z"
            fill={isWhiteToBlack ? "#000000" : "#ffffff"}
            initial={{ d: "M0,80 C360,140 720,20 1080,80 C1260,110 1350,50 1440,80 L1440,160 L0,160 Z" }}
            animate={{
              d: [
                "M0,80 C360,140 720,20 1080,80 C1260,110 1350,50 1440,80 L1440,160 L0,160 Z",
                "M0,70 C360,20 720,140 1080,70 C1260,50 1350,110 1440,70 L1440,160 L0,160 Z",
                "M0,80 C360,140 720,20 1080,80 C1260,110 1350,50 1440,80 L1440,160 L0,160 Z",
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
        <div
          className="absolute inset-0"
          style={{ background: isWhiteToBlack ? "#ffffff" : "#000000" }}
        />
      </div>
    );
  }

  if (style === "curve") {
    return (
      <div className="relative w-full h-32 overflow-hidden -mt-1">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0,0 Q720,120 1440,0 L1440,120 L0,120 Z"
            fill={isWhiteToBlack ? "#000000" : "#ffffff"}
            initial={{ d: "M0,0 Q720,120 1440,0 L1440,120 L0,120 Z" }}
            animate={{
              d: [
                "M0,0 Q720,120 1440,0 L1440,120 L0,120 Z",
                "M0,20 Q720,100 1440,20 L1440,120 L0,120 Z",
                "M0,0 Q720,120 1440,0 L1440,120 L0,120 Z",
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
        <div
          className="absolute inset-0"
          style={{ background: isWhiteToBlack ? "#ffffff" : "#000000" }}
        />
      </div>
    );
  }

  // Zigzag style
  return (
    <div className="relative w-full h-32 overflow-hidden -mt-1">
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0,60 L240,20 L480,60 L720,20 L960,60 L1200,20 L1440,60 L1440,120 L0,120 Z"
          fill={isWhiteToBlack ? "#000000" : "#ffffff"}
          initial={{ d: "M0,60 L240,20 L480,60 L720,20 L960,60 L1200,20 L1440,60 L1440,120 L0,120 Z" }}
          animate={{
            d: [
              "M0,60 L240,20 L480,60 L720,20 L960,60 L1200,20 L1440,60 L1440,120 L0,120 Z",
              "M0,50 L240,30 L480,50 L720,30 L960,50 L1200,30 L1440,50 L1440,120 L0,120 Z",
              "M0,60 L240,20 L480,60 L720,20 L960,60 L1200,20 L1440,60 L1440,120 L0,120 Z",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
      <div
        className="absolute inset-0"
        style={{ background: isWhiteToBlack ? "#ffffff" : "#000000" }}
      />
    </div>
  );
}
