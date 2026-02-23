"use client";

import { redirect, useParams } from "next/navigation";
import Image from "next/image";
import useTourDetail from "@/hooks/contents/tour/useDetail";
import { CgMail } from "react-icons/cg";
import { BiGlobe } from "react-icons/bi";
import { CiMap } from "react-icons/ci";
import sosmedIcons from "@/components/shared/sosmedIcons";
import StreetViewChecker from "@/services/utils/checkStreetView";
import { validateAndRedirect } from "@/services/utils/shouldRedirect";
import Link from "next/link";

const TourDetail = () => {
  const { slug } = useParams();
  const gmapsApiKey = process.env.NEXT_PUBLIC_GMAPS_API_KEY;
  const { data: tour, isLoading } = useTourDetail({}, String(slug));
  const isStreetAvailable = StreetViewChecker({
    lat: Number(tour?.latitude),
    lng: Number(tour?.longitude),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center py-8">
        <div className="w-full px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-pulse">
            {/* Map Placeholder */}
            <div className="lg:col-span-7 xl:col-span-8 h-[300px] lg:h-[600px] bg-gray-200 rounded-3xl w-full" />
            
            {/* Content Placeholder */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6">
              <div className="h-10 w-3/4 bg-gray-200 rounded-lg" />
              <div className="h-6 w-1/2 bg-gray-200 rounded-lg" />
              <div className="aspect-video w-full bg-gray-200 rounded-3xl" />
              <div className="space-y-4 pt-4">
                 <div className="h-4 w-full bg-gray-200 rounded" />
                 <div className="h-4 w-full bg-gray-200 rounded" />
                 <div className="h-4 w-2/3 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (tour) {
    let mapsUrl = `https://www.google.com/maps/embed/v1/place?key=${gmapsApiKey}&q=${tour?.latitude},${tour?.longitude}`;
    if (isStreetAvailable) {
      mapsUrl = `https://www.google.com/maps/embed/v1/streetview?key=${gmapsApiKey}&location=${tour?.latitude},${tour?.longitude}&heading=0&pitch=0`;
    }
    
    return (
      <div className="min-h-screen w-full flex justify-center py-6 md:py-10">
        <div className="w-full px-4 sm:px-6 max-w-7xl">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Map (Sticky on Desktop) */}
            <div className="lg:col-span-7 xl:col-span-8">
               <div className="sticky top-24 space-y-6">
                  <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                    {!tour?.latitude && !tour?.longitude && !gmapsApiKey ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500">
                        <CiMap className="w-12 h-12 mb-2 opacity-50"/>
                        <p>Lokasi peta tidak tersedia</p>
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
                        title={`Map of ${tour?.title}`}
                        className="absolute inset-0"
                      />
                    )}
                  </div>
               </div>
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-full">
               <div className="lg:sticky lg:top-24 space-y-6"> {/* Optional: Make content sticky too or just scroll naturally */}
                  
                  {/* Header */}
                  <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight mb-2">
                      {tour?.title}
                    </h1>
                     <div className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                        <CiMap className="w-5 h-5 mt-0.5 shrink-0" />
                        <p className="text-sm md:text-base font-medium leading-normal">
                          {tour?.address || "Alamat tidak tersedia"}
                        </p>
                     </div>
                  </div>

                  {/* Thumbnail Image */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-sm bg-gray-100">
                    <Image
                      src={tour?.thumbnail || "/placeholder.svg"}
                      alt="Tour Thumbnail"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  </div>

                  {/* Contact Links */}
                  <div className="flex flex-col gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                     {tour?.link?.gmap && (
                       <a
                         href={tour?.link?.gmap}
                         target="_blank"
                         rel="noopener noreferrer" 
                         className="flex items-center gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors group"
                       >
                          <div className="p-2 bg-blue-100 text-blue-600 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                             <CiMap className="w-5 h-5" />
                          </div>
                          <span className="text-sm md:text-base font-medium truncate">Lihat di Google Maps</span>
                       </a>
                     )}
                     
                     {tour?.link?.website && (
                       <a
                         href={`https://${tour?.link.website}`}
                         target="_blank"
                         rel="noopener noreferrer" 
                         className="flex items-center gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors group"
                       >
                          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                             <BiGlobe className="w-5 h-5" />
                          </div>
                          <span className="text-sm md:text-base font-medium truncate">{tour.link.website}</span>
                       </a>
                     )}

                     {tour?.link?.email && (
                       <a
                         href={`mailto:${tour?.link?.email}`}
                         target="_blank"
                         rel="noopener noreferrer" 
                         className="flex items-center gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors group"
                       >
                          <div className="p-2 bg-purple-100 text-purple-600 rounded-full group-hover:bg-purple-600 group-hover:text-white transition-colors">
                             <CgMail className="w-5 h-5" />
                          </div>
                          <span className="text-sm md:text-base font-medium truncate">{tour.link.email}</span>
                       </a>
                     )}
                  </div>

                  {/* Description */}
                  <div className="prose prose-blue prose-sm md:prose-base dark:prose-invert max-w-none">
                     <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                       {tour?.description || "Tidak ada deskripsi tersedia untuk wisata ini."}
                     </p>
                  </div>

                  {/* Social Media */}
                  {tour?.link?.sosmed && Object.keys(tour.link.sosmed).length > 0 && (
                     <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Media Sosial</h4>
                        <div className="flex flex-wrap gap-3">
                          {Object.entries(tour.link.sosmed).map(([key, value]) => {
                             const Icon = sosmedIcons[value.key];
                             return (
                               <a
                                 key={key}
                                 href={`https://${value.value}`}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
                                 title={key}
                               >
                                 {Icon ? <Icon className="w-5 h-5" /> : <span className="text-xs font-bold">{key.substring(0, 1)}</span>}
                               </a>
                             );
                          })}
                        </div>
                     </div>
                  )}

               </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (validateAndRedirect([typeof slug === "string" ? slug : "*"])) {
    return redirect("/tour");
  }
  
  return (
    <div className="flex flex-col text-center items-center justify-center min-h-[60vh] w-full px-4">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">Halaman wisata tidak ditemukan.</p>
      <Link
        href="/tour"
        className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
      >
        Kembali ke Daftar Wisata
      </Link>
    </div>
  );
};

export default TourDetail;
