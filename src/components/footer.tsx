import { ArrowUpRight, ArrowUp } from "lucide-react";
import { socials } from "@/data/socials";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer page-width">
      <div className="footer-top">
        <div>
          <Link href="/" className="footer-name">
            SAJAG MAKHIJA<span>.</span>
          </Link>
          <p>Engineering · Software · AI · Creative Technology</p>
        </div>
        <a href="#top" className="back-top" aria-label="Back to top">
          <ArrowUp size={18} />
        </a>
      </div>
      <div className="footer-bottom">
        <span className="mono">© {new Date().getFullYear()} Sajag Makhija</span>
        <div className="footer-socials">
          {Object.values(socials).map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.label}
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
