// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import LikesService from '../services/LikesService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Divider from '../components/Divider';
import AuthService from '../services/authService';

const likesService = new LikesService();
const authService = new AuthService();

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const user = authService.getUserInfo();
        if (user) {
          const response = await likesService.getRecipesLikedByUser(user.user.id);
          setFavoriteRecipes(response);
        }
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
      }
    };
    fetchFavoriteRecipes();
  }, []);

  const handleRemoveFromFavorites = async (recipeId) => {
    try {
      await likesService.unlikeRecipe(recipeId, authService.getUserInfo().user.id);
      setFavoriteRecipes(favoriteRecipes.filter(recipe => recipe.id !== recipeId));
    } catch (error) {
      console.error('Error removing recipe from favorites:', error);
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className="relative flex-grow">
        <div className={`flex flex-wrap justify-center`}>
          {favoriteRecipes.length > 0 ? (
            favoriteRecipes.map((recipe, index) => (
              <div key={index} className="flex flex-col max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
                <div className="flex flex-col h-full border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-gray-500 hover:bg-gray-100 shadow hover:shadow-md hover:shadow-gray-200 ease-in-out transition-all duration-200">
                  <Link to={`/recipe/${recipe.id}?sourcePage=favoritesrecipes`} className="flex-grow">
                    <img src={recipe.image} alt={recipe.name} className="w-full rounded-none" />
                    <div className="p-4">
                      <h1 className="text-lg font-bold mb-2">{recipe.name}</h1>
                      <Divider className='my-4' />
                      <p className="text-sm text-gray-700 mb-2">{recipe.description}</p>
                      <p className="text-sm text-gray-700"><strong>Autor: </strong> {recipe.user.username}</p>
                    </div>
                  </Link>
                  <div className="p-4 flex justify-between mt-auto">
                    <button onClick={() => handleRemoveFromFavorites(recipe.id)} className="text-red-500 hover:text-red-700 ease-in-out transition-all duration-200">
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-64 text-xl text-gray-600">
              <p className="text-2xl">No tienes ninguna receta favorita.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavoriteRecipes;
