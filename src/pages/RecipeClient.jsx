// RecipeClient.jsx
import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { Link } from 'react-router-dom';
import { RecipeService } from '../services/RecipeService.js';

export default class RecipeClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
        };
        this.recipeService = new RecipeService();
    }

    componentDidMount() {
        this.loadRecipes();
    }

    loadRecipes = async () => {
        try {
            const data = await this.recipeService.findAll();
            this.setState({ recipes: data });
        } catch (error) {
            console.error('Error loading recipes:', error);
        }
    };

    render() {
        const { recipes } = this.state;
        return (
            <div>
                <Header />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                    {recipes.map((recipe, index) => (
                        <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
                            <div className="flex">
                                <div className="w-full sm:w-1/2">
                                    <img src={recipe.image} alt={recipe.name} className="w-full rounded-lg" />
                                </div>
                                <div className="w-full sm:w-1/2 p-4">
                                    <h1 className="text-lg font-bold mb-2">{recipe.name}</h1>
                                    <p><strong>Description:</strong> {recipe.description}</p>
                                    <Link to={`/recipeclient/${recipe.id}`} className="block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View Recipe</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Footer />
            </div>
        );
    }
}
