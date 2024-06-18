import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { FaUserCircle, FaUser, FaUpload, FaHeart } from 'react-icons/fa';
import logoImage from '../images/logo.jpg';
import Loading from '../components/Loading';
import Divider from './Divider';
import AuthService from '../services/AuthService';

const authService = new AuthService();

const links = [
  { name: 'Inicio', href: '/' },
  { name: 'Recetas', href: '/recipeclient' },
  { name: 'Subir Receta', href: '/postrecipe' },
  { name: 'Conócenos', href: '/aboutus' },
  { name: 'Contacto', href: '/contact' },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = authService.getUserInfo();
      setUser(userInfo);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/', { replace: true });
  };

  const handlePostRecipeClick = (e) => {
    e.preventDefault();
    if (!user) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/login', { replace: true, state: { message: 'Tienes que estar logueado para subir una receta' } });
      }, 2000);
    } else {
      navigate('/postrecipe');
    }
  };

  const handleRecipesClick = () => {
    if (user && user.user.role === "ADMIN") {
      navigate('/recipeadmin');
    } else {
      navigate('/recipeclient');
    }
  };

  return (
    <header className="bg-yellow-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img className="h-20 w-20" src={logoImage} alt="AjoySal Logo" />
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
          {links.map((link) => (
            link.name === 'Subir Receta' ? (
              <a
                key={link.name}
                href={link.href}
                onClick={handlePostRecipeClick}
                className="text-base font-semibold leading-6 text-gray-900"
              >
                {link.name}
              </a>
            ) : link.name === 'Recetas' ? (
              <button
                key={link.name}
                onClick={handleRecipesClick}
                className="text-base font-semibold leading-6 text-gray-900"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-base font-semibold leading-6 text-gray-900"
              >
                {link.name}
              </Link>
            )
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4 relative">
          {user ? (
            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="-m-1.5 p-1.5 focus:outline-none relative z-10"
              >
                <FaUserCircle className="text-gray-900 text-3xl mt-2" />
              </button>
              {dropdownOpen && (
                <div className="absolute bg-white mt-2 py-2 w-48 rounded-md shadow-lg z-20 right-0 top-14">
                  <Link to="/profile" className="flex flex-grow items-center px-4 py-2 text-sm text-gray-700 transition-all ease-in-out duration-200 hover:bg-gray-100">
                    <FaUser className="mr-2" /> Mi Perfil
                  </Link>
                  <Link to="/uploadedrecipes" className="flex flex-grow items-center px-4 py-2 text-sm text-gray-700 transition-all ease-in-out duration-200 hover:bg-gray-100">
                    <FaUpload className="mr-2" /> Recetas Subidas
                  </Link>
                  <Link to="/favoritesrecipes" className="flex flex-grow items-center px-4 py-2 text-sm text-gray-700 transition-all ease-in-out duration-200 hover:bg-gray-100">
                    <FaHeart className="mr-2" /> Recetas Favoritas
                  </Link>
                  <button onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }} className="flex flex-grow w-full text-left px-4 py-2 text-sm text-gray-700 transition-all ease-in-out duration-200 hover:bg-gray-100">
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-base font-semibold leading-6 text-gray-900">
              Inicia Sesión<span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>

      </nav>
      <Transition show={mobileMenuOpen} as={React.Fragment}>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
          <div className="fixed inset-0 z-10" />
          <Transition.Child
            as={React.Fragment}
            enter="transition ease-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6 ease-in-out transition-all duration-200">
                    {links.map((link) => (
                      link.name === 'Subir Receta' ? (
                        <a
                          key={link.name}
                          href={link.href}
                          onClick={handlePostRecipeClick}
                          className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 text-gray-900 transition-all ease-in-out duration-200 hover:bg-gray-50"
                        >
                          {link.name}
                        </a>
                      ) : link.name === 'Recetas' ? (
                        <Link
                          key={link.name}
                          to={'/recipeclient'}
                          onClick={handleRecipesClick}
                          className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 text-gray-900 transition-all ease-in-out duration-200 hover:bg-gray-50"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <Link
                          key={link.name}
                          to={link.href}
                          className="block rounded-lg py-2 pl-6 pr-3 text-base font-semibold leading-7 text-gray-900 transition-all ease-in-out duration-200 hover:bg-gray-50"
                        >
                          {link.name}
                        </Link>
                      )
                    ))}
                    {user && (
                      <div>
                        <Divider className='my-4' />
                        <Link
                          to="/profile"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 transition-all ease-in-out duration-200 hover:bg-gray-50"
                        >
                          Mi Perfil
                        </Link>
                        <Link
                          to="/uploadedrecipes"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 transition-all ease-in-out duration-200 hover:bg-gray-50"
                        >
                          Recetas Subidas
                        </Link>
                        <Link
                          to="/favoritesrecipes"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 transition-all ease-in-out duration-200 hover:bg-gray-50"
                        >
                          Recetas Favoritas
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 transition-all ease-in-out duration-200 hover:bg-gray-50"
                        >
                          Cerrar Sesión
                        </button>
                      </div>
                    )}
                  </div>
                  {!user && (
                    <div className="py-6">
                      <Link
                        to="/login"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 transition-all ease-in-out duration-200 hover:bg-gray-50"
                      >
                        Inicia Sesión
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
      {loading && <Loading />}
    </header>
  );
}

export default Header;
