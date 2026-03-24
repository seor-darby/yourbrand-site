import { MetadataRoute } from "next";
import { client } from "./sanity-client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current)] { slug, publishedAt }`
  );

  const postUrls = posts.flatMap((post: { slug: { current: string }; publishedAt: string }) => [
    {
      url: `https://seorfield.com/ko/writing/${post.slug.current}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `https://seorfield.com/en/writing/${post.slug.current}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]);

  return [
    { url: "https://seorfield.com/ko", lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: "https://seorfield.com/en", lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: "https://seorfield.com/ko/writing", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://seorfield.com/en/writing", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://seorfield.com/ko/atlas", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://seorfield.com/en/atlas", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://seorfield.com/ko/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://seorfield.com/en/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://seorfield.com/ko/contact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: "https://seorfield.com/en/contact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...postUrls,
  ];
}