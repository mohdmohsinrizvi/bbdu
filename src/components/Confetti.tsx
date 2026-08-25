"use client";

import { useEffect, useRef } from "react";

interface ConfettiProps {
  trigger: boolean;
}

const COLORS = ["#4338ca", "#059669", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4"];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Confetti({ trigger }: ConfettiProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger || !containerRef.current) return;

    const container = containerRef.current;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < 24; i++) {
      const el = document.createElement("div");
      el.className = "confetti-particle";
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size = randomBetween(4, 7);
      const x = randomBetween(-120, 120);
      const y = randomBetween(-180, -80);
      const delay = randomBetween(0, 0.2);
      const rotation = randomBetween(0, 720);
      const isCircle = Math.random() > 0.5;

      Object.assign(el.style, {
        left: "50%",
        top: "50%",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: isCircle ? "50%" : "2px",
        backgroundColor: color,
        animationDelay: `${delay}s`,
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
      });

      container.appendChild(el);
      particles.push(el);
    }

    const timer = setTimeout(() => {
      particles.forEach((p) => p.remove());
    }, 1500);

    return () => {
      clearTimeout(timer);
      particles.forEach((p) => p.remove());
    };
  }, [trigger]);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-50 overflow-hidden" />;
}
