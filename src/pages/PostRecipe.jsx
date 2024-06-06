// eslint-disable-next-line no-unused-varsimport React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeService from '../services/RecipeService';

const recipeService = new RecipeService();

export default function PostRecipe() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [recipeData, setRecipeData] = useState({
    name: '',
    description: '',
    ingredients: '',
    instructions: '',
    time: '',
    servings: '',
    nationality: '',
    difficulty: '',
    favorites: false,
    image: '',
    user: storedUser ? storedUser.user : null,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const dataToPost = { ...recipeData, favorites: false };
        await recipeService.postRecipe(dataToPost);
        window.location.href = '/uploadedrecipes';
      } catch (error) {
        console.error('Error al subir la receta:', error);
      }
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!recipeData.name) {
      errors.name = 'El nombre de la receta es requerido';
    }
    if (!recipeData.ingredients) {
      errors.ingredients = 'Los ingredientes son requeridos';
    }if (!recipeData.instructions) {
      errors.instructions = 'Las instrucciones son requeridas';
    }    
    if (!recipeData.time || isNaN(recipeData.time)) {
      errors.time = 'El tiempo debe ser un número válido';
    }
    if (!recipeData.servings || isNaN(recipeData.servings)) {
      errors.servings = 'El número de porciones debe ser un número válido';
    }
    if (!recipeData.nationality) {
      errors.nationality = 'La nacionalidad de la receta es requerida';
    }
    if (!recipeData.difficulty) {
      errors.difficulty = 'La dificultad de la receta es requerida';
    }
    if (!recipeData.image) {
      errors.image = 'La URL de la imagen es requerida';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
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
                  className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Ejemplo: Ensalada César"
                  required
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="nationality" className="block text-sm font-semibold mb-1 text-gray-700">Nacionalidad de la receta</label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={recipeData.nationality}
                  onChange={handleInputChange}
                  className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm ${errors.nationality ? 'border-red-500' : ''}`}
                  placeholder="Ejemplo: Italiana"
                  required
                />
                {errors.nationality && <p className="text-sm text-red-500">{errors.nationality}</p>}
              </div>
              <div>
                <label htmlFor="difficulty" className="block text-sm font-semibold mb-1 text-gray-700">Dificultad</label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={recipeData.difficulty}
                  onChange={handleInputChange}
                  className={`w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm ${errors.difficulty ? 'border-red-500' : ''}`}
                  required
                >
                  <option value="" disabled>Selecciona la dificultad</option>
                  <option value="Fácil">Fácil</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Difícil">Difícil</option>
                </select>
                {errors.difficulty && <p className="text-sm text-red-500">{errors.difficulty}</p>}
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-semibold mb-1 text-gray-700">URL de la Imagen (Ejemplo: https://ejemplo.com/imagen.jpg)</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={recipeData.image}
                  onChange={handleInputChange}
                  className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm ${errors.image ? 'border-red-500' : ''}`}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  required
                />
                {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="instructions" className="block text-sm font-semibold mb-1 text-gray-700">Instrucciones</label>
              <textarea
                id="instructions"
                name="instructions"
                value={recipeData.instructions}
                onChange={handleInputChange}
                placeholder="Ejemplo: Paso 1: Lava los ingredientes. Paso 2: Corta las verduras."
                className={`w-full h-32 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm ${errors.instructions ? 'border-red-500' : ''}`}
                required
              />
              {errors.instructions && <p className="text-sm text-red-500">{errors.instructions}</p>}
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-semibold mb-1 text-gray-700">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={recipeData.description}
                onChange={handleInputChange}
                className="w-full h-32 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                placeholder="Ejemplo: Esta es una deliciosa ensalada César perfecta para cualquier ocasión."
              />
            </div>
            <div>
              <label htmlFor="ingredients" className="block text-sm font-semibold mb-1 text-gray-700">Ingredientes</label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={recipeData.ingredients}
                onChange={handleInputChange}
                className={`w-full h-32 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm ${errors.ingredients ? 'border-red-500' : ''}`}
                placeholder="Ejemplo: Lechuga, Pollo, Queso parmesano, Aderezo César"
                required
              />
              {errors.ingredients && <p className="text-sm text-red-500">{errors.ingredients}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="time" className="block text-sm font-semibold mb-1 text-gray-700">Tiempo (en minutos)</label>
                <input
                  type="number"
                  id="time"
                  name="time"
                  value={recipeData.time}
                  onChange={handleInputChange}
                  className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm ${errors.time ? 'border-red-500' : ''}`}
                  placeholder="Ejemplo: 30"
                  required
                />
                {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
              </div>
              <div>
                <label htmlFor="servings" className="block text-sm font-semibold mb-1 text-gray-700">Porciones</label>
                <input
                  type="number"
                  id="servings"
                  name="servings"
                  value={recipeData.servings}
                  onChange={handleInputChange}
                  className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm ${errors.servings ? 'border-red-500' : ''}`}
                  placeholder="Ejemplo: 4"
                  required
                />
                {errors.servings && <p className="text-sm text-red-500">{errors.servings}</p>}
              </div>
            </div>
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

