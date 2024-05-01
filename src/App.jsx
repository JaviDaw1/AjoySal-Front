// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './input.css';
import Login from './pages/Login.jsx'
import HomePage from './pages/HomePage.jsx'
import ContactElemnt from './components/ContactElement.jsx';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<ContactElemnt />} />
    </Routes>
  </BrowserRouter>
  );
}

export default class App extends Component{
  constructor(){
    super();
    this.setState({
      recipe: []
  });
  this.recipeService = new RecipeService();
  }

  componentDidMount(){
    this.RecipeService.getAll().then(data => {
      console.log(data);
    })
  }

  render(){
    return (
      <h1> Hola Mundo</h1>
    )
  }
}