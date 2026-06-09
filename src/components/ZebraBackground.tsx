"use client";
import { motion } from "motion/react";

export function ZebraBackground() {
  const stripes = Array.from({ length: 30 });

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <svg
        className="w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
      >
        <defs>
          <pattern
            id="zebraPattern"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            {stripes.map((_, i) => {
              const y = (i * 200) / 30;
              const height = Math.random() * 15 + 5;
              const curve = Math.sin(i * 0.5) * 30;

              return (
                <motion.path
                  key={i}
                  d={`M ${curve},${y} Q ${50 + curve},${y + height / 2} ${100 + curve},${y} T ${200 + curve},${y} V ${y + height} Q ${150 + curve},${y + height / 2} ${100 + curve},${y + height} T ${curve},${y + height} Z`}
                  fill="white"
                  animate={{
                    d: [
                      `M ${curve},${y} Q ${50 + curve},${y + height / 2} ${100 + curve},${y} T ${200 + curve},${y} V ${y + height} Q ${150 + curve},${y + height / 2} ${100 + curve},${y + height} T ${curve},${y + height} Z`,
                      `M ${curve + 10},${y} Q ${50 + curve - 10},${y + height / 2} ${100 + curve + 10},${y} T ${200 + curve - 10},${y} V ${y + height} Q ${150 + curve + 10},${y + height / 2} ${100 + curve - 10},${y + height} T ${curve + 10},${y + height} Z`,
                      `M ${curve},${y} Q ${50 + curve},${y + height / 2} ${100 + curve},${y} T ${200 + curve},${y} V ${y + height} Q ${150 + curve},${y + height / 2} ${100 + curve},${y + height} T ${curve},${y + height} Z`,
                    ],
                  }}
                  transition={{
                    duration: 8 + Math.random() * 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              );
            })}
          </pattern>
        </defs>
        <motion.rect
          width="1000"
          height="1000"
          fill="url(#zebraPattern)"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}
