import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Divider from '../components/Divider';

const authService = new AuthService();

const Contact = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [lastSubmit, setLastSubmit] = useState(null);
  const [isMessageDisabled, setIsMessageDisabled] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false); // Estado para deshabilitar el botón de enviar
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

        // Obtener el último envío específico para este usuario desde localStorage
        const userLastSubmit = localStorage.getItem(`lastSubmit_${userInfo.user.username}_contact`);
        if (userLastSubmit) {
          const lastSubmitDate = new Date(userLastSubmit);
          setLastSubmit(lastSubmitDate);

          // Bloquear el campo de mensaje si el último envío fue hace menos de 2 días
          const now = new Date();
          if ((now - lastSubmitDate) < 2 * 24 * 60 * 60 * 1000) {
            setIsMessageDisabled(true);
            setIsSubmitDisabled(true); // Bloquear el botón de enviar
            setErrorMessage('No envíes más de 5 mensajes en la semana o su cuenta será bloqueada');
          }
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (lastSubmit) {
      const now = new Date();
      const timeDifference = now - lastSubmit;

      if (timeDifference >= 2 * 24 * 60 * 60 * 1000) {
        setIsMessageDisabled(false);
        setIsSubmitDisabled(false); // Desbloquear el botón de enviar
        setErrorMessage('');
      } else {
        setTimeout(() => {
          setIsMessageDisabled(false);
          setIsSubmitDisabled(false); // Desbloquear el botón de enviar
          setErrorMessage('');
        }, 2 * 24 * 60 * 60 * 1000 - timeDifference);
      }
    }
  }, [lastSubmit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const now = new Date();
    if (isMessageDisabled) {
      return;
    }

    console.log('Formulario enviado:', formData);

    // Limpiar el formulario
    setFormData({
      username: user.username,
      email: user.email,
      message: ''
    });

    // Mostrar mensaje de confirmación
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 5000);

    // Bloquear el campo de mensaje y mostrar mensaje de error
    setIsMessageDisabled(true);
    setIsSubmitDisabled(true); // Bloquear el botón de enviar
    setErrorMessage('No envies más de 5 mensajes en la semana o su cuenta será restringida');

    // Actualizar la fecha del último envío específico para este usuario en localStorage
    const newLastSubmit = new Date();
    setLastSubmit(newLastSubmit);
    localStorage.setItem(`lastSubmit_${user.username}_contact`, newLastSubmit.toISOString());

    // Desbloquear el botón de enviar después de 2 días
    setTimeout(() => {
      setIsMessageDisabled(false);
      setIsSubmitDisabled(false);
      setErrorMessage('');
    }, 2 * 24 * 60 * 60 * 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 items-center justify-center py-4">
        <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg mx-4 relative">
          <h2 className="text-2xl font-bold mb-6">Contáctanos</h2>
          {showConfirmation && (
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-700 p-4 rounded shadow-lg">
              ¡OK! ¡El mensaje ha sido enviado correctamente!
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
              <input
                type="text"
                id="username"
                name="username"
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
                disabled={isMessageDisabled}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows="4"
                required
              ></textarea>
              {errorMessage && (
                <div className="text-red-500 text-sm mt-2">
                  {errorMessage}
                </div>
              )}
            </div>
            <Divider />
            <div className="mb-4">
              <button
                type="submit"
                className={`w-full bg-blue-600 text-white p-2 rounded-md shadow-sm transition-all duration-200 ease-in-out hover:bg-blue-500 ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitDisabled}
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
