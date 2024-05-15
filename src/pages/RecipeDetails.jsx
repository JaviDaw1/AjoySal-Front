// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Importa useParams

const RecipeDetails = () => {
  const { id } = useParams(); // Obtiene el ID de la receta de la URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching recipe with ID:', id);

    const fetchRecipe = async () => {
      if (!id) {
        console.log('No recipe ID provided');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching recipe details...');
        const response = await axios.get(`http://localhost:8080/api/recipe/${id}`);
        console.log('Recipe details received:', response.data);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);

        if (error.response) {
          if (error.response.status === 404) {
            setError('Recipe not found');
          } else if (error.response.status === 403) {
            setError('Forbidden: You do not have permission to access this resource');
          } else {
            setError('An error occurred while fetching the recipe');
          }
        } else if (error.request) {
          setError('No response received from the server');
        } else {
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
  }, [id]);

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
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      {/* Mostrar otros detalles de la receta */}
    </div>
  );
};

export default RecipeDetails;
