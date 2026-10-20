import { EntryPoints } from "@/components/EntryPoints";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Start here",
  description: "What are you trying to get done? Pick the one closest to your work.",
  path: "/start",
});

export default function Start() {
  return (
    <main id="main" className="updates start-page">
      <h1>Start here</h1>
      <p className="lede">What are you trying to get done? Pick the one closest to your work.</p>
      <EntryPoints />
    </main>
  );
}
