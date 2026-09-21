import type { Metadata } from "next";
import { LabSection } from "@/components/sections";
export const metadata: Metadata = {
  title: "Lab",
  description:
    "An open notebook of AI workflows, automation experiments, and creative technology concepts by Sajag Makhija.",
};
export default function LabPage() {
  return (
    <main id="main-content">
      <LabSection page />
    </main>
  );
}
