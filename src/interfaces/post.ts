import { type Author } from "./author";

export type Post = {
  slug: string;
  category: string;
  readTime: number;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
};
