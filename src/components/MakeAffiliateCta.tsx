import { MAKE_AFFILIATE_URL } from "@/lib/constants";

export function MakeAffiliateCta() {
  return (
    <aside className="notice affiliate-cta" aria-label="Affiliate link">
      <a className="button" href={MAKE_AFFILIATE_URL} rel="sponsored noopener" target="_blank">
        Try this in Make (affiliate link)
      </a>
      <p>Signing up through this link may earn Brainchain a commission, at no extra cost to you.</p>
    </aside>
  );
}
