// eslint-disable-next-line no-unused-vars
import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';
import logo from '../images/logo.jpg';
import AuthService from '../services/AuthService';
import Loading from './Loading';

const authService = new AuthService()

const Footer = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = authService.getUserInfo();
      setUser(userInfo);
    };
    fetchData();
  }, []);
  
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
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:flex items-center">
            <Link to="/" className="flex items-center space-x-1">
              <img src={logo} alt="Logo" className="w-1" />
              <span className="text-xl font-bold">AjoySal</span>
            </Link>
            <p className="mr-10 mt-4 md:mt-0 text-base">Descubre nuevas recetas y comparte las tuyas con la comunidad.</p>
          </div>
          <nav className="mt-4 md:mt-0">
            <div className="flex flex-row md:flex-row md:space-y-0 md:space-x-8">
              {/* Increased width for containers (adjust as needed) */}
              <div className="flex-grow-2 ml-16 p-2">
                <h3 className="text-lg font-bold mb-4">Explorar</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/recipeclient" className="hover:text-yellow-400 hover:underline">Recetas</Link>
                  </li>
                  <li>
                    <Link to="/postrecipe" onClick={handlePostRecipeClick} className="hover:text-yellow-400 hover:underline">Publicar Receta</Link>
                  </li>
                  <li>
                    <Link to="/contact" className="hover:text-yellow-400 hover:underline">Contacto o dudas</Link>
                  </li>
                </ul>
              </div>
              <div className="flex-grow-2 mr-20 p-2">
                <h3 className="text-lg font-bold mb-4">Términos</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/aboutus" className="hover:text-yellow-400 hover:underline">Términos</Link>
                  </li>
                  <li>
                    <Link to="/login" className="hover:text-yellow-400 hover:underline">Iniciar Sesión</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <hr className="my-6 border-gray-600" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-base">Síguenos en:</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="text-gray-300 hover:text-yellow-400 hover:underline lg:text-xl" aria-label="Twitter">
              <FaTwitter />
            </Link>
            <Link to="#" className="text-gray-300 hover:text-yellow-400 hover:underline lg:text-xl" aria-label="Instagram">
              <FaInstagram />
            </Link>
            <Link to="#" className="text-gray-300 hover:text-yellow-400 hover:underline lg:text-xl" aria-label="Facebook">
              <FaFacebook />
            </Link>
            <Link to="#" className="text-gray-300 hover:text-yellow-400 hover:underline lg:text-xl" aria-label="GitHub">
              <FaGithub />
            </Link>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-lg">&copy; {new Date().getFullYear()} AjoySal. Todos los derechos reservados.</p>
        </div>
      </div>
      {loading && <Loading />}
    </footer>
  );
};

export default Footer;