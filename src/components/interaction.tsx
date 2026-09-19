"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!seen || reduced !== false || !ref.current) return;
    const animation = animate(
      ref.current,
      { opacity: [0, 1], y: [24, 0], filter: ["blur(6px)", "blur(0px)"] },
      { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    );
    return () => {
      animation.complete();
    };
  }, [seen, reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function GlassSurface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const reduced = useReducedMotion();
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (
      reduced !== false ||
      event.pointerType !== "mouse" ||
      !matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    const { left, top } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      ref.current?.style.setProperty("--mouse-x", `${x}px`);
      ref.current?.style.setProperty("--mouse-y", `${y}px`);
    });
  }

  return (
    <div
      ref={ref}
      className={`glass-surface ${className}`}
      onPointerMove={move}
    >
      {children}
    </div>
  );
}
