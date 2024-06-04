import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import Header from '../components/Header';
import Footer from '../components/Footer';

const authService = new AuthService();

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const userInfo = authService.getUserInfo();
            console.log(userInfo);
            setUser(userInfo);
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        authService.logout();
        navigate('/');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 items-center justify-center py-8">
                <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg mx-4">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mi Perfil</h2>
                    {user ? (
                        <div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre: <span className="text-gray-900"> {user.user.firstname}</span>
                                </label>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Apellido: <span className="text-gray-900"> {user.user.lastname}</span>
                                </label>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre de usuario: <span className="text-gray-900"> {user.user.username}</span>
                                </label>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Correo Electrónico: <span className="text-gray-900"> {user.user.email}</span>
                                </label>
                            </div>
                            <hr className='my-5'></hr>
                            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 transition-all duration-200 text-white font-semibold py-2 px-4 rounded">
                                Cerrar sesión
                            </button>
                        </div>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
