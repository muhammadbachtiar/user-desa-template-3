"use client"

import SliderCard from "../shared/sliderInfografis";
import useInfografis from "@/hooks/contents/useInfografis";
import LightboxImage from "../shared/Lightbox";
import { useState } from "react";

export default function Infografis({slideToShow = 4}) {
    const { data, isLoading, isFetching, refetch, isError } = useInfografis();
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleInfografisClick = (index:number) => {setIsOpen(true); setCurrentIndex(index)};
    return (
      <section className="relative flex justify-center items-center">
            <div className="max-w-full w-full grid grid-cols-9 gap-2 dark:bg-gray-700 dark:border-gray-600">
                 <div className="col-span-9 max-w-full w-full justify-center overflow-hidden dark:bg-gray-800 dark:border-gray-700">                  
                    <SliderCard slideToShow={slideToShow} data={data.value} onClickHandler={handleInfografisClick} />
                    <LightboxImage data={data.value} isOpen={isOpen} currentIndex={currentIndex} setIsOpen={setIsOpen} />
                </div>
            </div>
      </section>
    );
  }
  