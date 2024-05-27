import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import AuthService from '../services/AuthService'; // Importa AuthService
import logoImage from '../images/logo.jpg';

const adminLinks = [
  { name: 'Recetas', href: '/recipeadmin' },
  { name: 'Subir Receta', href: '/postrecipe' },
  { name: 'Conócenos', href: '/aboutus' },
  { name: 'Contacto', href: '/contact' },
];

const clientLinks = [
  { name: 'Recetas', href: '/recipeclient' },
  { name: 'Subir Receta', href: '/postrecipe' },
  { name: 'Conócenos', href: '/aboutus' },
  { name: 'Contacto', href: '/contact' },
];

function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Obtener el estado de administrador
    const checkAdminStatus = async () => {
      const adminStatus = await AuthService.isUserAdmin();
      setIsAdmin(adminStatus);
    };
    checkAdminStatus();
  }, []);

  return (
    <header className="bg-yellow-100 border border-black">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-20 w-20" src={logoImage} alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                  Recetas
                </Disclosure.Button>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Disclosure.Panel className="mt-2 space-y-2">
                    {isAdmin ? (
                      adminLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.href}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          {link.name}
                        </Link>
                      ))
                    ) : (
                      clientLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.href}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          {link.name}
                        </Link>
                      ))
                    )}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
            Inicia Sesión<span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Recetas
                      </Disclosure.Button>
                      <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {isAdmin ? (
                            adminLinks.map((link) => (
                              <Link
                                key={link.name}
                                to={link.href}
                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                {link.name}
                              </Link>
                            ))
                          ) : (
                            clientLinks.map((link) => (
                              <Link
                                key={link.name}
                                to={link.href}
                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                {link.name}
                              </Link>
                            ))
                          )}
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
                <Link
                  to="/postrecipe"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Subir Recetas
                </Link>
                <Link
                  to="/aboutus"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Conócenos
                </Link>
                <Link
                  to="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contacto
                </Link>
              </div>
              <div className="py-6">
                <Link
                  to="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Inicia Sesión
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default Header;
