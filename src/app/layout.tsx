import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
export const metadata: Metadata = {title:{default:"Brainchain — AI tools for useful work",template:"%s | Brainchain"},description:"Practical guides to automation, writing and productivity. Make informed decisions about AI tools."};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body><a className="skip" href="#main">Skip to content</a><header className="site-header"><Link className="brand" href="/">brainchain</Link><nav aria-label="Main navigation"><Link href="/#guides">Guides</Link><Link href="/updates">Updates</Link><Link href="/about">Our approach</Link></nav></header>{children}<footer><Link className="brand" href="/">brainchain</Link><p>Practical thinking for an AI-powered working day.</p><nav aria-label="Footer"><Link href="/about">Editorial standards</Link><Link href="/disclosure">Disclosure & privacy</Link></nav></footer></body></html>}
