"use client"

import { useParams } from "next/navigation";
import { Button } from "flowbite-react";
import { LuRefreshCcw } from "react-icons/lu";
import useArticleDetail from "@/hooks/contents/article/useDetail";
import RichTextContent from "@/components/RichTextContent";
import Image from "next/image";
import AsideContent from "@/components/app-layout/aside-content";

const ArticleDetail = () => {
    const { slug } = useParams();

    const { data: article, isLoading: isLoadingArticle, isFetching: isFetchingArticle, refetch: refetchArticle, isError: isErrorArticle } = useArticleDetail({}, String(slug));

  return (
    <>  
        <div className="min-h-screen w-full">
            {isLoadingArticle ? (
                <></>
            ) : isErrorArticle && !isFetchingArticle && !article || Object.keys(article.value || {}).length === 0 ? (
                <div className="flex w-full h-full justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                        <p className="text-black text-2xl dark:text-gray-400">Data tidak tersedia</p>
                    </div>
                </div>
            ) : isErrorArticle && !isFetchingArticle  ? (
                <div className="w-full h-full flex justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                        <p className="text-black text-2xl dark:text-gray-400">Terjadi kesalahan, silakan ulangi</p>
                        <Button
                            size="sm"
                            onClick={() => {
                                refetchArticle();
                            }}
                        >
                            <LuRefreshCcw size={24} />
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <AsideContent>
                        <div className="flex flex-col px-2 md:px-4 my-2 gap-y-1 min-h-screen bg-white">
                            <span className="self-start align-baseline text-base font-semibold text-[#929AAB]">{article.value.category.name}</span>
                            <h5 className="text-3xl md:text-4xl text-start font-bold tracking-tight text-gray-900  dark:text-white">{article.value.title}</h5>
                            <span className="self-start align-baseline text-base font-semibold text-black">{article.value.user.name}</span>
                            <span className="self-start align-baseline text-sm font-medium text-gray-600">{article.value.published_at}</span>
                            <div className="relative w-full group mb-6">
                                <Image
                                    className="w-full max-h-96 rounded-sm shadow-lg object-cover"
                                    src="https://www.trendwisata.com/wp-content/uploads/2023/05/1fdc0f893412ce55f0d2811821b84d3b-177.jpg"
                                    alt="Article Thumbnail"
                                    width={1200}
                                    height={720}
                                    priority 
                                />
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                            </div>
                            <RichTextContent 
                                content={article.value.content} 
                                className="px-0 md:px-4" 
                            />
                            <div className='flex flex-row w-full my-3 px-8 gap-1 justify-items-start justify-end'>
                                <div className="flex flex-row">
                                    <p className="text-gray-500 dark:text-gray-400">Dilihat <strong className="font-semibold text-gray-900 dark:text-white">{article.value.views}</strong> kali</p>
                                </div>
                            </div>
                        </div>
                    </AsideContent>
                </>
            )}
      </div>
    </>
  );
};

export default ArticleDetail;
