// eslint-disable-next-line no-unused-vars
import React from 'react'
import Header from '../components/Header'

function AboutUs() {
  return (
    <div>
      <Header />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">¡Conócenos!</h1>
            <p className="text-lg mb-4">
              Aquí puedes escribir una descripción de tu negocio. Puedes incluir información sobre tu historia,
              filosofía, valores, etc.
            </p>
            <p className="text-lg mb-4">
              Además, puedes añadir una imagen aquí a la derecha del texto.
            </p>
          </div>
          <div>
            <img src="/ruta/de/la/imagen.jpg" alt="Descripción de la imagen" className="w-full h-auto" />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Detalles del Negocio</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img src="/ruta/de/la/imagen_grande.jpg" alt="Descripción de la imagen grande" className="w-full h-auto" />
            </div>
            <div>
              <p className="text-lg mb-4">Aquí puedes agregar información como número de teléfono, dirección, horario de atención, etc.</p>
              <p className="text-lg mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sagittis quam et purus luctus, vitae dictum odio aliquet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
