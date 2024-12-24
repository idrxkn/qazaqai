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
      title: "AI оқу жоспарын құру",
      content:
        "Жалпы жасанды интеллектпен басқарылатын білім беру құралдарының көмегімен бейімделген оқу тәжірибелері сіздің қолыңызда. Әрбір студент өзінің күшті жақтары мен оқу қарқынына бейімделген жеке нұсқауларды ала отырып, өркендей алады. Ұтатын нәрсе көп және жоғалтатын ештеңе жоқ.",
      image: slide1img, // Adjust path as needed
    },
    {
      title: "Бірлесіп оқу",
      content: "AI жеке оқытуды қолдап қана қоймайды, сонымен қатар топтық зерттеу динамикасын жақсартады. Ол барлық қатысушылар үшін білім беру артықшылықтарын барынша арттыра отырып, өзара тиімді өзара әрекеттесуді және бірлескен жобаларды жеңілдетеді.",
      image: slide2img, // Adjust path as needed
    },
    {
      title: "Интерактивті оқыту модульдері",
      content: "Дәстүрлі сынып параметрлерін интерактивті оқу ортасына айналдыратын динамикалық, AI-мен жұмыс істейтін модульдермен жұмыс жасаңыз. Білім берудегі табысқа арналған технология арқылы күрделі пәндерді түсінуіңізді және есте сақтауыңызды жақсартыңыз."
  ,
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
