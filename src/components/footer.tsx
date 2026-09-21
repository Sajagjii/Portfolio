import { ArrowUp, ArrowUpRight } from "lucide-react";
import { socials } from "@/data/socials";

export function Footer() {
  return (
    <footer className="footer page-width">
      <div className="footer-top">
        <a href="/" className="footer-name">
          SAJAG MAKHIJA<span>↗</span>
        </a>
        <a href="#top" className="back-top" aria-label="Back to top">
          <ArrowUp size={20} />
        </a>
      </div>
      <div className="footer-bottom">
        <span className="mono">© {new Date().getFullYear()} SAJAG MAKHIJA</span>
        <span className="footer-note mono">BUILT WITH CURIOSITY.</span>
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
