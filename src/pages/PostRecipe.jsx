// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeService from '../services/RecipeService';

const recipeService = new RecipeService();

export default function PostRecipe() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [recipeData, setRecipeData] = useState({
    name: '',
    instructions: '',
    nationality: '',
    difficulty: '',
    favorites: false,
    description: '',
    imageUrl: '',
    user: storedUser ? storedUser.user : null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToPost = { ...recipeData, favorites: false };
      await recipeService.postRecipe(dataToPost);
      window.location.href = '/uploadedrecipes';
    } catch (error) {
      console.error('Error al subir la receta:', error);
    }
  };

  if (!storedUser) {
    return <Navigate to="/login" replace state={{ message: 'Tienes que estar logueado para subir una receta' }} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <h1 className="text-3xl font-semibold mb-8 text-center text-gray-900">Subir Receta</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <select
                  id="difficulty"
                  name="difficulty"
                  value={recipeData.difficulty}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                  required
                >
                  <option value="" disabled>Dificultad de la Receta</option>
                  <option value="Fácil">Fácil</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Difícil">Difícil</option>
                </select>
              </div>
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-semibold mb-1 text-gray-700">URL de la Imagen</label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={recipeData.imageUrl}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="instructions" className="block text-sm font-semibold mb-1 text-gray-700">Instrucciones</label>
              <textarea
                id="instructions"
                name="instructions"
                value={recipeData.instructions}
                onChange={handleInputChange}
                className="w-full h-32 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
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
                className="w-full h-32 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
            {/* Ocultar campo de favoritos para que no sea editable */}
            <input type="hidden" name="favorites" value={recipeData.favorites} />
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md transition-all ease-in-out duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
