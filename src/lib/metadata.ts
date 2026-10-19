import type { Metadata } from "next";
import { OG_IMAGE_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/constants";

export { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL };

const shareImage = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: "Brainchain — practical AI guides",
};

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const socialTitle = title === SITE_TITLE ? title : `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE_PATH],
    },
  };
}
