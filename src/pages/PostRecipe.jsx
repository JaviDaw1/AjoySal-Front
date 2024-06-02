// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Header from '../components/Header'; // Importa el componente Header
import RecipeService from '../services/RecipeService';

const recipeService = new RecipeService();

function SubirReceta() {
  const [recipeData, setRecipeData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    nationality: '',
    difficulty: '',
    description: '', // Puede ser nullable
    image: '', // Puedes agregar este campo si necesitas subir una imagen
    // Puedes agregar más campos según sea necesario
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recipeService.postRecipe(recipeData);
      // Redirigir a la página de recetas después de subir la receta
      window.location.href = '/recipes';
    } catch (error) {
      console.error('Error al subir la receta:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen"> {/* Contenedor principal */}
      <Header /> {/* Encabezado */}
      <div className="flex-1 container mx-auto py-8"> {/* Contenedor del contenido */}
        <h1 className="text-3xl font-semibold mb-4">Subir Receta</h1>
        <form onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-1">Nombre de la receta</label>
            <input type="text" id="name" name="name" value={recipeData.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2" required />
          </div>
          <div className="mb-4">
            <label htmlFor="ingredients" className="block text-sm font-semibold mb-1">Ingredientes</label>
            <textarea id="ingredients" name="ingredients" value={recipeData.ingredients} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2" required />
          </div>
          <div className="mb-4">
            <label htmlFor="instructions" className="block text-sm font-semibold mb-1">Instrucciones</label>
            <textarea id="instructions" name="instructions" value={recipeData.instructions} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2" required />
          </div>
          <div className="mb-4">
            <label htmlFor="difficulty" className="block text-sm font-semibold mb-1">Dificultad</label>
            <select id="difficulty" name="difficulty" value={recipeData.difficulty} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2" required>
              <option value="">Selecciona la dificultad</option>
              <option value="Fácil">Fácil</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Difícil">Difícil</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-semibold mb-1">Descripción</label>
            <textarea id="description" name="description" value={recipeData.description} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="nationality" className="block text-sm font-semibold mb-1">Nacionalidad de la receta</label>
            <input type="text" id="nationality" name="nationality" value={recipeData.nationality} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2" required />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Subir Receta</button>
        </form>
      </div>
    </div>
  );
}

export default SubirReceta;
