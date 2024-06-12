// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostRecipe from './pages/PostRecipe';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import RecipeDetail from './pages/RecipeDetail';
import RecipeDetailAdmin from './pages/RecipeDetailAdmin';
import RecipeAdmin from './pages/RecipeAdmin';
import RecipeClient from './pages/RecipeClient';
import Profile from './pages/Profile';
import UploadedRecipes from './pages/UploadedRecipes';
import EditRecipe from './pages/EditRecipe';
import FavoritesRecipes from './pages/FavoritesRecipes';
import Error404 from './pages/Error404';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />

        {/* Recipe Pages */}
        <Route path="/recipeclient" element={<RecipeClient />} />
        <Route path="/recipeadmin" element={<RecipeAdmin />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/recipes/:id" element={<RecipeDetailAdmin />} />
        <Route path="/postrecipe" element={<PostRecipe />} />

        {/* User Pages */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/uploadedrecipes" element={<UploadedRecipes />} />
        <Route path="/editrecipe/:id" element={<EditRecipe />} />
        <Route path="/favoritesrecipes" element={<FavoritesRecipes />} />
      </Routes>
    </Router>
  );
}
