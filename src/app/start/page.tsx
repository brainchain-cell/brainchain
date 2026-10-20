import { EntryPoints } from "@/components/EntryPoints";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Start here",
  description: "Pick the work in front of you: briefs and meetings, one task to automate, or building with agents.",
  path: "/start",
});

export default function Start() {
  return (
    <main id="main" className="updates start-page">
      <h1>Start here</h1>
      <p className="lede">Pick the work in front of you.</p>
      <EntryPoints />
    </main>
  );
}
