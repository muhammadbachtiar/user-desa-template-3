'use client'

// Hapus import PageProps yang error karena merujuk ke internal .next
import { use, useState } from "react";
import Refetch from "@/components/shared/refetch";
import useTour from "@/hooks/contents/tour/useList";
import useInfografis from "@/hooks/contents/infografis/useInfografis";
import { Infografis } from "@/services/controlers/infografis/type";
import Link from "next/link";
import LightboxImage from "@/components/shared/Lightbox";
import useArticle from "@/hooks/contents/article/useList";
import useFeatureFlags from "@/hooks/settings/useFeatureFlags";
import { BiSearch, BiNews, BiImage, BiMap } from "react-icons/bi";

// Next.js 15: params dan searchParams adalah Promise
interface PageProps {
    params: Promise<{ search: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Badge component untuk label tipe konten
function TypeBadge({ type }: { type: "article" | "infografis" | "tour" }) {
    const config = {
        article: { label: "Artikel", icon: BiNews, color: "bg-blue-100 text-blue-700" },
        infografis: { label: "Infografis", icon: BiImage, color: "bg-emerald-100 text-emerald-700" },
        tour: { label: "Wisata", icon: BiMap, color: "bg-amber-100 text-amber-700" },
    };
    const { label, icon: Icon, color } = config[type];
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
            <Icon className="w-3 h-3" />
            {label}
        </span>
    );
}

// Unified search result item
interface SearchResultItem {
    id: string | number;
    type: "article" | "infografis" | "tour";
    title: string;
    description?: string;
    slug?: string;
    href?: string;
    onClick?: () => void;
}

export default function Home({ params }: PageProps) {
    const unwrappedParams = use(params);
    const [searchValue, setSearchValue] = useState(unwrappedParams.search || '');
    const { isSectionEnabled } = useFeatureFlags();

    const isTourEnabled = isSectionEnabled("tour");

    const { data: articles, isLoading: isArticleLoading, isFetching: isArticleFetching, refetch: refetchArticle, isError: isArticleError } = useArticle({ "search": searchValue, "page_size": 6 });
    const { data: tour, isLoading: isTourLoading, isFetching: isTourFetching, refetch: refetchTour, isError: isTourError } = useTour({ "search": searchValue });
    const { data: infografis, isLoading: isInfografisLoading, isFetching: isInfografisFetching, refetch: refetchInfografis, isError: isInfografisError } = useInfografis({ "search": searchValue });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Gabungkan semua data menjadi satu list
    const isLoading = isArticleLoading || isInfografisLoading || (isTourEnabled && isTourLoading);
    const isFetching = isArticleFetching || isInfografisFetching || (isTourEnabled && isTourFetching);
    const hasAnyError = isArticleError || isInfografisError || (isTourEnabled && isTourError);

    // Build unified results
    const results: SearchResultItem[] = [];

    // Artikel
    const articleData = articles?.pages?.[0]?.data || [];
    articleData.forEach((article: { id: string | number; title: string; description?: string; slug?: string }) => {
        results.push({
            id: `article-${article.id}`,
            type: "article",
            title: article.title,
            description: article.description,
            slug: article.slug,
            href: `/article/${article.slug}`,
        });
    });

    // Infografis
    if (infografis && Array.isArray(infografis)) {
        infografis.forEach((item: Infografis, index: number) => {
            results.push({
                id: `infografis-${item.id}`,
                type: "infografis",
                title: item.title,
                description: item.description,
                onClick: () => { setIsOpen(true); setCurrentIndex(index); },
            });
        });
    }

    // Tour (hanya jika enabled)
    if (isTourEnabled) {
        const tourData = tour?.pages?.[0]?.data || [];
        tourData.forEach((item: { id: string | number; title: string; description?: string; slug?: string }) => {
            results.push({
                id: `tour-${item.id}`,
                type: "tour",
                title: item.title,
                description: item.description,
                slug: item.slug,
                href: `/tour/${item.slug}`,
            });
        });
    }

    const totalResults = results.length;

    return (
        <>
            <div className="min-h-screen flex justify-center w-full">
                <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col gap-6 py-6">

                    {/* Search Input */}
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                            <BiSearch className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            id="search-dropdown"
                            value={searchValue}
                            onChange={handleChange}
                            className="block w-full py-3.5 ps-12 pe-5 rounded-xl text-sm text-gray-900 bg-gray-100 placeholder:text-gray-500 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                            placeholder="Cari artikel, infografis, wisata ..."
                        />
                    </div>

                    {/* Result count */}
                    {!isLoading && !isFetching && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                                {totalResults > 0
                                    ? `Ditemukan ${totalResults} hasil untuk "${searchValue}"`
                                    : searchValue
                                        ? `Tidak ada hasil untuk "${searchValue}"`
                                        : "Masukkan kata kunci untuk mencari"
                                }
                            </span>
                        </div>
                    )}

                    {/* Results */}
                    <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-700">
                        {isLoading || (isFetching && results.length === 0) ? (
                            // Loading skeleton
                            Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-2 py-4 animate-pulse"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="h-5 w-16 rounded-full bg-gray-200"></div>
                                        <div className="h-5 w-3/5 rounded bg-gray-200"></div>
                                    </div>
                                    <div className="h-4 w-4/5 rounded bg-gray-100"></div>
                                </div>
                            ))
                        ) : hasAnyError && results.length === 0 ? (
                            // Error state
                            <div className="flex flex-col items-center justify-center py-16 gap-4">
                                <p className="text-gray-500 text-lg">Terjadi kesalahan saat mencari</p>
                                <div className="flex gap-2">
                                    {isArticleError && <Refetch refetch={refetchArticle} />}
                                    {isInfografisError && <Refetch refetch={refetchInfografis} />}
                                    {isTourEnabled && isTourError && <Refetch refetch={refetchTour} />}
                                </div>
                            </div>
                        ) : results.length === 0 ? (
                            // Empty state
                            <div className="flex flex-col items-center justify-center py-16 gap-3">
                                <BiSearch className="w-12 h-12 text-gray-300" />
                                <p className="text-gray-400 text-lg text-center">
                                    {searchValue
                                        ? "Tidak ada hasil yang ditemukan"
                                        : "Ketik kata kunci untuk mulai mencari"
                                    }
                                </p>
                            </div>
                        ) : (
                            // Results list
                            results.map((item) => {
                                const content = (
                                    <div
                                        className="flex flex-col gap-1.5 py-4 px-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            <TypeBadge type={item.type} />
                                            <h3 className="font-semibold text-gray-900 dark:text-white text-base line-clamp-1">
                                                {item.title}
                                            </h3>
                                        </div>
                                        {item.description && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 pl-0.5">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                );

                                if (item.href) {
                                    return (
                                        <Link key={item.id} href={item.href} tabIndex={1}>
                                            {content}
                                        </Link>
                                    );
                                }

                                if (item.onClick) {
                                    return (
                                        <div key={item.id} onClick={item.onClick} role="button" tabIndex={1}>
                                            {content}
                                        </div>
                                    );
                                }

                                return <div key={item.id}>{content}</div>;
                            })
                        )}
                    </div>

                    {/* Lightbox untuk infografis */}
                    {infografis && Array.isArray(infografis) && infografis.length > 0 && (
                        <LightboxImage data={infografis} isOpen={isOpen} currentIndex={currentIndex} setIsOpen={setIsOpen} />
                    )}
                </div>
            </div>
        </>
    );
}
