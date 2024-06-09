import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import Fundators from '../components/Fundators';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto p-4 flex-grow">
        <section>
          <div className="text-center p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Bienvenido a AjoySal</h2>
            <p>Publica y encuentra las mejores recetas de todo el mundo.</p>
          </div>
          <hr />
          <div className="text-center p-4 bg-white shadow-md rounded-md">
            <Carousel /> {/* Añade el componente Carousel aquí */}
          </div>
          <hr />
          <div className="text-center p-4 bg-white shadow-md rounded-md">
            <Fundators />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
