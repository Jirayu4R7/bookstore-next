import { MetadataRoute } from "next";
import siteMetadata from "@/lib/data/siteMetadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl;
  // const bookRoutes = allBooks.map((book) => ({
  //   url: `${siteUrl}/${book.path}`,
  //   lastModified: book.lastmod || book.date,
  // }));

  const routes = ["", "product", "categories"].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
}
