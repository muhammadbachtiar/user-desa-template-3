import type { Metadata } from "next"
import ArticleService from "@/services/controlers/article/article.service"
import { formatMetadata } from "@/services/utils/generate-seo"
import ArticleDetailClient from "@/components/modul/article/detail"
import { PageProps } from "../../../../.next/types/app/article/[slug]/page"
import { ArticleData } from "@/services/controlers/article/type"

interface DynamicPageProps {
  params: { slug?: string };
}

let article: ArticleData;

export async function generateMetadata({ params }: DynamicPageProps & PageProps): Promise<Metadata> {

  try {
    const articleResponse = await ArticleService.getOne(params.slug || '', { with: "user,category" })
     article = articleResponse.data

    return formatMetadata({ ...article, type: "article" }, { siteName: "Website Desa" })
  } catch {
    return {
      title: "Artikel | Website Desa",
      description: "Baca artikel terbaru kami",
    }
  }
}

export default function ArticleDetailPage({ params }: DynamicPageProps & PageProps) {
  return (
    <div className="min-h-screen w-full">
      <ArticleDetailClient slug={params.slug || ''} initialData={article}  />
    </div>
  )
}
