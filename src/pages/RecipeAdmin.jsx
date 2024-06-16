import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import RecipeService from '../services/RecipeService.js';
import { FaCheckCircle, FaTrash } from 'react-icons/fa';
import Modal from '../components/Modal';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import TableBase from '../components/TableBase.jsx';

const recipeService = new RecipeService();

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);

    useEffect(() => {
        loadRecipes();
    }, []);

    const loadRecipes = async () => {
        try {
            const data = await recipeService.findAll();
            setRecipes(data);
        } catch (error) {
            console.error('Error loading recipes:', error);
        }
    };

    const deleteRecipe = async () => {
        try {
            await recipeService.deleteRecipe(selectedRecipeId);
            setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== selectedRecipeId));
            setDeleteSuccess(true);
            setShowModal(false);
            setSelectedRecipeId(null);
            setTimeout(() => setDeleteSuccess(false), 3000);
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const openModal = (id) => {
        setSelectedRecipeId(id);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedRecipeId(null);
    };

    return (
        <div>
            <Header />
            <div className="p-grid p-justify-center mb-6">
                {deleteSuccess && (
                    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 bg-green-200 bg-opacity-75 px-6 py-3 rounded-md shadow-md flex items-center z-50">
                        <FaCheckCircle className="text-green-800 mr-2" />
                        <p className="text-green-800 font-bold">OK! La receta se ha eliminado correctamente.</p>
                    </div>
                )}
                <TableBase recipes={recipes} onDeleteRecipe={openModal} />
            </div>
            <Modal show={showModal} onClose={closeModal} onConfirm={deleteRecipe} />
            <Footer/>
        </div>
    );
};

export default Recipes;
