"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="menu-button"
        aria-controls="main-nav"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}{" "}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <nav
        id="main-nav"
        className={open ? "nav-open" : ""}
        aria-label="Main navigation"
      >
        {[
          ["/learn", "Learn"],
          ["/tools", "Tools"],
          ["/about", "About"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={
              pathname === href || pathname.startsWith(href + "/")
                ? "page"
                : undefined
            }
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/subscribe"
          className="nav-subscribe"
          aria-current={pathname === "/subscribe" ? "page" : undefined}
          onClick={() => setOpen(false)}
        >
          The newsletter <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </>
  );
}
