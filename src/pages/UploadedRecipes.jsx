// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPencilAlt, FaTrash, FaCheckCircle } from 'react-icons/fa';
import AuthService from '../services/AuthService';
import RecipeService from '../services/RecipeService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Divider from '../components/Divider';
import Modal from '../components/Modal';

const authService = new AuthService();
const recipeService = new RecipeService();

const UploadedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUploadedRecipes = async () => {
      try {
        const userInfo = authService.getUserInfo();
        if (userInfo && userInfo.user.id) {
          const response = await recipeService.getRecipesByUserId(userInfo.user.id);
          setRecipes(response);
        }
      } catch (error) {
        console.error('Error fetching uploaded recipes:', error);
      }
    };
    fetchUploadedRecipes();
  }, [deleteSuccess]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showModal]);

  const handleDelete = async () => {
    try {
      await recipeService.deleteRecipe(selectedRecipeId);
      setRecipes(recipes.filter(recipe => recipe.id !== selectedRecipeId));
      setDeleteSuccess(true);
      setTimeout(() => setDeleteSuccess(false), 3000);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    } finally {
      setShowModal(false);
      setSelectedRecipeId(null);
    }
  };

  const openModal = (id) => {
    setSelectedRecipeId(id);
    setShowModal(true);
  };

  const handleEdit = async (id) => {
    navigate(`/editrecipe/${id}?sourcePage=uploadedrecipes`);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecipeId(null);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className="relative flex-grow">
        {deleteSuccess && (
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 bg-green-200 bg-opacity-75 px-6 py-3 rounded-md shadow-md flex items-center z-50">
            <FaCheckCircle className="text-green-800 mr-2" />
            <p className="text-green-800 font-bold">OK! La receta se ha eliminado correctamente.</p>
          </div>
        )}
        <div className={`flex flex-wrap justify-center ${showModal ? 'opacity-50 pointer-events-none' : ''}`}>
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <div key={index} className="flex flex-col max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
                <div className="flex flex-col h-full border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-gray-500 hover:bg-gray-100 shadow hover:shadow-md hover:shadow-gray-200 ease-in-out transition-all duration-200">
                  <Link to={`/recipe/${recipe.id}?sourcePage=uploadedrecipes`} className="flex-grow">
                    <img src={recipe.image} alt={recipe.name} className="w-full rounded-none" />
                    <div className="p-4">
                      <h1 className="text-lg font-bold mb-2">{recipe.name}</h1>
                      <Divider className='my-4' />
                      <p className="text-sm text-gray-700 mb-2">{recipe.description}</p>
                      <p className="text-sm text-gray-700"><strong>Autor: </strong> {recipe.user.username}</p>
                    </div>
                  </Link>
                  <div className="p-4 flex justify-between mt-auto">
                    <button onClick={() => handleEdit(recipe.id)} className="text-blue-500 hover:text-blue-700 ease-in-out transition-all duration-200">
                      <FaPencilAlt />
                    </button>
                    <button onClick={() => openModal(recipe.id)} className="text-red-500 hover:text-red-700 ease-in-out transition-all duration-200">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-64 text-xl text-gray-600">
              <p className="text-2xl">No has subido ninguna receta aún.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <Modal
        show={showModal}
        onClose={closeModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default UploadedRecipes;
