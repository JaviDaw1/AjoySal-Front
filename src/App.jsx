// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './input.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import RecipeAdmin from './pages/RecipeAdmin';
import RecipeClient from './pages/RecipeClient';
import RecipeDetail from './pages/RecipeDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipeadmin" element={<RecipeAdmin />} />
        <Route path="/recipeclient" element={<RecipeClient />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;