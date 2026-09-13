import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
export const metadata: Metadata = {title:{default:"Brainchain — AI tools for useful work",template:"%s | Brainchain"},description:"Practical guides to automation, writing and productivity. Make informed decisions about AI tools."};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <header className="site-header">
          <Link className="brand" href="/">brainchain</Link>
          <nav aria-label="Main navigation">
            <Link href="/learn">Learn</Link>
            <Link href="/#guides">Guides</Link>
            <Link href="/updates">Updates</Link>
            <Link href="/#newsletter">Newsletter</Link>
            <Link href="/about">Our approach</Link>
          </nav>
        </header>
        {children}
        <footer>
          <Link className="brand" href="/">brainchain</Link>
          <p>Practical thinking for an AI-powered working day.</p>
          <nav aria-label="Footer">
            <Link href="/about">Editorial standards</Link>
            <Link href="/disclosure">Disclosure & privacy</Link>
            <Link href="/#newsletter">Newsletter</Link>
          </nav>
        </footer>
        <Script id="mailerlite-universal" strategy="afterInteractive">{`
          (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
          .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
          n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
          (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
          ml('account', '2632671');
        `}</Script>
      </body>
    </html>
  );
}
