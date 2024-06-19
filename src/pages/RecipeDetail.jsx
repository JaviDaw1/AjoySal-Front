// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaExclamationCircle, FaArrowLeft } from 'react-icons/fa';
 import RecipeService from '../services/RecipeService';
import OpinionsService from '../services/OpinionsService';
import AsessmentsService from '../services/AsessmentsService';
import LikesService from '../services/LikesService';
import AuthService from '../services/authService';
import Header from '../components/Header';
import Footer from '../components/Footer';

const opinionsService = new OpinionsService();
const asessmentsService = new AsessmentsService();
const recipeService = new RecipeService();
const authService = new AuthService();
const likesService = new LikesService();

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
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
  const [errorMessage, setErrorMessage] = useState(null);
  const [showOpinionForm, setShowOpinionForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

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

        if (userData && userData.user && userData.user.id) {
          const isLikedByUser = await likesService.isRecipeLikedByUser(id, userData.user.id);
          setIsLiked(isLikedByUser);
        }
      } catch (error) {
        console.error('Error fetching recipe and details:', error);
      }
    };
    fetchRecipeAndDetails();
  }, [id]);

  const handleAddOpinion = async () => {
    try {
      if (user && user.user.id === recipe.user.id) {
        setErrorMessage('No puedes publicar una opinión sobre tu propia receta.');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        return;
      }
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
      setShowOpinionForm(false);
    } catch (error) {
      console.error('Error adding opinion:', error);
    }
  };

  const handleAddRating = async () => {
    try {
      if (user && user.user.id === recipe.user.id) {
        setErrorMessage('No puedes valorar tu propia receta.');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        return;
      }
      const ratingData = {
        calification: newRating,
        recipe: { id: id },
        user: { id: user.user.id }
      };
      await asessmentsService.addAsessments(ratingData);
      const updatedAverageRating = await asessmentsService.getAverageRatingByRecipeId(id);
      setAverageRating(updatedAverageRating);
      setShowOpinionForm(false);
    } catch (error) {
      console.error('Error adding rating:', error);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      if (isLiked) {
        await likesService.unlikeRecipe(id, user.user.id);
      } else {
        await likesService.likeRecipe(id, user.user.id);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const renderStars = (rating) => {
    const roundedRating = Math.round(rating);
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-6 h-6 transition-all duration-200 ease-in-out ${index < roundedRating ? 'text-yellow-500' : 'text-gray-300'}`}
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

  const handleToggleOpinionForm = () => {
    setShowOpinionForm(!showOpinionForm);
  };

  const handleBack = () => {
    const sourcePage = new URLSearchParams(location.search).get('sourcePage');
    switch (sourcePage) {
      case 'recipeclient':
        navigate('/recipeclient');
        break;
      case 'uploadedrecipes':
        navigate('/uploadedrecipes');
        break;
      case 'favoritesrecipes':
        navigate('/favoritesrecipes');
        break;
      default:
        navigate('/defaultPage');
        break;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className='ml-4 mt-4'>
        <button onClick={handleBack} className="text-gray-500 hover:text-gray-700 flex items-center transition-all duration-200 ease-in-out">
          <FaArrowLeft className="mr-2" />
          Volver atrás
        </button>
      </div>
      <div className="flex-grow p-6 w-full mx-auto shadow-lg bg-white rounded-lg">
        {recipe && (
          <div>
            <div className="flex flex-col md:flex-row mb-6">
              <div>
                <div className='flex flex-grow  items-center'>
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.name}</h1>
                  <svg
                    onClick={handleToggleFavorite}
                    className={`w-6 h-6 mb-4 cursor-pointer transition-all duration-200 ease-in-out ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <div className="flex items-center mb-4">
                  {renderStars(averageRating)}
                  <span className="text-base text-gray-500 ml-1">
                    ({averageRating.toFixed(1)})
                  </span>
                  <span className="text-sm text-gray-500 ml-4">
                    {ratingCount} valoraciones
                  </span>
                </div>
                <hr className="mb-4" />
                <p className="mb-4">{recipe.description || "Sin descripción"}</p>
                <p className="mb-4">Nacionalidad {recipe.nationality}</p>
                <p className="mb-4">Dificultad {recipe.difficulty}</p>
                <p className="mb-4">Tiempo de cocinado: {recipe.time} minutos</p>
                <p className="mb-4">Plato para {recipe.servings} personas</p>
              </div>
              <div className="md:w-1/2 flex justify-end flex-grow">
                <img src={recipe.image} alt={recipe.name} className="w-full md:w-auto h-auto sm:mt-4 max-w-full md:max-w-sm rounded-lg shadow-md" />
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
            <div>
              {opinions.length === 0 && (
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                  <h2 className="mb-4 text-2xl font-semibold">Opiniones</h2>
                  <p className='text-lg'>No hay reseñas todavía.</p>
                </div>
              )}

              {opinions.length > 0 && (
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                  <h2 className="mb-4 text-2xl font-semibold">Opiniones</h2>
                  {opinions.map((opinion, index) => (
                    <div key={index} className="mb-4">
                      <p className="text-lg font-bold">{opinion.title} - {opinion.user.username}</p>
                      <p>{opinion.content}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-between items-center mt-6">
                <button
                  className="bg-blue-500 hover:bg-blue-500 transition-all duration-200 ease-in-out text-white px-4 py-2 rounded-md"
                  onClick={handleToggleOpinionForm}
                >
                  Publicar reseña
                </button>
              </div>
            </div>
            {showOpinionForm && (
              <div className="mt-6 border border-gray-300 rounded-lg p-4 bg-gray-50">
                <h2 className="mb-4 text-2xl font-semibold">Añadir Opinión</h2>
                <div className='mb-6'>
                  {renderStars(newRating)}
                  <div className='flex flex-col items-center'>
                    <button
                      className="bg-blue-500 hover:bg-blue-500 transition-all duration-200 ease-in-out text-white px-4 py-2 rounded-md mt-4"
                      onClick={handleAddRating}
                    >
                      Enviar Valoración
                    </button>
                  </div>
                </div>
                <div>
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
                  <div className='flex flex-col items-center'>
                    <button
                      className="bg-blue-600 hover:bg-blue-500 transition-all duration-200 ease-in-out text-white px-4 py-2 rounded-md"
                      onClick={handleAddOpinion}
                    >
                      Publicar Opinión
                    </button>
                  </div>
                </div>
                {errorMessage && (
                  <div className="mt-4 flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
                    <FaExclamationCircle className="mr-2" />
                    {errorMessage}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetail;
