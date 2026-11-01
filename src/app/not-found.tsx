import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="wide-page">
      <header className="page-intro">
        <p className="eyebrow">404 · A LOOSE THREAD</p>
        <h1>
          This page isn’t
          <br />
          <em>on the workbench.</em>
        </h1>
        <p className="lede">
          The link may have changed. Explore the learning library to find a
          useful next step.
        </p>
      </header>
      <Link className="button" href="/learn">
        Back to the lessons ↗
      </Link>
    </main>
  );
}
