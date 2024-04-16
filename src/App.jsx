// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './input.css';
import Login from './components/Login.jsx'
import HomePage from './components/HomePage.jsx'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  </BrowserRouter>

  );
}

export default App;