// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer'
import RecipeService from '../services/RecipeService';

const recipeService = new RecipeService();

export default function PostRecipe() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [recipeData, setRecipeData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    nationality: '',
    difficulty: '',
    description: '',
    image: null,
    user: storedUser ? storedUser.user : null,
  });

  if (!storedUser) {
    return <Navigate to="/login" replace state={{ message: 'Tienes que estar logueado para subir una receta' }} />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setRecipeData({
      ...recipeData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in recipeData) {
      formData.append(key, recipeData[key]);
    }
    try {
      await recipeService.postRecipe(formData);
      window.location.href = '/recipes';
    } catch (error) {
      console.error('Error al subir la receta:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <h1 className="text-3xl font-semibold mb-8 text-center text-gray-900">Subir Receta</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="ml-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-1 text-gray-700">Nombre de la receta</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={recipeData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="nationality" className="block text-sm font-semibold mb-1 text-gray-700">Nacionalidad de la receta</label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={recipeData.nationality}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="difficulty" className="block text-sm font-semibold mb-1 text-gray-700">Dificultad</label>
                <div className="relative">
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={recipeData.difficulty}
                    onChange={handleInputChange}
                    className="appearance-none w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    required
                  >
                    <option value="" disabled className=''>Dificultad de la Receta</option>
                    <option value="Fácil">Fácil</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Difícil">Difícil</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-semibold mb-1 text-gray-700">Imagen</label>
                <div className="flex items-center">
                  <label className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Seleccionar archivo
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {recipeData.image && (
                    <span className="ml-3 text-sm text-gray-600">{recipeData.image.name}</span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="ingredients" className="block text-sm font-semibold mb-1 text-gray-700">Ingredientes</label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={recipeData.ingredients}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="instructions" className="block text-sm font-semibold mb-1 text-gray-700">Instrucciones</label>
              <textarea
                id="instructions"
                name="instructions"
                value={recipeData.instructions}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-semibold mb-1 text-gray-700">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={recipeData.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Subir Receta
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
