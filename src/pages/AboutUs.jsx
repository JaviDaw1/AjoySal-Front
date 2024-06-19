// eslint-disable-next-line no-unused-vars
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow my-4">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">AjoySal</h1>
              <p className="text-base sm:text-lg mb-2 sm:mb-4">
                AjoySal es tu web de búsqueda de recetas alrededor del mundo. ¿Quieres probar algún plato italiano? ¿un plato indio? pues descubre todas las recetas disponibles en la web.
              </p>
              <p className="text-base sm:text-lg mb-2 sm:mb-4">
                Mucha gente pregunta por el nombre de la empresa <strong>AjoySal</strong>, pues su nombre proviene del famoso dicho español ajo y agua. Este gracioso nombre fue genialidad de los dos creadores
                de esta web. Fue en 2022 cuando dos compañeros de clase Alejandro Delgado Sobreviela y Javier Martínez Salgado decidieron emprenderse en un nuevo proyecto. Estuvieron estancados durante mucho tiempo
                pensando que podrían crear y llegaron a un mismo punto, ¿Qué es lo que más feliz hace a las personas?... ¡LA COMIDA!
              </p>
              <div className="grid grid-cols-1 justify-center md:grid-cols-2 gap-4 my-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center mb-4">Información de Contacto</h3>
                  <p className="text-base flex items-center"><FaPhone className="mr-2"/> Teléfono: +34 123 456 789</p>
                  <p className="text-base flex items-center"><FaEnvelope className="mr-2"/> Email: info@ajoysal.com</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold flex items-center mb-4">Dirección</h3>
                  <p className="text-base flex items-center"><FaMapMarkerAlt className="mr-2"/> Calle de Embajadores, 123</p>
                  <p className="text-base">28080, Madrid, España</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold flex items-center mb-4">Horario de Atención</h3>
                  <p className="text-base flex items-center"><FaClock className="mr-2"/> Lunes a Viernes: 9:00 - 18:00</p>
                  <p className="text-base flex items-center"><FaClock className="mr-2"/> Sábados: 10:00 - 14:00</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold flex items-center mb-4">Redes Sociales</h3>
                  <p className="text-base flex items-center"><FaFacebook className="mr-2"/> Facebook: /ajoysal</p>
                  <p className="text-base flex items-center"><FaTwitter className="mr-2"/> Twitter: @ajoysal</p>
                  <p className="text-base flex items-center"><FaInstagram className="mr-2"/> Instagram: @ajoysal</p>
                </div>
              </div>
              <div>
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6083.750133273202!2d-3.7236987979677525!3d40.32293017665278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1718816739506!5m2!1ses!2ses" 
                className="w-full" height={600} allowfullscreen="" loading="lazy"></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AboutUs;
