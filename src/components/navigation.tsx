"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import { usePathname } from "next/navigation";
import { socials } from "@/data/socials";
const links = [
  { href: "/", label: "Index" },
  { href: "/work/", label: "Work" },
  { href: "/lab/", label: "Lab" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
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
      <a
        href="/"
        className="wordmark"
        onClick={() => setOpen(false)}
        aria-label="Sajag Makhija, home"
      >
        SM<span aria-hidden="true">↗</span>
      </a>
      <button
        ref={button}
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="navigation-links"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <div id="navigation-links" className="navigation-links">
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            aria-current={
              pathname.replace(/\/$/, "") === href.replace(/\/$/, "") ||
              (label === "Work" && pathname.startsWith("/projects/"))
                ? "page"
                : undefined
            }
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
        <div className="nav-socials">
          <a
            href={socials.github.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.82c.85 0 1.71.12 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
            </svg>
          </a>
          <a
            href={socials.linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM2 9h4v13H2V9Zm7 0h4v1.8c.7-1.2 1.8-2.1 3.9-2.1 4.2 0 5.1 2.7 5.1 6.2V22h-4v-6.3c0-1.5 0-3.4-2.1-3.4s-2.9 1.6-2.9 3.3V22H9V9Z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
