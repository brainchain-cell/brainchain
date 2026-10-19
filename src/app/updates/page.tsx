import updates from "../../../data/updates.json";
import {pageMetadata} from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Official-source updates",
  description: "Announcements from selected official AI publishers. Each headline links to the original source.",
  path: "/updates",
});
type Update={id:string;title:string;url:string;source:string;date:string};
export default function Updates(){const items=updates as Update[];return <main id="main" className="updates"><p className="eyebrow">FROM THE ORIGINAL SOURCES</p><h1>Follow what changed.</h1><p>Announcements from selected official publishers. Follow a headline to read the original; inclusion is not a recommendation.</p>{items.length?items.map(item=><article className="update-row" key={item.id}><small>{item.source} · {item.date.slice(0,10)}</small><h2><a href={item.url}>{item.title} ↗</a></h2></article>):<p className="notice">No verified updates are available yet. Explore our field guides while we prepare the first collection.</p>}</main>}
