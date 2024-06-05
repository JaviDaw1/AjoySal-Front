// eslint-disable-next-line no-unused-vars
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
 
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto p-4 flex-grow">
        <section className="mb-8">
          <div className="text-center p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Bienvenido a AjoySal</h2>
            <p>Publica y encuentra las mejores recetas de todo el mundo.</p>
          </div>
        </section>

        <section className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white shadow-md rounded-md">Destacado 1</div>
            <div className="p-4 bg-white shadow-md rounded-md">Destacado 2</div>
            <div className="p-4 bg-white shadow-md rounded-md">Destacado 3</div>
          </div>
        </section>

        <section className="mb-8">
          <div className="p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Testimonios</h2>
            <div className="mb-4">Testimonio 1</div>
            <div className="mb-4">Testimonio 2</div>
            <div>Testimonio 3</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}