'use client'
import Refetch from "../shared/refetch";
import useSetting from "@/hooks/settings/useSettings";

export default function Hero() {
    const { data, isLoading, isFetching, refetch, isError } = useSetting('banner', {});

  return (
    <section className="relative h-3/4 w-full min-h-96 flex justify-center items-center">
          {
              isLoading ? (
                <div className="flex animate-pulse space-x-3 w-full">
                  <div className="h-96 w-full flex-1 rounded-2xl bg-gray-200"></div>
                </div>
            ) : isError && !isFetching && !data || !data.value ? (
                <><p className="text-black text-center text-md dark:text-gray-400">Data tidak tersedia</p></>
            ) : isError && !isFetching  ? (
                <>  <Refetch refetch={refetch} /></>
            ) : (
              <>
                  <video
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                  >
                      <source src={data.value.videoUrl} type="video/mp4" />
                  </video>
                  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
                  <div className="relative z-10 sm:px-8 md:px-24 xl:px-56 text-center py-16 lg:py-32">
                      <h1 className="mb-4 text-4xl sm:text-5xl font-bold text-white lg:text-6xl">{data.value.title}</h1>
                      <p className="sm:mb-7 text-sm sm:text-md font-light tracking-tight  text-white lg:text-xl sm:px-16">{data.value.description}</p>
                  </div>
              </>
            )
          }
    </section>
    
  
  );
}
