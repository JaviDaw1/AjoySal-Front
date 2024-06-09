import React from 'react';
import Slider from 'react-slick';
import cremaMaiz from '../images/crema_maiz.jpg';
import dango from '../images/dango.webp';
import huevos from '../images/huevos.jpg';
import tortilla from '../images/tortilla.webp';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Carousel() {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000, // Ajustar la velocidad de desplazamiento aquí
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="bg-gray-200 rounded-md mb-8 max-w-md mx-auto">
      <div className="w-full">
        <Slider {...settings}>
          <div>
            <img src={cremaMaiz} className="w-full h-auto" />
          </div>
          <div>
            <img src={dango} className="w-full h-auto" />
          </div>
          <div>
            <img src={huevos} className="w-full h-auto" />
          </div>
          <div>
            <img src={tortilla} className="w-full h-auto" />
          </div>
        </Slider>
      </div>
    </div>
  );
}
