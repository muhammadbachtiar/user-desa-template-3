"use client"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "next/navigation";
import { Button } from "flowbite-react";
import { LuRefreshCcw } from "react-icons/lu";
import Image from "next/image";
import useTourDetail from "@/hooks/contents/tour/useDetail";
import { CgMail } from "react-icons/cg";
import { BiGlobe } from "react-icons/bi";
import { CiMap } from "react-icons/ci";
import sosmedIcons from "@/components/shared/sosmedIcons";
import StreetViewChecker from "@/services/utils/checkStreetView";

const TourDetail = () => {
    const { slug } = useParams();
    const gmapsApiKey = process.env.NEXT_PUBLIC_GMAPS_API_KEY
    const { data: tour, isLoading: isLoadingTour, isFetching: isFetchingTour, refetch: refetchTour, isError: isErrorTour } = useTourDetail({}, String(slug));
    const isStreetAvailable = StreetViewChecker({lat: Number(tour.value.latitude), lng: Number(tour.value.longitude)});
    let mapsUrl = `https://www.google.com/maps/embed/v1/place?key=${gmapsApiKey}&q=${tour.value.latitude},${tour.value.longitude}`;
    if(isStreetAvailable){
        mapsUrl = `https://www.google.com/maps/embed/v1/streetview?key=${gmapsApiKey}&location=${tour.value.latitude},${tour.value.longitude}&heading=0&pitch=0`
    }

  return (
    <>  
        <div className="min-h-screen w-full">
            {isLoadingTour ? (
                <></>
            ) : isErrorTour && !isFetchingTour && !tour || Object.keys(tour.value || {}).length === 0 ? (
                <div className="flex w-full h-full justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                        <p className="text-black text-2xl dark:text-gray-400">Data tidak tersedia</p>
                    </div>
                </div>
            ) : isErrorTour && !isFetchingTour  ? (
                <div className="w-full h-full flex justify-center">
                    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                        <p className="text-black text-2xl dark:text-gray-400">Terjadi kesalahan, silakan ulangi</p>
                        <Button
                            size="sm"
                            onClick={() => {
                                refetchTour();
                            }}
                        >
                            <LuRefreshCcw size={24} />
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 h-full">
                        <div className="lg:col-span-6 lg:sticky lg:top-0 lg:h-screen">
                            <div className="h-full w-full flex items-start justify-center p-3 lg:p-6">
                                <div className="relative w-full h-full min-h-[300px] lg:min-h-[500px] rounded-xl overflow-hidden">
                                    {
                                        !tour.value.latitude && !tour.value.longitude && !gmapsApiKey ? (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                                <p className="text-gray-500 dark:text-gray-400">Map location not available</p>
                                            </div>
                                        ) : (
                                            <iframe
                                                src={mapsUrl}
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                title={`Map of ${tour.value.title}`}
                                                className="absolute inset-0"
                                            />
                                        )  
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6 p-4 lg:p-6 lg:overflow-y-auto">
                            <div className="flex flex-col gap-y-6">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 dark:text-white mb-2">
                                {tour.value.title}
                                </h1>
                                <div className="flex items-center">
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{tour.value.address}</p>
                                </div>
                            </div>
                            <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                                <Image
                                className="object-cover"
                                src={tour.value.thumbnail || "/placeholder.svg"}
                                alt="Tour Thumbnail"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-x-2">
                                <CiMap className="w-5 h-5 text-[#113F67]" />
                                <a
                                    href={tour.value.link.gmap}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-md text-gray-900 dark:text-white hover:font-bold transition-all"
                                >
                                    Lokasi
                                </a>
                                </div>
                                <div className="flex items-center gap-x-2">
                                <BiGlobe className="w-5 h-5 text-[#113F67]" />
                                <a
                                    href={`https://${tour.value.link.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-md text-gray-900 dark:text-white hover:font-bold transition-all"
                                >
                                    {tour.value.link.website}
                                </a>
                                </div>
                                <div className="flex items-center gap-x-2">
                                <CgMail className="w-5 h-5 text-[#113F67]" />
                                <a
                                    href={`mailto:${tour.value.link.email}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-md text-gray-900 dark:text-white hover:font-bold transition-all"
                                >
                                    {tour.value.link.email}
                                </a>
                                </div>
                            </div>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{tour.value.description}</p>
                            <div className="flex flex-wrap gap-4">
                                {tour.value.link.sosmed &&
                                Object.entries(tour.value.link.sosmed).map(([key, value]) => {
                                    const Icon = sosmedIcons[value.key]
                                    return (
                                    <a
                                        key={key}
                                        href={`https://${value.value}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-500 hover:bg-[#F3F9FB] group transition-all transform hover:scale-105 hover:-translate-y-1 duration-300 ease-in-out"
                                    >
                                        {Icon ? <Icon className="w-5 h-5 text-white group-hover:text-gray-900" /> : <span>{key}</span>}
                                    </a>
                                    )
                                })}
                            </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </div>
    </>
  );
};

export default TourDetail;
