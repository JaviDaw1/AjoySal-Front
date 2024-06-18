import founder1 from '../images/fundador1.jpg';
import founder2 from '../images/fundador2.jpg';

const founder = [
  {
    name: 'Alejandro Delgado',
    role: 'CEO AjoySal',
    image: founder1,
  },
  {
    name: 'Javier Martínez',
    role: 'CEO AjoySal',
    image: founder2,
  }
];

export default function Fundators() {
  return (
    <div className="bg-white py-12 sm:py-16 flex justify-center items-center">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-10 px-6 lg:px-4 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">AjoySal - Fundadores</h2>
          <p className="mt-5">
            Alejandro Delgado y Javier Martínez creadores de AjoySal.
          </p>
          <p className="mt-2">
            Un lugar para buscar algo distinto, rico, exótico...Aqui no tendras problemas para encontrar el plato que necesites.
          </p>
        </div>
        <ul role="list" className="grid gap-x-4 gap-y-6 sm:grid-cols-2 sm:gap-y-8 xl:col-span-2">
          {founder.map((founder, index) => (
            <li key={index} className="mt-6">
              <div className="flex items-center gap-x-6">
                <img className="h-16 w-16 rounded-full" src={founder.image} alt="" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{founder.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{founder.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
