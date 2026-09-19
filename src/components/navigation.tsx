"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "community", label: "Community" },
  { id: "contact", label: "Contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const button = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    const ids = [
      "work",
      "automation",
      "engineering",
      "creative",
      "community",
      "hardware",
      "about",
      "interests",
      "skills",
      "contact",
    ];
    let frame = 0;
    const update = () => {
      let current = "";
      for (const id of ids) {
        const element = document.getElementById(id);
        if (
          element &&
          element.getBoundingClientRect().top <= window.innerHeight * 0.4
        )
          current = id;
      }
      setActive(
        ["automation", "engineering", "creative"].includes(current)
          ? "work"
          : ["interests", "skills"].includes(current)
            ? "about"
            : current === "hardware"
              ? "community"
              : current,
      );
    };
    const scroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const outside = (event: globalThis.PointerEvent) => {
      if (!nav.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = matchMedia("(min-width: 701px)");
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", resize);
    };
  }, [open]);

  return (
    <nav
      ref={nav}
      className={`navigation ${open ? "is-open" : ""}`}
      aria-label="Main navigation"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <Link
        href="/"
        className="wordmark"
        onClick={() => setOpen(false)}
        aria-label="Sajag Makhija, home"
      >
        SAJAG<span className="wordmark-dot">.</span>
      </Link>
      <button
        ref={button}
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="navigation-links"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <div id="navigation-links" className="navigation-links">
        {links.map(({ id, label }) => (
          <Link
            key={id}
            href={`/#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
