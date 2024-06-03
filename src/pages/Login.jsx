// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import logoImage from '../images/logo.jpg';
import { FaExclamationCircle } from 'react-icons/fa';

const authService = new AuthService();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    if (state && state.message) {
      setErrorMessage(state.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }, [state]);

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Formato de email no válido';
    }

    if (!password) {
      errors.password = 'La contraseña es requerida';
    }

    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await authService.login(email, password);
      console.log(response);
      localStorage.setItem('user', JSON.stringify({ user: response.user }));
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      setErrors({ authError: 'Email o contraseña incorrectos' });
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Link to={"/"}>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-16 w-16" src={logoImage} />
        </div>
      </Link>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Correo electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.email ? 'ring-red-500' : 'ring-gray-300'}`}
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Contraseña
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.password ? 'ring-red-500' : 'ring-gray-300'}`}
                />
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              </div>
            </div>
            {errors.authError && <p className="mt-2 text-sm text-red-600">{errors.authError}</p>}
            <hr></hr>
            <div className='mt-4'>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar Sesión
              </button>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">¿No tienes una cuenta? <button type="button" onClick={handleSignup} className="text-blue-600">Regístrate aquí</button></p>
            </div>
          </form>
          {errorMessage && (
            <div className="mt-4 flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
              <FaExclamationCircle className="mr-2" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
