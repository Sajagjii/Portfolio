import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found page-width">
      <p className="eyebrow">404 / Page not found</p>
      <h1>Nothing at this address.</h1>
      <p>Head back to the portfolio to explore my work.</p>
      <Link href="/" className="button button-primary">
        <ArrowLeft size={16} />
        Back to portfolio
      </Link>
    </main>
  );
}
