// eslint-disable-next-line no-unused-vars
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carrousel from '../components/Carrousel';

function HomePage() {
  return (
    <div>
      <Header />
      <div className="min-h-screen"> {/* Establece una altura mínima para el contenido */}
        <Carrousel />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-shrink-0">
                    <img className="mx-auto h-12 w-12 rounded-full" src="https://via.placeholder.com/150" alt="" />
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Título de la imagen 1</h3>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Descripción de la imagen 1.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-shrink-0">
                    <img className="mx-auto h-12 w-12 rounded-full" src="https://via.placeholder.com/150" alt="" />
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Título de la imagen 2</h3>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Descripción de la imagen 2.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <Footer />
    </div>
  );
}

export default HomePage;
