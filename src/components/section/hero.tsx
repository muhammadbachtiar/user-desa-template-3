'use client'
import Image from "next/image";
import Refetch from "../shared/refetch";
import useSetting from "@/hooks/settings/useSettings";
import { motion } from "framer-motion";

export default function Hero() {
  const { data, isLoading, isFetching, refetch, isError } = useSetting(`hero-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

  const isVideo = (url: string | undefined | null): boolean => {
    if (!url) return false;
    return /\.(mp4|webm|ogg)$/i.test(url);
  };

  const hasTextContent = !!(data?.value?.title || data?.value?.description);
  const mediaUrl = data?.value?.videoUrl;
  const hasValidMedia = !!mediaUrl;

  if (isLoading) {
    return (
      <section className="relative w-full mb-[54px]">
        <div className="flex animate-pulse space-x-3 w-full px-4">
          <div className="h-96 w-full flex-1 rounded-2xl bg-gray-200"></div>
        </div>
      </section>
    );
  }

  if (isError && !isFetching) {
    return (
      <section className="relative w-full mb-[54px] flex justify-center items-center min-h-96">
        <Refetch refetch={refetch} />
      </section>
    );
  }

  // MODE 1: Title/Description exist → image as cover background with min-height
  if (hasTextContent) {
    return (
      <section className="relative w-full mb-[54px]">
        <div className="relative w-full min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh]">
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 z-10" />

          {/* Media as background cover */}
          {hasValidMedia && (
            <>
              {isVideo(mediaUrl) ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={mediaUrl} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={mediaUrl || '/images/unavailable-image.png'}
                  alt={data?.value?.title || "Hero Background"}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              )}
            </>
          )}

          {/* Text overlay with subtle animation */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="max-w-4xl w-full px-6 md:px-0 text-white text-center py-16 lg:py-32">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-center text-white drop-shadow-lg leading-tight"
              >
                {data?.value?.title ?? ""}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 text-center text-white/90 max-w-3xl mx-auto drop-shadow-md leading-relaxed"
              >
                {data?.value?.description ?? ""}
              </motion.p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // MODE 2: No title/description → full image without cropping
  return (
    <section className="relative w-full mb-[54px]">
      <div className="relative w-full">
         <div className="absolute inset-0 bg-black/30 z-10" />
        {hasValidMedia ? (
          <>
            {isVideo(mediaUrl) ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto block"
              >
                <source src={mediaUrl} type="video/mp4" />
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mediaUrl}
                alt="Hero Image"
                className="w-full h-auto block"
              />
            )}
          </>
        ) : (
          <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] bg-gray-200" />
        )}
      </div>
    </section>
  );
}
