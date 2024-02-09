import { MetadataRoute } from "next";
import siteMetadata from "@/lib/data/siteMetadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: [
        "CCbot",
        "ChatGPT-User",
        "GPTBot",
        "Google-Extended",
        "Omgilibot",
        "FacebookBot",
      ],
      disallow: "/",
    },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  };
}
