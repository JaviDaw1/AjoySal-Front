import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaExclamationCircle, FaArrowLeft } from 'react-icons/fa';
import OpinionsService from '../services/OpinionsService';
import Header from '../components/Header';
import Footer from '../components/Footer';

const opinionsService = new OpinionsService();

const EditOpinion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opinion, setOpinion] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedRecipe, setEditedRecipe] = useState('');
  const [editedUser, setEditedUser] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchOpinion = async () => {
      try {
        const opinionData = await opinionsService.getOpinionById(id);
        setOpinion(opinionData);
        setEditedTitle(opinionData.title);
        setEditedContent(opinionData.content);
        setEditedRecipe(opinionData.recipe);
        setEditedUser(opinionData.user);
      } catch (error) {
        console.error('Error fetching opinion:', error);
      }
    };
    fetchOpinion();
  }, [id]);

  const handleSaveOpinion = async () => {
    try {
      const updatedOpinion = {
        title: editedTitle,
        content: editedContent,
        recipe: editedRecipe,
        user: editedUser
      };
      await opinionsService.updateOpinion(opinion.id, updatedOpinion);
      console.log(id);
      navigate(`/recipe/${opinion.recipe.id}?sourcePage=recipeclient`);
    } catch (error) {
      console.error('Error updating opinion:', error);
      setErrorMessage('Error al actualizar la opinión. Inténtalo de nuevo más tarde.');
    }
  };

  const handleCancel = () => {
    navigate(`/recipe/${opinion.recipe.id}?sourcePage=recipeclient`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className='ml-4 mt-4'>
        <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700 flex items-center transition-all duration-200 ease-in-out">
          <FaArrowLeft className="mr-2" />
          Volver atrás
        </button>
      </div>
      <div className="flex-grow p-6 w-full mx-auto shadow-lg bg-white rounded-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Editar Opinión</h1>
        {opinion && (
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <input
              type="text"
              className="border border-gray-300 rounded-md px-2 py-1 w-full mb-2"
              placeholder="Título"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              className="border border-gray-300 rounded-md px-2 py-1 w-full mb-2"
              rows="4"
              placeholder="Contenido"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            ></textarea>
            <div className='flex flex-col items-center'>
              <button
                className="bg-blue-600 hover:bg-blue-500 transition-all duration-200 ease-in-out text-white px-4 py-2 rounded-md"
                onClick={handleSaveOpinion}
              >
                Guardar
              </button>
            </div>
            {errorMessage && (
              <div className="mt-4 flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
                <FaExclamationCircle className="mr-2" />
                {errorMessage}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EditOpinion;

