import fundador1 from '../images/fundador1.jpg';
import fundador2 from '../images/fundador2.jpg';

const people = [
  {
    name: 'Alejandro Delgado',
    role: 'Co-Founder / AjoySal',
    imageUrl: fundador1 // Solo pasa la variable de la imagen, no la envuelvas entre llaves
  },
  {
    name: 'Javier Martínez',
    role: 'Co-Founder / AjoySal',
    imageUrl: fundador2 // Lo mismo aquí, solo pasa la variable de la imagen
  }
];

export default function Fundators() {
  return (
    <div className="bg-white py-24 sm:py-32 flex justify-center items-center">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper
            suspendisse.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person, index) => (
            <li key={person.name} className="mt-6"> {/* Añade margen superior uniforme a todos los elementos */}
              <div className="flex items-center gap-x-6">
                <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
