'use client'
import SliderCard from '../shared/sliderArticle';
import Link from 'next/link';
import useSetting from '@/hooks/settings/useSettings';
import Refetch from '../shared/refetch';

export default function Article() {
  const { data: setting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`article-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

  const backgroundStyle = setting?.value?.imageUrl 
    ? { backgroundImage: `url(${setting.value.imageUrl})` }
    : { backgroundImage: `url(/images/unavailable-image.png)`};

  return (
    <section className="relative w-full flex flex-col justify-center items-center gap-6">
      <div className="max-w-full w-full dark:border-gray-600">
        {
          isSettingLoading ? (
            <div className="flex animate-pulse mb-4 w-full">
              <div className="h-44 md:h-60 w-full flex-1 rounded-xl bg-gray-200"></div>
            </div>
          ) : isSettingError && !isSettingFetching ? (
            <div className="flex min-h-52 justify-center items-center mb-4 w-full">
              <Refetch refetch={refetchSetting} />
            </div>
          ) : (
            <div style={backgroundStyle} className="relative bg-cover bg-center rounded-xl overflow-hidden h-44 md:h-60 flex flex-col justify-center items-center">
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative flex flex-col justify-center items-center px-6 md:px-16 xl:px-32 text-center gap-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight">
                  {setting?.value?.title || "[Judul artikel belum diatur]"}
                </h2>
                <Link 
                  href="/article" 
                  className="inline-flex justify-center hover:text-gray-900 items-center py-2.5 px-6 text-sm sm:text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 hover:border-gray-900 focus:ring-4 focus:ring-gray-400 transition transform duration-300 ease-in-out"
                >
                  Lihat selengkapnya
                </Link> 
              </div>
            </div>
          )
        }
      </div>
      <div className="w-full overflow-hidden">
        <SliderCard/>
      </div>
    </section>
  );
}
