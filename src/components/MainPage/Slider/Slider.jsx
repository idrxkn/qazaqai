import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/bundle";
import "./Slider.css";
import Card from "./Card";
import { useTranslation } from "react-i18next";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FreeMode, Pagination } from "swiper/modules";
import { Navigation, Scrollbar, A11y, Autoplay } from "swiper/modules";

const SliderComponent = () => {
  const { t, i18n } = useTranslation();
  const slide1img = (
    <div className="slide-icon">
      <FontAwesomeIcon icon="fa-solid fa-shapes" />
    </div>
  );
  const slide2img = (
    <div className="slide-icon">
      <FontAwesomeIcon icon="fa-solid fa-laptop-code" />{" "}
    </div>
  );
  const slide3img = (
    <div className="slide-icon">
      <FontAwesomeIcon icon="fa-solid fa-atom" />
    </div>
  );

  const slides = [
    {
      title: t("slide1.title"),
      content: t("slide1.text"),
      image: slide1img, // Adjust path as needed
    },
    {
      title: t("slide2.title"),
      content: t("slide2.text"),
      image: slide2img, // Adjust path as needed
    },
    {
      title: t("slide3.title"),
      content: t("slide3.text"),
      image: slide3img, // Adjust path as needed
    },
  ];

  return (
    <div className="slider-container">
      <Swiper
        modules={[FreeMode, Autoplay]}
        spaceBetween={1}
        slidesPerView={2}
        autoplay={{ delay: 1, disableOnInteraction: true }}
        speed={5000}
        grabCursor={true}
        loop={true}
        freeMode={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Card
              title={slide.title}
              content={slide.content}
              image={slide.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderComponent;
library.add(fab, fas, far);
