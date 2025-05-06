import ArticleService from "@/services/controlers/article/article.service"
import { ArticleData } from "@/services/controlers/article/type"
import type { MetadataRoute } from "next"
const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    if(domainUrl){
          const {data: articles} = await ArticleService.getAll()
          const articleEntries = articles.map((article: ArticleData) => ({
            url: `https://your-website.com/articles/${article.slug}`,
            lastModified: new Date(article.published_at || article.updated_at),
            changeFrequency: "weekly" as const,
            priority: 0.8,
          }))

        const staticPages = [
            {
            url: domainUrl,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 1.0,
            },
            {
            url: `${domainUrl}/article`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.5,
            },
            {
                url: `${domainUrl}/tour`,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: 0.5,
            },
            // Add other static pages
        ]

        return [...staticPages, ...articleEntries]
        // return staticPages
    }

    return []
 
}
