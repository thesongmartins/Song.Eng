"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

import { cn } from "@/lib/utils";

interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface VelocityScrollLogosProps {
  logos: Logo[];
  baseVelocity?: number;
  className?: string;
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function VelocityScrollLogos({
  logos,
  baseVelocity = 5,
  className,
}: VelocityScrollLogosProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [repetitions, setRepetitions] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateRepetitions = () => {
      if (containerRef.current && logosRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const logosWidth = logosRef.current.offsetWidth;
        const newRepetitions = Math.ceil(containerWidth / logosWidth) + 1;
        setRepetitions(newRepetitions);
      }
    };

    calculateRepetitions();

    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, []);

  const x = useTransform(baseX, (v) => `${wrap(-100, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className="w-full overflow-hidden whitespace-nowrap"
      ref={containerRef}
    >
      <motion.div className={cn("inline-block", className)} style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <div
            key={i}
            className="inline-flex items-center"
            ref={i === 0 ? logosRef : null}
          >
            {logos.map((logo, index) => {
              // Apply different styling based on logo for theme compatibility
              const getLogoClass = (src: string) => {
                const baseClass = "max-h-12 w-auto";
                if (src === "/image.png") {
                  // Ubuntu Portal - ensure visibility in both modes
                  return `${baseClass} brightness-50 contrast-150 dark:brightness-100 dark:invert-0`;
                } else if (src === "/parcellogo.png") {
                  // Parcel - needs no filters in dark mode
                  return `${baseClass} dark:brightness-100 dark:invert-0`;
                } else {
                  // Default styling for other logos
                  return `${baseClass} dark:brightness-0 dark:invert dark:contrast-100`;
                }
              };

              return (
                <div key={index} className="mx-8">
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className={getLogoClass(logo.src)}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
