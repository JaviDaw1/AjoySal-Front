// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeService from '../services/RecipeService';
import OpinionsService from '../services/OpinionsService';
import AsessmentsService from '../services/AsessmentsService';
import LikesService from '../services/LikesService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaArrowLeft } from 'react-icons/fa';

const recipeService = new RecipeService();
const opinionsService = new OpinionsService();
const asessmentsService = new AsessmentsService();
const likesService = new LikesService();

const RecipeDetailAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [opinions, setOpinions] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const recipeData = await recipeService.findById(id);
        const opinionsData = await opinionsService.getOpinionsByRecipeId(id);
        const assessmentsData = await asessmentsService.getAsessmentsByRecipeId(id);
        const likesData = await likesService.getRecipesLikedByUser(id);
        const averageRatingData = await asessmentsService.getAverageRatingByRecipeId(id);

        setRecipe(recipeData);
        setOpinions(opinionsData);
        setAssessments(assessmentsData);
        setLikes(likesData);
        setAverageRating(averageRatingData);

        setLoading(false);
      } catch (error) {
        console.error('Error loading recipe details:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  const handleBack = () => {
    navigate('/recipeadmin');
  };

  const displayCount = (count, singularText, pluralText) => {
    if (count === 1) {
      return `1 ${singularText}`;
    } else {
      return `${count} ${pluralText}`;
    }
  };

  return (
    <div>
      <Header />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{recipe.name}</h2>
          <button
            onClick={handleBack}
            className="text-gray-500 hover:text-gray-700 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Volver a todas las recetas subidas
          </button>
        </div>
        <p>{recipe.description || "Sin descripción"}</p>
        <p>Nacionalidad: {recipe.nationality}</p>
        <p>Dificultad: {recipe.difficulty}</p>
        <p>Tiempo de cocinado: {recipe.time} minutos</p>
        <p>Plato para {recipe.servings} personas</p>
        <p>Publicada el: {new Date(recipe.date).toLocaleDateString()}</p>
        <p>Autor: {recipe.user.username}</p>

        <div className="mt-6">
          <h2 className="text-xl font-bold">Opiniones <span className="text-sm text-gray-500">({displayCount(opinions.length, 'opinión', 'opiniones')})</span></h2>
          <table className="min-w-full mb-4 mt-3">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left border">Title</th>
                <th className="px-3 py-2 text-left border">Content</th>
                <th className="px-3 py-2 text-left border">Usuario</th>
              </tr>
            </thead>
            <tbody>
              {opinions.map((opinion) => (
                <tr key={opinion.id}>
                  <td className="border px-3 py-2">{opinion.title}</td>
                  <td className="border px-3 py-2">{opinion.content}</td>
                  <td className="border px-3 py-2">{opinion.user.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold">Valoraciones <span className="text-sm text-gray-500">({displayCount(assessments.length, 'valoración', 'valoraciones')})</span></h2>
          <p>Promedio de valoración: {averageRating.toFixed(1)}</p>
          <table className="min-w-full mb-4 mt-3">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left border">Valoración</th>
                <th className="px-3 py-2 text-left border">Usuario</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((assessment) => (
                <tr key={assessment.id}>
                  <td className="border px-3 py-2">{assessment.calification}</td>
                  <td className="border px-3 py-2">{assessment.user.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold">Likes <span className="text-sm text-gray-500">({displayCount(likes.length, 'like', 'likes')})</span></h2>
          <table className="min-w-full mb-4 mt-3">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left border">Usuario</th>
              </tr>
            </thead>
            <tbody>
              {likes.map((like) => (
                <tr key={like.id}>
                  <td className="border px-3 py-2">{like.user.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetailAdmin;
