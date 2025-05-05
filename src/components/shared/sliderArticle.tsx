"use client";

import Slider from "react-slick";
import PropTypes from "prop-types";
import ArticleCard from "./articleCard";
import { CSSProperties } from "react"
import useArticle from "@/hooks/contents/article/useList";

interface Article {
    id: number;
    category_id: number;
    title: string;
    description: string;
    thumbnail: string;
    published_at: string; 
    slug: string;
    user_id: number;
    category: {name: string}
    views: number;
  }

interface SliderCardProps {
    useButton?: boolean;
    useDots?: boolean; 
}

interface SliderButtonProps {
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
  }

const SliderCard = ({useButton = false, useDots= false}: SliderCardProps) => {

  // const { data: articles, isLoading, isFetching, refetch, isError } = useArticle();
  const { data: articles } = useArticle();
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
    
const settings = {
    dots: true,
    infinite: articles.value.length > 1,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
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
        breakpoint: 576,
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
};

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
            {articles.value.map((card: Article) => 
              <div tabIndex={1} key={card.slug}>
                  <ArticleCard thumbnail={card.thumbnail} slug={card.slug} title={card.title} description={card.description} category_name={card.category.name} published_at={card.published_at} /> 
              </div>    
            )}
          </Slider>
        </div>
      )
}

export default SliderCard;