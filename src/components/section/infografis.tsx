"use client"

import SliderCard from "../shared/sliderInfografis";

export default function Infografis({slideToShow = 4}) {
    return (
      <section className="relative w-full flex flex-col justify-center items-center">
        <div className="w-full">
          <div className="w-full overflow-hidden">                  
            <SliderCard slideToShow={slideToShow} />
          </div>
        </div>
      </section>
    );
  }