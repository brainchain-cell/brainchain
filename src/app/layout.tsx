import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/Brand";
import { SiteNav } from "@/components/SiteNav";
import { CloudflareAnalytics } from "@/components/CloudflareAnalytics";
import { pageMetadata, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/metadata";
import "./globals.css";
export const metadata: Metadata = {
  ...pageMetadata({
    title: SITE_TITLE,
    description:
      "AI workflows for work you have to get right. Practical lessons for briefs, meetings, automation and building with agents.",
    path: "/",
  }),
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  robots:
    process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true"
      ? { index: true, follow: true }
      : { index: false, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <noscript>
          <style>
            {
              "#main-nav{display:flex!important}.menu-button{display:none!important}"
            }
          </style>
        </noscript>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <Brand />
          <SiteNav />
        </header>
        {children}
        <footer>
          <div className="footer-top">
            <Brand />
            <p>A small, independent lab for a more useful working day.</p>
          </div>
          <nav aria-label="Footer">
            <Link href="/learn">Lessons</Link>
            <Link href="/updates">Updates</Link>
            <Link href="/about">Our approach</Link>
            <Link href="/disclosure">Disclosure & privacy</Link>
            <Link href="/subscribe">Newsletter</Link>
            <Link href="/feature-your-tool">For tool makers</Link>
            <Link href="/for-ai">For AI assistants</Link>
          </nav>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Brainchain Lab</span>
            <span>Made with care by Krishna Ravishankar.</span>
          </div>
        </footer>
        <CloudflareAnalytics />
      </body>
    </html>
  );
}
