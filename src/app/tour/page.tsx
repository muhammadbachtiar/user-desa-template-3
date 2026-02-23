"use client";
import { useEffect, useState } from "react";
import { BiGlobe, BiMap, BiPlus } from "react-icons/bi";
import useTour from "@/hooks/contents/tour/useList";
import Link from "next/link";
import { CgMail } from "react-icons/cg";
import Image from "next/image";
import Refetch from "@/components/shared/refetch";
import useSetting from "@/hooks/settings/useSettings";
import { useRouter } from "next/navigation";
import useFeatureFlags from "@/hooks/settings/useFeatureFlags";

export default function Home() {
  const router = useRouter();
  const { isSectionEnabled, isLoading: isFeaturesLoading } = useFeatureFlags();
  const [search, setSearch] = useState("");

  const {
    data: setting,
    isLoading: isSettingLoading,
    isFetching: isSettingFetching,
    refetch: refetchSetting,
    isError: isSettingError,
  } = useSetting(`tour-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const {
    data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
    isError,
  } = useTour({ search: search, page_size: 6 });
  const allTour = data?.pages?.flatMap((page) => page?.data) || [];

  const backgroundStyle = setting?.value?.imageUrl
    ? { backgroundImage: `url(${setting.value.imageUrl})` }
    : { backgroundImage: `url(/images/unavailable-image.png)` };

  useEffect(() => {
    if (!isFeaturesLoading && !isSectionEnabled("tour")) {
      router.replace('/');
    }
  }, [isFeaturesLoading, isSectionEnabled, router]);

  if (isFeaturesLoading) {
    return (
      <div className="flex justify-center min-h-screen w-full">
        <div className="w-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!isSectionEnabled("tour")) {
    return null;
  }

  return (
    <>
      {isSettingLoading ? (
        <div className="flex animate-pulse mb-4 w-full justify-center">
          <div className="w-full h-52 md:h-80 bg-gray-200 rounded-b-3xl"></div>
        </div>
      ) : isSettingError && !isSettingFetching ? (
        <div className="flex min-h-52 justify-center items-center mb-4 w-full">
          <Refetch refetch={refetchSetting} />
        </div>
      ) : (
        <section
          style={backgroundStyle}
          className={`relative flex justify-center py-12 md:py-20 bg-cover bg-center w-full h-64 md:h-80 lg:h-96 items-end`}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="z-10 w-full px-4 sm:px-6 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {setting?.value?.title ?? "Wisata Desa"}
            </h2>
          </div>
        </section>
      )}

      <div className="w-full flex justify-center py-8 px-4 sm:px-6">
        <div className="w-full max-w-7xl flex flex-col gap-8">
          {/* Search Bar */}
          <div className="w-full flex justify-end">
             <div className="relative w-full md:w-1/3">
                <input
                  type="search"
                  id="search-tour"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full py-3 px-5 pr-12 rounded-xl text-sm text-gray-900 bg-white border border-gray-200 focus:ring-blue-500 focus:border-blue-500 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="Cari wisata ..."
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
             </div>
          </div>

          {/* Content Grid */}
          <div className="w-full">
            {isLoading || (allTour[0] === undefined && isFetching) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-[3/4] rounded-3xl bg-gray-200 dark:bg-gray-800 animate-pulse"
                  ></div>
                ))}
              </div>
            ) : !isError && !isFetching && allTour[0] === undefined ? (
              <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
                 <BiMap className="w-16 h-16 text-gray-300 mb-4" />
                 <p className="text-xl text-gray-500 dark:text-gray-400">
                    Wisata tidak ditemukan
                 </p>
              </div>
            ) : isError && !isFetching ? (
              <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
                <p className="text-gray-500 text-lg">Terjadi kesalahan, silakan coba lagi</p>
                <Refetch refetch={refetch} />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {allTour.map((card) => (
                    <Link
                      href={`/tour/${card?.slug ?? ""}`}
                      key={card.id}
                      className="group relative flex flex-col aspect-[3/4] overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      {/* Image Background */}
                      <Image
                        src={card?.thumbnail || "/images/unavailable-image.png"}
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2 line-clamp-2 leading-tight group-hover:text-blue-200 transition-colors">
                          {card.title}
                        </h3>
                        
                        <p className="text-sm text-gray-200 line-clamp-3 mb-4 opacity-90">
                          {card?.description ?? "Deskripsi tidak tersedia"}
                        </p>

                        <div className="space-y-1.5 text-xs sm:text-sm font-medium text-gray-300">
                           {card?.address && (
                            <div className="flex items-start gap-2">
                              <BiMap className="w-4 h-4 mt-0.5 shrink-0" />
                              <span className="line-clamp-1">{card.address}</span>
                            </div>
                           )}
                           
                           {/* Only show website or email if available, prioritized */}
                           {card?.link?.website ? (
                             <div className="flex items-center gap-2">
                               <BiGlobe className="w-4 h-4 shrink-0" />
                               <span className="line-clamp-1 truncate">{card.link.website}</span>
                             </div>
                           ) : card?.link?.email ? (
                             <div className="flex items-center gap-2">
                               <CgMail className="w-4 h-4 shrink-0" />
                               <span className="line-clamp-1 truncate">{card.link.email}</span>
                             </div>
                           ) : null}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Load More */}
                <div className="w-full flex justify-center mt-10">
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetching}
                    className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:text-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    {isFetching ? "Memuat..." : "Tampilkan Lebih Banyak"}
                    {!isFetching && <BiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform" />}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
