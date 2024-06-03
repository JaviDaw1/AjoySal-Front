// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import AuthService from '../services/AuthService';
import logoImage from '../images/logo.jpg';
import { FaUserCircle } from 'react-icons/fa';

const authService = new AuthService();

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
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const adminStatus = await AuthService.isUserAdmin();
      setIsAdmin(adminStatus);

      const userInfo = authService.getUserInfo();
      setUser(userInfo);
    };
    fetchData();
  }, []);

  const links = isAdmin ? adminLinks : clientLinks;

  const handleLogout = () => {
    authService.logout();
    setUser(null);
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

  return (
    <header className="bg-yellow-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-20 w-20" src={logoImage} alt="Your Company Logo" />
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
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {link.name}
              </Link>
            )
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
          {user ? (
            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="-m-1.5 p-1.5 focus:outline-none"
              >
                <FaUserCircle className="text-gray-900 mt-2" />
              </button>
              {dropdownOpen && (
                <div className="absolute bg-white mt-2 py-2 w-48 rounded-md shadow-lg z-10 right-0 mr-3">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Mi Perfil
                  </Link>
                  <Link to="/uploadedrecipes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Recetas Subidas
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
              Inicia Sesión<span aria-hidden="true">&rarr;</span>
            </Link>
          )}
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
                {links.map((link) => (
                  link.name === 'Subir Receta' ? (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={handlePostRecipeClick}
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {link.name}
                    </Link>
                  )
                ))}
                {user && (
                  <>
                    <Link
                      to="/profile"
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Mi Perfil
                    </Link>
                    <Link
                      to="/uploadedrecipes"
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Recetas Subidas
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50 w-full text-left"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
              {!user && (
                <div className="py-6">
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Inicia Ses
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 overflow-hidden">
          <span className="text-2xl font-semibold text-gray-900">Loading...</span>
        </div>
      )}
    </header>
  );
}

export default Header;

