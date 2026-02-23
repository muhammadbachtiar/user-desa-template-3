'use client'
import Link from "next/link";
import Image from "next/image";
import useSetting from "@/hooks/settings/useSettings";
import Refetch from "../shared/refetch";

const Tour = () => {
    const { data, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`tour-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  
  return (
    <section className="relative w-full flex justify-center items-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-6 gap-6 lg:gap-10 items-center">
        {
          isSettingLoading ? (
            <>
              <div className="lg:col-span-2 flex justify-center items-center animate-pulse">
                <div className="w-full min-h-64 md:min-h-80 lg:min-h-96 shadow-2xl rounded-3xl bg-gray-300"></div>
              </div>
              <div className="lg:col-span-4 w-full rounded-lg py-4 lg:py-12 animate-pulse">
                <div className="h-8 md:h-10 w-3/4 bg-gray-300 rounded mb-5"></div>
                <div className="h-5 md:h-6 w-1/2 bg-gray-300 rounded mt-2"></div>
                <div className="h-4 w-full bg-gray-300 rounded mt-2"></div>
                <div className="h-4 w-11/12 bg-gray-300 rounded mt-2"></div>
                <div className="h-4 w-10/12 bg-gray-300 rounded mt-2"></div>
                <div className="inline-flex justify-center mt-8 lg:mt-12 items-center py-4 px-6 rounded-md bg-gray-300 w-40 h-10"></div>
              </div>
            </>
          ) : isSettingError && !isSettingFetching ? (
            <div className="w-full col-span-full flex justify-center">          
              <Refetch refetch={refetchSetting} />
            </div>
          ) : (
            <>
              <div className="lg:col-span-2 flex justify-center items-center">                  
                <Image
                  className="w-full h-auto min-h-64 md:min-h-80 shadow-2xl backdrop-blur-2xl rounded-3xl aspect-video lg:aspect-square object-cover"
                  src={data?.value?.imageUrl ?? '/images/unavailable-image.png'}
                  alt="Tour Banner"
                  width={500}
                  height={500}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <div className="lg:col-span-4 w-full rounded-lg py-4 lg:py-12">                  
                <h5 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-5 tracking-tight text-gray-900 dark:text-white">
                  {data?.value?.title ?? "[Judul wisata belum diatur]"}
                </h5>
                <div className="flex items-center mt-2">
                  <p className="my-0 text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    {data?.value?.subTitle ?? "[Sub judul wisata belum diatur]"}
                  </p>
                </div>
                <p className="text-sm sm:text-base lg:text-lg font-normal text-gray-500 dark:text-gray-400 mt-2">
                  {data?.value?.description ?? "[Deskripsi wisata belum diatur]"}
                </p>
                <Link 
                  href={'/tour'} 
                  className="inline-flex justify-center mt-6 border-2 lg:mt-10 hover:text-black hover:border-black items-center py-3 px-5 sm:py-4 sm:px-6 text-sm sm:text-base font-medium text-center bg-[#393E46] text-white rounded-md hover:bg-white focus:ring-2 focus:ring-gray-400 transition transform duration-300 ease-in-out"
                >
                  Lihat Selengkapnya
                </Link>
              </div>
            </>
          )
        }
      </div>
    </section>
  );
};

export default Tour;