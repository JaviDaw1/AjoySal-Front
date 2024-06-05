// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeService from '../services/RecipeService';
import OpinionsService from '../services/OpinionsService';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [opinions, setOpinions] = useState([]);

  useEffect(() => {
    const fetchRecipeAndOpinions = async () => {
      try {
        const recipeData = await new RecipeService().findById(id);
        const opinionsData = await new OpinionsService().getOpinionsByRecipeId(id);
        setRecipe(recipeData);
        setOpinions(opinionsData);
      } catch (error) {
        console.error('Error fetching recipe and opinions:', error);
      }
    };
    fetchRecipeAndOpinions();
  }, [id]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-6 w-full mx-auto shadow-lg bg-white rounded-lg">
        {recipe && (
          <div>
            <div className="flex flex-col md:flex-row mb-6">
              <div className="md:w-1/2 md:pr-8 flex flex-col justify-start">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.name}</h1>
                <hr className="mb-6" />
                <p className="mb-4">{recipe.description || "Sin descripción"}</p>
                <p className="mb-4"><strong>Nacionalidad:</strong> {recipe.nationality}</p>
                <p className="mb-4"><strong>Dificultad:</strong> {recipe.difficulty}</p>
                <p className="mb-4"><strong>Favoritos:</strong> {recipe.favorites ? 'Sí' : 'No'}</p>
              </div>
              <div className="md:w-1/2 flex justify-end">
                <img src={recipe.image} alt={recipe.name} className="w-full h-auto max-w-sm rounded-lg shadow-md" />
              </div>
            </div>
            <hr className="mb-6" />
            <div className="mb-6 flex flex-col md:flex-row justify-between">
              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                <h2 className="mb-4 text-2xl font-semibold">Ingredientes necesarios</h2>
                {recipe.ingredients}
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="mb-4 text-2xl font-semibold">Elaboración de la receta</h2>
                {recipe.instructions}
              </div>
            </div>
            <hr className="mb-6" />
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-700"><strong>Publicada el:</strong> {new Date(recipe.date).toLocaleDateString()}</p>
              <p className="text-gray-700"><strong>Autor:</strong> {recipe.user.username}</p>
            </div>
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <h2 className="mb-4 text-2xl font-semibold">Opiniones</h2>
              {opinions.map((opinion, index) => (
                <div key={index} className="mb-4">
                  <p className="text-lg font-bold">{opinion.title} - {opinion.user.username}</p>
                  <p>{opinion.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetail;







