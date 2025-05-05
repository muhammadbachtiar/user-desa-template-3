"use client"

import type React from "react"
import useArticle from "@/hooks/contents/article/useList";
import Image from "next/image";
import Infografis from "../section/infografis";


export default function AsideContent({ children }: { children: React.ReactNode}) {

    const { data: articles, isLoading: isArticlesLoading, isFetching: isArticlesFetching, refetch: refetchArticles, isError: isArticlesError } = useArticle();


  return (
    <div className="flex flex-col md:flex-row w-full">
      <main className="flex-1 min-w-0">
      <div className="space-y-6">
        <div className="mb-8">
          {children}
        </div>
      </div>
      </main>
      <aside className="w-full md:w-72 lg:w-96 md:sticky md:top-0 md:self-start h-fit bg-white sm:p-4 border-gray-300 md:border-l">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-blue-500 mb-4 pb-2 border-gray-300 border-b">Artikel Populer</h2>
            <ul className="space-y-4">
              {articles.value.map((news) => (
                <li key={news.id} className="flex">
                  <div className="mr-3 relative w-fit group mb-6">
                        <Image
                            className="w-40 md:w-30 rounded-sm shadow-lg object-cover"
                            src="https://www.trendwisata.com/wp-content/uploads/2023/05/1fdc0f893412ce55f0d2811821b84d3b-177.jpg"
                            alt="Article Thumbnail"
                            width={1200}
                            height={720}
                            priority 
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                    </div>
                  <a href="#" className="hover:text-blue-500 font-medium">
                    {news.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-500 mb-4 pb-2 border-gray-300 border-b">Infografis</h2>
            <div className="relative">
              <Infografis slideToShow={1}/>
            </div>
          </div>
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <div className="text-xs text-gray-500 mb-2">ADVERTISEMENT</div>
            <div className="aspect-square bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Ad Space</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
