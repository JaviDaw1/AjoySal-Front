// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import RecipeService from '../services/RecipeService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaArrowLeft } from 'react-icons/fa';

const recipeService = new RecipeService();

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sourcePage = queryParams.get('sourcePage');
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    ingredients: '',
    instructions: '',
    time: '',
    servings: '',
    nationality: '',
    difficulty: ''
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const fetchedRecipe = await recipeService.findById(id);
        setRecipe(fetchedRecipe);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevRecipe => ({ ...prevRecipe, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recipeService.updateRecipe(id, recipe);
      navigate('/uploadedrecipes');
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const handleBack = () => {
    switch (sourcePage) {
      case 'uploadedrecipes':
        navigate('/uploadedrecipes');
        break;
      case 'recipeadmin':
        navigate('/recipeadmin');
        break;
      default:
        navigate('/defaultPage');
        break;
    }
  };
  

  return (
    <div className="overflow-x-hidden">
      <Header />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Editar Receta</h2>
          <button onClick={handleBack} className="text-gray-500 hover:text-gray-700 flex items-center">
            <FaArrowLeft className="mr-2" />
            Volver a recetas subidas
          </button>
        </div>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              value={recipe.name}
              onChange={handleChange}
              placeholder="Nombre"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Descripción</label>
            <textarea
              name="description"
              value={recipe.description}
              onChange={handleChange}
              placeholder="Descripción"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingredients">Ingredientes</label>
            <textarea
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleChange}
              placeholder="Ingredientes"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructions">Instrucciones</label>
            <textarea
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              placeholder="Instrucciones"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col col-span-1 sm:col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">Tiempo</label>
              <input
                type="text"
                name="time"
                value={recipe.time}
                onChange={handleChange}
                placeholder="Tiempo"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex flex-col col-span-1 sm:col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="servings">Porciones</label>
              <input
                type="text"
                name="servings"
                value={recipe.servings}
                onChange={handleChange}
                placeholder="Porciones"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex flex-col col-span-1 sm:col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nationality">Nacionalidad</label>
              <input
                type="text"
                name="nationality"
                value={recipe.nationality}
                onChange={handleChange}
                placeholder="Nacionalidad"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex flex-col col-span-1 sm:col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="difficulty">Dificultad</label>
              <input
                type="text"
                name="difficulty"
                value={recipe.difficulty}
                onChange={handleChange}
                placeholder="Dificultad"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditRecipe;
