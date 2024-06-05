// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeService from '../services/RecipeService';
import OpinionsService from '../services/OpinionsService';
import AsessmentsService from '../services/AsessmentsService';
import AuthService from '../services/AuthService';
import Header from '../components/Header';
import Footer from '../components/Footer';

const opinionsService = new OpinionsService();
const asessmentsService = new AsessmentsService();
const recipeService = new RecipeService();
const authService = new AuthService();

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [opinions, setOpinions] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [opinionCount, setOpinionCount] = useState(0);
  const [newOpinionTitle, setNewOpinionTitle] = useState('');
  const [newOpinionContent, setNewOpinionContent] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchRecipeAndDetails = async () => {
      try {
        const recipeData = await recipeService.findById(id);
        const userData = authService.getUserInfo(id);
        const opinionsData = await opinionsService.getOpinionsByRecipeId(id);
        const averageRatingData = await asessmentsService.getAverageRatingByRecipeId(id);
        const ratingCountData = await asessmentsService.countAsessmentsByRecipeId(id);
        const opinionCountData = await opinionsService.countOpinionsByRecipeId(id);

        setUser(userData);
        setRecipe(recipeData);
        setOpinions(opinionsData);
        setAverageRating(averageRatingData);
        setRatingCount(ratingCountData);
        setOpinionCount(opinionCountData);
      } catch (error) {
        console.error('Error fetching recipe and details:', error);
      }
    };
    fetchRecipeAndDetails();
  }, [id]);

  const handleAddOpinion = async () => {
    try {
      const opinionData = {
        title: newOpinionTitle,
        content: newOpinionContent,
        recipe: { id: id },
        user: { id: user.user.id }
      };
      await opinionsService.addOpinion(opinionData);
      const updatedOpinions = await opinionsService.getOpinionsByRecipeId(id);
      setOpinions(updatedOpinions);
      setNewOpinionTitle('');
      setNewOpinionContent('');
    } catch (error) {
      console.error('Error adding opinion:', error);
    }
  };

  const handleAddRating = async () => {
    try {
      const ratingData = {
        calification: newRating,
        recipe: { id: id },
        user: { id: user.user.id }
      };
      await asessmentsService.addAsessments(ratingData);
      const updatedAverageRating = await asessmentsService.getAverageRatingByRecipeId(id);
      setAverageRating(updatedAverageRating);
    } catch (error) {
      console.error('Error adding rating:', error);
    }
  };


  const renderStars = (rating) => {
    const roundedRating = Math.round(rating);
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-6 h-6 ${index < roundedRating ? 'text-yellow-500' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            onClick={() => setNewRating(index + 1)}
            style={{ cursor: 'pointer' }}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955h4.14c.97 0 1.371 1.24.588 1.81l-3.354 2.438 1.287 3.956c.3.921-.755 1.688-1.539 1.118L10 13.011l-3.354 2.438c-.784.57-1.839-.197-1.539-1.118l1.287-3.956-3.354-2.438c-.783-.57-.382-1.81.588-1.81h4.14L9.049 2.927z" />
          </svg>
        ))}
      </div>
    );
  };

  const renderIngredients = (ingredients) => {
    return (
      <ul className="list-disc pl-5">
        {ingredients.split(', ').map((ingredient, index) => (
          <li className='mb-2 text-lg' key={index}>{ingredient}</li>
        ))}
      </ul>
    );
  };

  const renderInstructions = (instructions) => {
    return (
      <ol className="list-decimal pl-5">
        {instructions.split(/\d+\.\s/).map((instruction, index) => 
          instruction.trim() && <li className='mb-2 text-lg' key={index}>{instruction.trim()}</li>
        )}
      </ol>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-6 w-full mx-auto shadow-lg bg-white rounded-lg">
        {recipe && (
          <div>
            <div className="flex flex-col md:flex-row mb-6">
              <div className="md:w-1/2 md:pr-8 flex flex-col justify-start">
                <h1 className="text-4xl font-bold text-gray-800 flex items-center">
                  {recipe.name}
                  <span className="ml-4 flex items-center">
                    {renderStars(averageRating)}
                    <span className="text-base text-gray-500 ml-1">
                      ({averageRating.toFixed(1)})
                    </span>
                    <span className="text-sm text-gray-500 ml-4">
                      {ratingCount} valoraciones
                    </span>
                  </span>
                </h1>
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
                {renderIngredients(recipe.ingredients)}
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="mb-4 text-2xl font-semibold">Elaboración de la receta</h2>
                {renderInstructions(recipe.instructions)}
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
            <div className="mt-6 border border-gray-300 rounded-lg p-4 bg-gray-50">
              <h2 className="mb-4 text-2xl font-semibold">Añadir Opinión</h2>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-2 py-1 w-full mb-2"
                placeholder="Título"
                value={newOpinionTitle}
                onChange={(e) => setNewOpinionTitle(e.target.value)}
              />
              <textarea
                className="border border-gray-300 rounded-md px-2 py-1 w-full mb-2"
                rows="4"
                placeholder="Contenido"
                value={newOpinionContent}
                onChange={(e) => setNewOpinionContent(e.target.value)}
              ></textarea>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleAddOpinion}
              >
                Publicar Opinión
              </button>
            </div>
            <div className="mt-6 border border-gray-300 rounded-lg p-4 bg-gray-50">
              <h2 className="mb-4 text-2xl font-semibold">Valorar Receta</h2>
              <p>Selecciona tu valoración:</p>
              {renderStars(newRating)}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                onClick={handleAddRating}
              >
                Enviar Valoración
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetail;