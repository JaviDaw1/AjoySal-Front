// RecipeDetailAdmin.jsx
import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import RecipeService from '../services/RecipeService.js';

class RecipeDetailAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: null
        };
        this.recipeService = new RecipeService();
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.loadRecipe(id);
    }

    async loadRecipe(id) {
        try {
            const recipe = await this.recipeService.findById(id);
            this.setState({ recipe });
        } catch (error) {
            console.error('Error loading recipe:', error);
        }
    }

    render() {
        const { recipe } = this.state;
        if (!recipe) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Header />
                <div className="container mx-auto p-4">
                    <h2 className="text-2xl font-bold mb-4">{recipe.name}</h2>
                    <p><strong>Instructions:</strong> {recipe.instructions}</p>
                    <p><strong>Nationality:</strong> {recipe.nationality}</p>
                    <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                    <p><strong>Favorites:</strong> {recipe.favorites}</p>
                    <p><strong>Date:</strong> {recipe.date}</p>
                    <p><strong>Description:</strong> {recipe.description}</p>
                    <img src={recipe.image} alt={recipe.name} className="w-full h-auto rounded-md" />
                </div>
                <Footer />
            </div>
        );
    }
}

export default RecipeDetailAdmin;
