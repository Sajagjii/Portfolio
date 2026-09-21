import type { Metadata } from "next";
import { ContactSection } from "@/components/sections";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have an idea? Get in touch with Sajag Makhija on LinkedIn or explore his projects on GitHub.",
};
export default function ContactPage() {
  return (
    <main id="main-content">
      <ContactSection page />
    </main>
  );
}
