"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiProps {
  trigger: boolean;
}

const COLORS = ["#4f46e5", "#059669", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4"];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Confetti({ trigger }: ConfettiProps) {
  const [particles, setParticles] = useState<
    { id: number; x: number; color: string; delay: number; size: number }[]
  >([]);

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: randomBetween(-150, 150),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: randomBetween(0, 0.3),
        size: randomBetween(4, 8),
      }));
      setParticles(newParticles);
      const timer = setTimeout(() => setParticles([]), 1500);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <AnimatePresence>
      {particles.length > 0 && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                opacity: 1,
                x: "50vw",
                y: "50vh",
                scale: 0,
              }}
              animate={{
                opacity: [1, 1, 0],
                x: `calc(50vw + ${p.x}px)`,
                y: `calc(50vh - ${randomBetween(100, 300)}px)`,
                scale: [0, 1.5, 1],
                rotate: randomBetween(0, 720),
              }}
              transition={{
                duration: 1.2,
                delay: p.delay,
                ease: "easeOut",
              }}
              style={{
                position: "absolute",
                width: p.size,
                height: p.size,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                backgroundColor: p.color,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
