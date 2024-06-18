import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Divider from '../components/Divider';

const authService = new AuthService();

const Contact = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: ''
  });
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = authService.getUserInfo();
      setUser(userInfo);
      if (userInfo) {
        setFormData({
          ...formData,
          username: userInfo.user.username,
          email: userInfo.user.email
        });
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message') {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 items-center justify-center py-4">
        <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg mx-4">
          <h2 className="text-2xl font-bold mb-6">Contáctanos</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.username}
                readOnly
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                readOnly
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows="4"
                required
              ></textarea>
            </div>
            <Divider />
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md shadow-sm transition-all duration-200 ease-in-out hover:bg-blue-500"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
