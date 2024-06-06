// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import RecipeService from '../services/RecipeService';
import Header from '../components/Header';
import Footer from '../components/Footer';

const authService = new AuthService();
const recipeService = new RecipeService();

const UploadedRecipes = () => {
  const [recipes, setRecipes] = useState([]);

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
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
        {
        recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
              <div className="max-w-sm border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-gray-500 hover:bg-gray-100 shadow hover:shadow-md hover:shadow-gray-200 ease-in-out transition-all duration-200">
                <div className="w-full">
                  <img src={recipe.image} alt={recipe.name} className="w-full rounded-none" />
                </div>
                <div className="p-4">
                  <h1 className="text-lg font-bold mb-2">{recipe.name}</h1>
                  <hr className="my-4" />
                  <p className="text-sm text-gray-700 mb-2">{recipe.description}</p>
                  <p className="text-sm text-gray-700"><strong>Autor: </strong> {recipe.user.username}</p>
                </div>
              </div>
            </Link>
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
