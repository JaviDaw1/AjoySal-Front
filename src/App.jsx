// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SubirReceta from './pages/SubirReceta'; // Importa el componente SubirReceta
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import RecipeDetail from './pages/RecipeDetail';
import Recipes from './pages/Recipes';
import RecipeAdmin from './pages/RecipeAdmin';
import RecipeClient from './pages/RecipeClient'; 

function App() {
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
        <Route path="/subirReceta" element={<SubirReceta />} /> {/* Nueva ruta para SubirReceta */}
      </Routes>
    </Router>
  );
}

export default App;
