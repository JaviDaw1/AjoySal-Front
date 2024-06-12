import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RecipeService from '../services/RecipeService';
import OpinionsService from '../services/OpinionsService';
import AsessmentsService from '../services/AsessmentsService';
import LikesService from '../services/LikesService';
import AuthService from '../services/AuthService';
import Header from '../components/Header';
import Footer from '../components/Footer'; 
import { FaArrowLeft } from 'react-icons/fa';
import { Button } from 'primereact/button';

const opinionsService = new OpinionsService();
const asessmentsService = new AsessmentsService();
const recipeService = new RecipeService();
const authService = new AuthService();
const likesService = new LikesService();

const RecipeDetailAdmin = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [opinions, setOpinions] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [opinionCount, setOpinionCount] = useState(0);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);

  useEffect(() => {
    const fetchRecipeAndDetails = async () => {
      try {
        const recipeData = await recipeService.findById(id);
        const userData = await authService.getUserInfo(recipeData.user.id);
        const opinionsData = await opinionsService.getOpinionsByRecipeId(id);
        const averageRatingData = await asessmentsService.getAverageRatingByRecipeId(id);
        const ratingCountData = await asessmentsService.countAsessmentsByRecipeId(id);
        const opinionCountData = await opinionsService.countOpinionsByRecipeId(id);
        const likesCountData = await likesService.countLikesByRecipeId(id);
        const likedUsersData = await likesService.getUsersWhoLikedRecipe(id);

        setUser(userData);
        setRecipe(recipeData);
        setOpinions(opinionsData);
        setAverageRating(averageRatingData);
        setRatingCount(ratingCountData);
        setOpinionCount(opinionCountData);
        setLikesCount(likesCountData);
        setLikedUsers(likedUsersData);
      } catch (error) {
        console.error('Error fetching recipe and details:', error);
        setErrorMessage('Error fetching recipe details.');
      }
    };
    fetchRecipeAndDetails();
  }, [id]);

  const renderOpinions = () => {
    return opinions.map((opinion, index) => (
      <tr key={index}>
        <td className="border border-gray-300 px-4 py-2">{opinion.title}</td>
        <td className="border border-gray-300 px-4 py-2">{opinion.content}</td>
        <td className="border border-gray-300 px-4 py-2">{opinion.user.username}</td>
      </tr>
    ));
  };

  const renderAsessments = () => {
    return opinions.map((assessment, index) => (
      <tr key={index}>
        <td className="border border-gray-300 px-4 py-2">{assessment.user.username}</td>
        <td className="border border-gray-300 px-4 py-2">{assessment.rating}</td>
      </tr>
    ));
  };

  const renderLikedUsers = () => {
    return likedUsers.map((likedUser, index) => (
      <tr key={index}>
        <td className="border border-gray-300 px-4 py-2">{likedUser.username}</td>
      </tr>
    ));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {recipe && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-4xl font-bold text-gray-700">{recipe.name}</h2>
              <Link to="/recipeadmin" className="text-gray-500 hover:text-gray-700 flex items-center">
                <FaArrowLeft className="mr-2" />
                Volver a recetas subidas
              </Link>
            </div>
            <div className="mb-4">
              <p>{recipe.description || "Sin descripción"}</p>
              <p>Nacionalidad: {recipe.nationality}</p>
              <p>Dificultad: {recipe.difficulty}</p>
              <p>Tiempo de cocinado: {recipe.time} minutos</p>
              <p>Plato para {recipe.servings} personas</p>
              <p>Publicada el: {new Date(recipe.date).toLocaleDateString()}</p>
              <p>Autor: {recipe.user.username}</p>
            </div>
            <div className="mb-4">
              <p>Valoración promedio: {averageRating.toFixed(1)}</p>
              <p>Número de valoraciones: {ratingCount}</p>
              <p>Número de opiniones: {opinionCount}</p>
              <p>Número de likes: {likesCount}</p>
            </div>
            <h2 className="text-xl font-bold mb-2">Opiniones:</h2>
            <table className="w-full border-collapse border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Título</th>
                  <th className="border border-gray-300 px-4 py-2">Contenido</th>
                  <th className="border border-gray-300 px-4 py-2">Usuario</th>
                </tr>
              </thead>
              <tbody>
                {renderOpinions()}
              </tbody>
            </table>

            <h2 className="text-xl font-bold mb-2">Valoraciones:</h2>
            <table className="w-full border-collapse border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Usuario</th>
                  <th className="border border-gray-300 px-4 py-2">Valoración</th>
                </tr>
              </thead>
              <tbody>
                {renderAsessments()}
              </tbody>
            </table>

            <h2 className="text-xl font-bold mb-2">Likes:</h2>
            <table className="w-full border-collapse border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Usuario que dio like</th>
                </tr>
              </thead>
              <tbody>
                {renderLikedUsers()}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer /> 
    </div>
  );
};

export default RecipeDetailAdmin;
