// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/authService';
import Divider from '../components/Divider'
import logoImage from '../images/logo.jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const authService = new AuthService();

export default function Signup() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!firstname) newErrors.firstname = 'Nombre necesario';
    if (!lastname) newErrors.lastname = 'Apellidos necesarios';
    if (!username) newErrors.username = 'Nombre de usuario necesario';
    if (!email) {
      newErrors.email = 'Correo electrónico necesario';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Formato inválido';
    }
    if (!password) {
      newErrors.password = 'Contraseña necesaria';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña necesita al menos 6 caracteres';
    }
    return newErrors;
  };

  const handleSignup = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const signupData = {
      firstname,
      lastname,
      username,
      email,
      password
    };
    try {
      await authService.signup(signupData);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const clearError = (fieldName) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: undefined,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Link to="/">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-16 w-16" src={logoImage} alt="Your Company" />
        </div>
      </Link>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre
              </label>
              <div className="mt-2">
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  autoComplete="given-name"
                  value={firstname}
                  onChange={(e) => { setFirstName(e.target.value); clearError('firstname'); }}
                  onBlur={() => { if (!firstname) setErrors((prevErrors) => ({ ...prevErrors, firstname: 'Nombre necesario' })); }}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.firstname ? 'ring-red-500' : 'ring-gray-300'}`}
                />
                {errors.firstname && <p className="mt-2 text-sm text-red-600">{errors.firstname}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                Apellidos
              </label>
              <div className="mt-2">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  autoComplete="family-name"
                  value={lastname}
                  onChange={(e) => { setLastName(e.target.value); clearError('lastname'); }}
                  onBlur={() => { if (!lastname) setErrors((prevErrors) => ({ ...prevErrors, lastname: 'Apellidos necesarios' })); }}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.lastname ? 'ring-red-500' : 'ring-gray-300'}`}
                />
                {errors.lastname && <p className="mt-2 text-sm text-red-600">{errors.lastname}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre de usuario
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); clearError('username'); }}
                  onBlur={() => { if (!username) setErrors((prevErrors) => ({ ...prevErrors, username: 'Nombre de usuario necesario' })); }}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.username ? 'ring-red-500' : 'ring-gray-300'}`}
                />
                {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username}</p>}
              </div>
            </div>
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
                  onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
                  onBlur={() => { if (!email) setErrors((prevErrors) => ({ ...prevErrors, email: 'Correo electrónico necesario' })); }}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.email ? 'ring-red-500' : 'ring-gray-300'}`}
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Contraseña
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError('password'); }}
                  onBlur={() => { if (!password) setErrors((prevErrors) => ({ ...prevErrors, password: 'Contraseña necesaria' })); }}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${errors.password ? 'ring-red-500' : 'ring-gray-300'}`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={toggleShowPassword}>
                  {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                </div>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>
            <Divider />
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition-all ease-in-out duration-200 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrarte
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-center text-gray-500">
            ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 hover:text-blue-500 transition-all ease-in-out duration-200">Inicia sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

