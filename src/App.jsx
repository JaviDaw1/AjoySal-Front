// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostRecipe from './pages/PostRecipe';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import RecipeDetail from './pages/RecipeDetail';
import Recipes from './pages/Recipes';
import RecipeAdmin from './pages/RecipeAdmin';
import RecipeClient from './pages/RecipeClient'; 
import Profile from './pages/Profile';
import UploadedRecipes  from './pages/UploadedRecipes';
import EditRecipe from './pages/EditRecipe';
import Error404 from './pages/Error404';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipeclient" element={<RecipeClient />} />
        <Route path="/recipeadmin" element={<RecipeAdmin />} />
        <Route path="/postrecipe" element={<PostRecipe />} /> 
        <Route path="/profile" element={<Profile />} />
        <Route path="/uploadedrecipes" element={<UploadedRecipes />} />
        <Route path="/editrecipe/:id" element={<EditRecipe />} />
        <Route path="/postrecipe" element={<PostRecipe />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}
