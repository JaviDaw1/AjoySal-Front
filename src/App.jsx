// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './input.css';
import Login from './pages/Login.jsx';
import HomePage from './pages/HomePage.jsx';
import Contact from './pages/Contact.jsx';
import AboutUs from './pages/AboutUs.jsx';
import RecipeClient from './pages/RecipeClient.jsx';
import RecipeDetails from './pages/RecipeDetails.jsx'; // Asegúrate de importar RecipeDetails

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipeclient" element={<RecipeClient />} />
        <Route path="/recipeclient/:id" element={<RecipeDetails />} /> {/* Esta ruta es para mostrar detalles de una receta específica */}
        <Route path="/postrecipe" />
        <Route path="/aboutas" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
