'use client'

import { useState } from 'react';
import Icons from '../shared/icons';
import Link from 'next/link';
import Image from 'next/image';
import useSetting from '@/hooks/settings/useSettings';
import Refetch from '../shared/refetch';
import { Modal, ModalHeader, ModalBody } from 'flowbite-react';
import { motion, AnimatePresence } from 'framer-motion';
import useFeatureFlags from '@/hooks/settings/useFeatureFlags';

// ─── Animation variants ───
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.35, ease: 'easeOut' },
  }),
};

// ─── Sub-component: renders one service card (used in grid & modal) ───
function ServiceCard({ item, onClick, index = 0, className = "w-full" }) {
  const IconComponent = Icons[item.icon] ?? Icons.FaQuestion;
  const hasImage = !!item.image;
  const hasChildren = Array.isArray(item.child) && item.child.length > 0;

  const cardContent = (
    <div className="group flex flex-col items-center justify-start gap-1.5 p-3 md:p-4 rounded-xl bg-[#F7F7F7] hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer w-full h-full min-h-[100px] md:min-h-[140px]">
      {/* Icon / Image area */}
      <div className="relative flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden bg-gray-200/60 dark:bg-gray-700 flex-shrink-0">
        {hasImage ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : (
          <IconComponent className="w-5 h-5 md:w-7 md:h-7 text-[#393E46] dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-white transition-colors" />
        )}
      </div>

      {/* Title */}
      <span className="text-[11px] md:text-xs font-semibold text-gray-800 dark:text-gray-200 text-center line-clamp-2 leading-tight max-h-[40px] max-w-[120px]">
        {item.title}
      </span>

      {/* Description (only shown on md+) */}
      <span className="hidden md:block text-[10px] text-gray-500 dark:text-gray-400 text-center line-clamp-2 leading-snug max-h-[40px] max-w-[140px]">
        {item.description || `Informasi tentang ${item.title}`}
      </span>
    </div>
  );

  const wrapper = (children) => (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );

  // If has children → open modal on click
  if (hasChildren) {
    return wrapper(
      <button
        type="button"
        onClick={() => onClick?.(item)}
        className="w-full h-full focus:outline-none"
      >
        {cardContent}
      </button>
    );
  }

  // If external link
  if (item.link?.startsWith('http')) {
    return wrapper(
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="w-full">
        {cardContent}
      </a>
    );
  }

  // Internal link
  return wrapper(
    <Link href={item.link || '/'} className="w-full">
      {cardContent}
    </Link>
  );
}

// ─── Mobile bottom bar card (simplified) ───
function MobileBarCard({ item, onClick }) {
  const IconComponent = Icons[item.icon] ?? Icons.FaQuestion;
  const hasImage = !!item.image;
  const hasChildren = Array.isArray(item.child) && item.child.length > 0;

  const content = (
    <div className="flex flex-col items-center justify-center gap-1 min-w-[60px] max-w-[72px] py-2 px-1">
      <div className="relative flex items-center justify-center w-7 h-7 rounded-full overflow-hidden bg-gray-200/60 flex-shrink-0">
        {hasImage ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="28px"
            className="object-cover"
          />
        ) : (
          <IconComponent className="w-4 h-4 text-[#393E46]" />
        )}
      </div>
      <span className="text-[10px] text-gray-700 text-center line-clamp-1 leading-tight font-medium max-w-[64px]">
        {item.title}
      </span>
    </div>
  );

  if (hasChildren) {
    return (
      <button type="button" onClick={() => onClick?.(item)} className="focus:outline-none">
        {content}
      </button>
    );
  }

  if (item.link?.startsWith('http')) {
    return (
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={item.link || '/'}>
      {content}
    </Link>
  );
}

// ─── Main Component ───
export default function App() {
  const [selectedService, setSelectedService] = useState(null);
  
  // Feature flags hook
  const { isSectionEnabled, pressRelease } = useFeatureFlags();

  const { data, isLoading, isFetching, refetch, isError } = useSetting(`service-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});
  const { data: appSetting, isLoading: isSettingLoading, isFetching: isSettingFetching, refetch: refetchSetting, isError: isSettingError } = useSetting(`app-${process.env.NEXT_PUBLIC_VILLAGE_ID}`, {});

  const services = (Array.isArray(data?.value) ? data.value : [])
    .filter((item) => {
      // If no link, show it
      if (!item.link) return true;
      const link = item.link;

      if (link === './tour' || link === 'tour' || link.includes('tour')) {
         return isSectionEnabled('tour');
      }

      if (link === 'press-release' || link === '/press-release' || link.includes('press-release')) {
         return pressRelease;
      }

      return true;
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const handleOpenModal = (item) => {
    setSelectedService(item);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <>
      <section className="flex w-full justify-center my-3 fixed left-0 bottom-0 z-10 max-w-full dark:border-gray-600 md:static md:flex-col md:items-center md:bg-transparent md:border-0">
        {/* ─── Header (desktop only) ─── */}
        <div className="hidden md:flex flex-col col-span-8 gap-2 min-h-16 mb-6 justify-items-center items-center">
          {isSettingLoading ? (
            <div className="flex animate-pulse space-x-3">
              <div className="flex flex-col justify-center items-center align-middle gap-y-6">
                <div className="h-8 w-30 rounded bg-gray-200"></div>
                <div className="h-4 w-36 rounded bg-gray-200"></div>
              </div>
            </div>
          ) : isSettingError && !isSettingFetching ? (
            <Refetch refetch={refetchSetting} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-2"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-gray-900 dark:text-white line-clamp-2 text-center max-w-3xl">
                {appSetting?.value?.title ?? "[Judul layanan belum diatur]"}
              </h2>
              <p className="text-sm md:text-base lg:text-lg font-medium text-gray-500 dark:text-gray-400 line-clamp-2 text-center max-w-2xl">
                {appSetting?.value?.subTitle ?? "[Sub judul layanan belum diatur]"}
              </p>
            </motion.div>
          )}
        </div>

        {/* ─── Mobile bottom bar ─── */}
        <div
          style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="flex md:hidden overflow-x-auto w-full max-w-[calc(100%-2rem)] mx-auto bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 fixed bottom-4 items-center"
        >
          <div className="flex m-auto items-center gap-3 p-2 min-w-fit">
            {isLoading || (!data || !(Array.isArray(data?.value) && data?.value.length > 0)) && isFetching ? (
              <div className="flex justify-center w-full animate-pulse space-x-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="bg-gray-200 rounded-lg w-14 h-12"></div>
                ))}
              </div>
            ) : isError && !isFetching ? (
              <Refetch refetch={refetch} />
            ) : services.length === 0 && !isFetching ? (
              <p className="text-gray-500 text-center text-xs whitespace-nowrap px-4">Layanan tidak tersedia</p>
            ) : (
              services.map((item) => (
                <MobileBarCard key={item.id ?? item.title} item={item} onClick={handleOpenModal} />
              ))
            )}
          </div>
        </div>

        {/* ─── Desktop grid ─── */}
        <div className="hidden md:flex flex-wrap justify-center gap-6 w-full max-w-7xl mx-auto px-4 md:px-0">
          {isLoading || (!data || !(Array.isArray(data?.value) && data?.value.length > 0)) && isFetching ? (
            <div className="flex flex-wrap justify-center gap-6 animate-pulse w-full">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-xl w-44 md:w-48 h-40"></div>
              ))}
            </div>
          ) : isError && !isFetching ? (
            <div className="w-full flex justify-center">
              <Refetch refetch={refetch} />
            </div>
          ) : services.length === 0 && !isFetching ? (
            <p className="w-full text-gray-500 text-center text-lg dark:text-gray-400 py-10">Layanan tidak tersedia</p>
          ) : (
            services.map((item, i) => (
              <ServiceCard 
                key={item.id ?? item.title} 
                item={item} 
                onClick={handleOpenModal} 
                index={i}
                className="w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] max-w-[220px]" 
              />
            ))
          )}
        </div>
      </section>

      {/* ─── Sub-service Modal ─── */}
      <Modal
        show={!!selectedService}
        onClose={handleCloseModal}
        size="4xl"
        dismissible
      >
        <ModalHeader>
          <div className="flex items-center gap-3">
            {selectedService?.image ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={selectedService.image}
                  alt={selectedService.title}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
            ) : (
              (() => {
                const Icon = Icons[selectedService?.icon] ?? Icons.FaQuestion;
                return (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                );
              })()
            )}
            <div className="min-w-0 flex-1">
              <span className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                {selectedService?.title}
              </span>
              {selectedService?.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                  {selectedService.description}
                </p>
              )}
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <AnimatePresence>
              {selectedService?.child?.map((child, i) => (
                <ServiceCard key={child.id ?? child.title} item={child} onClick={null} index={i} />
              ))}
            </AnimatePresence>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
