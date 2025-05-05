"use client";

import Slider from "react-slick";
import PropTypes from "prop-types";
import Image from "next/image";
import { CSSProperties } from "react"
import React from "react";

interface Infografis {
    id: number;
    user_id: number;
    title: string;
    slug: string;
    link: string
    published_at: string; 
    description: string;
  }

interface SliderCardProps {
    data: Infografis[]; 
    useButton?: boolean;
    useDots?: boolean; 
    onClickHandler: (index:number) => void ;
    slideToShow: number
  }

interface SliderButtonProps {
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
  }

const SliderCard = ({data, useButton = false, useDots= false, onClickHandler, slideToShow = 4}: SliderCardProps) => {

function SampleNextArrow(props: SliderButtonProps) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
        />
    );
}
      
function SamplePrevArrow(props: SliderButtonProps) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
        />
      );
}  
    
let settings = {};
let height = '';

if(slideToShow === 1){
  settings = {
    dots: true,
    infinite: data.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: !useButton ? <SampleNextArrow /> : undefined,
    prevArrow: !useButton ? <SamplePrevArrow /> : undefined,
    ...(useDots && {
        appendDots: (dots: React.ReactNode) => (
          <div
            style={{
              position: 'unset',
              padding: "0 10px"
            }}
          >
            <ul style={{ margin: "0px" }}>{dots}</ul>
          </div>
        )
      }
    )
  };
  height = "50vh"
} else {
  settings = {
    dots: true,
    infinite: data.length > 1,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 664,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: !useButton ? <SampleNextArrow /> : undefined,
    prevArrow: !useButton ? <SamplePrevArrow /> : undefined,
    ...(useDots && {
        appendDots: (dots: React.ReactNode) => (
          <div
            style={{
              position: 'unset',
              padding: "0 10px"
            }}
          >
            <ul style={{ margin: "0px" }}>{dots}</ul>
          </div>
        )
      }
    )
  }
  height = "68vh"
}

SamplePrevArrow.propTypes = {
    className: PropTypes.string, 
    style: PropTypes.object, 
    onClick: PropTypes.func 
};

SampleNextArrow.propTypes = {
    className: PropTypes.string, 
    style: PropTypes.object, 
    onClick: PropTypes.func 
};
  
return (
        <div>
            <Slider {...settings}>
            {data.map((card: Infografis, index:number) => {
              return (
                <div tabIndex={1} key={card.slug} onClick={()=> {onClickHandler(index)}}>
                  <div className="relative px-2 group hover:scale-100 focus:scale-100 transition duration-300 ease-in-out"> 
                      <div className="relative flex justify-center overflow-hidden w-full h-full group rounded-2xl">
                        {card.link && 
                          <Image
                          className="h-full w-full md:min-h-96 object-cover transform group-hover:scale-110 group-focus:scale-110 transition duration-300 ease-in-out"
                          src={card.link}
                          alt="Tour Banner"
                          width={500}
                          height={300}
                          style={{
                              width: "auto",
                              height: height,
                          }}
                          />}
                      </div>
                      <div className="flex flex-col gap-2 px-2 mt-2 w-full h-full text-start items-end"> 
                        <h5 className="text-lg text-start font-bold w-full mx-2 tracking-tighter text-gray-700 dark:text-white">{card.title}</h5>
                        <p className="text-sm text-start font-semibold w-full mx-2 tracking-tighter text-gray-600 dark:text-white line-clamp-3">{card.description}</p>
                      </div>
                  </div>
              </div>  
              )
            }
               
            )}
          </Slider>
        </div>
      )
}

export default SliderCard;