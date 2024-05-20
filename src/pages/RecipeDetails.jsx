// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/recipe/${id}`);
        setRecipe(response.data);
      } catch (error) {
        setError('An error occurred while fetching the recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !recipe) {
    return <div>Error: {error || 'Recipe not found'}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-1 md:col-span-1">
              <img src={recipe.image} alt={recipe.name} className="w-full h-auto rounded-lg" />
            </div>
            <div className="col-span-1 md:col-span-1">
              <h2 className="text-3xl font-bold mb-4">{recipe.name}</h2>
              <p className="text-lg mb-4">{recipe.description}</p>
              <div className="flex flex-col md:flex-row md:justify-between">
                <p className="mb-2">Nationality: {recipe.nationality}</p>
                <p className="mb-2">Difficulty: {recipe.difficulty}</p>
                <p className="mb-2">Favorites: {recipe.favorites ? 'Yes' : 'No'}</p>
                <p className="mb-2">Date: {new Date(recipe.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Ingredients:</h3>
          <ul className="list-disc pl-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.name}</li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Instructions:</h3>
          <p className="text-lg">{recipe.instructions}</p>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Opinions:</h3>
          <ul>
            {recipe.opinions.map((opinion, index) => (
              <li key={index} className="mb-4">
                <h4 className="text-xl font-semibold">{opinion.title}</h4>
                <p className="text-lg">{opinion.content}</p>
              </li>
            ))}
          </ul>
        </div>
        {/* Agrega más secciones según el modelo Recipe */}
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetails;

