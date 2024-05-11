import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeDetails = ({ recipeId }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!recipeId) {
        // No hay ID de receta, salir
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/recipe/${recipeId}`);
        setRecipe(response.data);
      } catch (error) {
        if (error.response) {
          // La solicitud se realizó y el servidor respondió con un código de estado
          if (error.response.status === 404) {
            setError('Recipe not found');
          } else if (error.response.status === 403) {
            setError('Forbidden: You do not have permission to access this resource');
          } else {
            setError('An error occurred while fetching the recipe');
          }
        } else if (error.request) {
          // La solicitud se realizó pero no se recibió respuesta
          setError('No response received from the server');
        } else {
          // Algo más sucedió al realizar la solicitud que desencadenó un error
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();

    // Función de limpieza
    return () => {
      // Cancelar la solicitud si el componente se desmonta
    };
  }, [recipeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      {/* Mostrar otros detalles de la receta */}
    </div>
  );
};

export default RecipeDetails;
