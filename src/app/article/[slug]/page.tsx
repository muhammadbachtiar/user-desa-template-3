import { Suspense } from "react"
import type { Metadata } from "next"
import ArticleService from "@/services/controlers/article/article.service"
import { generateContentMetadata } from "@/services/utils/generate-seo"
import ArticleDetailSkeleton from "@/components/modul/article/skeleton"
import ArticleDetailClient from "@/components/modul/article/detail"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {

  try {
    const articleResponse = await ArticleService.getOne(params.slug, {})
    const article = articleResponse.data

    return generateContentMetadata({ ...article, type: "article" }, { siteName: "Website Desa" })
  } catch {
    return {
      title: "Article | Website Desa",
      description: "Read our latest articles",
    }
  }
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen w-full">
      <Suspense fallback={<ArticleDetailSkeleton />}>
        <ArticleDetailClient slug={params.slug} />
      </Suspense>
    </div>
  )
}
