import Link from "next/link";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Brainchain Lab home">
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="currentColor" />
        <path
          d="M10 12a4 4 0 0 1 8 0v8a4 4 0 0 1-8 0zm4 0a4 4 0 0 1 8 0v8a4 4 0 0 1-8 0"
          fill="none"
          stroke="var(--paper)"
          strokeWidth="1.5"
        />
      </svg>
      <span>
        brainchain<span className="brand-lab">LAB</span>
      </span>
    </Link>
  );
}
