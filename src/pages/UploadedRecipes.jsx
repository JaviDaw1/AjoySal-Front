// eslint-disable-next-line no-unused-varsimport React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import RecipeService from '../services/RecipeService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

const authService = new AuthService();
const recipeService = new RecipeService();

const UploadedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUploadedRecipes = async () => {
      try {
        const userInfo = authService.getUserInfo();
        if (userInfo && userInfo.user.id) {
          const response = await recipeService.getRecipesByUserId(userInfo.user.id);
          setRecipes(response);
        }
      } catch (error) {
        console.error('Error fetching uploaded recipes:', error);
      }
    };
    fetchUploadedRecipes();
  }, [deleteSuccess]); // Added dependency for useEffect

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro que quieres eliminar esta receta?')) {
      try {
        await recipeService.deleteRecipe(id);
        setRecipes(recipes.filter(recipe => recipe.id !== id));
        setDeleteSuccess(true);
        setTimeout(() => setDeleteSuccess(false), 3000); // Show success message for 3 seconds
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    }
  };

  const handleEdit = async (id) => {
    navigate(`/editrecipe/${id}`);
  };

  return (
    <div className="overflow-x-hidden relative">
      <Header />
      {deleteSuccess && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 bg-green-200 bg-opacity-50 px-6 py-3 rounded-md shadow-md">
          <p className="text-green-800 font-bold">OK! La receta se ha eliminado correctamente.</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="max-w-sm border border-gray-300 rounded-lg overflow-hidden shadow cursor-pointer hover:border-gray-500 hover:bg-gray-100 ease-in-out transition-all duration-200">
              <Link to={`/recipe/${recipe.id}`}>
                <img src={recipe.image} alt={recipe.name} className="w-full rounded-none" />
                <div className="p-4">
                  <h1 className="text-lg font-bold mb-2">{recipe.name}</h1>
                  <hr className="my-4" />
                  <p className="text-sm text-gray-700 mb-2">{recipe.description}</p>
                  <p className="text-sm text-gray-700"><strong>Autor: </strong> {recipe.user.username}</p>
                </div>
              </Link>
              <div className="p-4 flex justify-between">
                <button onClick={() => handleEdit(recipe.id)} className="text-blue-500 hover:text-blue-700">
                  <FaPencilAlt />
                </button>
                <button onClick={() => handleDelete(recipe.id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No has subido ninguna receta.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UploadedRecipes;
