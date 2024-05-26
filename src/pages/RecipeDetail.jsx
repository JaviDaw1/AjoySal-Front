// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeService } from '../services/RecipeService';

const RecipeDetail = () => {
  const { id } = useParams(); // Obtener el parámetro ID de la URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = await new RecipeService().findById(id);
        setRecipe(recipeData);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>
      <img src={recipe.image} alt={recipe.name} />
      {/* Mostrar más detalles según sea necesario */}
    </div>
  );
};

export default RecipeDetail;
