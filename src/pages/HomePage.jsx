// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaThumbsUp, FaArrowRight } from 'react-icons/fa'; // Import the arrow icon
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import Fundators from '../components/Fundators';
import Divider from '../components/Divider';
import video from '../../public/videos/VideoInicial.mp4';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto p-4 flex-grow">
        <main>
          <div className="space-y-8">
            <div className="text-center p-4 bg-white">
              <h2 className="text-3xl font-bold mb-4">Bienvenido a AjoySal</h2>
              <p className="text-lg mb-4">Publica y encuentra las mejores recetas de todo el mundo.</p>
              <a href='/recipeclient' className="inline-flex items-center text-gray-500 hover:text-gray-950 transition-all ease-in-out duration-200 w-full lg:w-auto mx-auto lg:mx-0">
                Ver Recetas <FaArrowRight className="ml-2" />
              </a>
            </div>
            <Divider />
            <div className="flex flex-col lg:flex-row items-center bg-white">
              <div className="w-full lg:w-1/2 lg:pr-4">
                <Carousel />
              </div>
              <div className="w-full lg:w-1/2 lg:pl-4 mt-4 lg:mt-0">
                <h3 className="text-2xl font-bold mb-4">Descubre nuestras mejores recetas</h3>
                <p className="text-base mb-4">En AjoySal, nos dedicamos a compartir las mejores recetas de cocina de todo el mundo. Ya sea que busques platos tradicionales o nuevas creaciones culinarias, ¡aquí encontrarás algo para ti!</p>
              </div>
            </div>
            <Divider />
            <div className="text-center p-3 bg-white">
              <h3 className="text-2xl font-bold mb-4">Tutoriales de cocina</h3>
              <p className="text-base mb-4">Descubre nuestros tutoriales en youtube para aprender nuevas técnicas y recetas.</p>
              <div className="aspect-w-16 aspect-h-9 mx-auto">
                <video controls className="w-full h-full">
                  <source src={video} type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
            </div>
            <Divider />
            <div className="text-center p-3 bg-white">
              <h3 className="text-2xl font-bold mb-4">Opiniones de Usuarios</h3>
              <p className="text-base mb-6">Algunas valoraciones de nuestros usuarios sobre la web y sus funcionalidades.</p>
              <div className="flex flex-col lg:flex-row justify-center lg:space-x-20">
                <div className="flex flex-col items-center mb-4 lg:mb-0">
                  <FaThumbsUp size={20} className='text-green-500' />
                  <p className="text-sm mt-2">He utilizado esta aplicación desde que mi madre me la recomendó y me parece brutal lo fácil que es utilizarla y la cantidad de recetas que hay.</p>
                  <p className='font-bold text-sm mt-1'>pepeluis</p>
                </div>
                <div className="flex flex-col items-center mb-4 lg:mb-0">
                  <FaThumbsUp size={20} className='text-green-500' />
                  <p className="text-sm mt-2">Me encanta utilizar AjoySal para cocinar a diario.</p>
                  <p className='font-bold text-sm mt-1'>Joselito125</p>
                </div>
                <div className="flex flex-col items-center">
                  <FaThumbsUp size={20} className='text-green-500' />
                  <p className="text-sm mt-2">La cantidad de recetas que hay de todo el mundo me parece espectacular, recomiendo y recomendaré siempre esta web.</p>
                  <p className='font-bold text-sm mt-1'>CarmillaPuertas</p>
                </div>
              </div>
            </div>
            <Divider />
            <Fundators />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
