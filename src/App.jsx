// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './input.css';
import Login from './pages/Login.jsx'
import HomePage from './pages/HomePage.jsx'
import Contact from './pages/Contact.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Recipes from './pages/Recipes.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<Recipes/>}/>
        <Route path="/postrecipe" />
        <Route path="/aboutas" element={<AboutUs />}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;