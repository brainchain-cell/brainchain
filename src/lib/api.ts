import {Post} from "@/interfaces/post";
import fs from "node:fs";
import matter from "gray-matter";
import {join} from "node:path";
const directory=join(process.cwd(),"_posts");
export function getPostSlugs(){return fs.readdirSync(directory).filter(name=>/^[a-z0-9-]+\.md$/.test(name))}
export function getPostBySlug(slug:string):Post|undefined {const name=slug.replace(/\.md$/,"");if(!/^[a-z0-9-]+$/.test(name))return;const path=join(directory,`${name}.md`);if(!fs.existsSync(path))return;const {data,content}=matter(fs.readFileSync(path,"utf8"));if(data.status!=="published")return;return {...data,slug:name,content} as Post}
export function getAllPosts():Post[]{return getPostSlugs().map(getPostBySlug).filter((post):post is Post=>!!post).sort((a,b)=>b.date.localeCompare(a.date))}
