// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeService from '../services/RecipeService';

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
            <div className='overflow-x-hidden'>
                <Header/>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
                    {recipes.map((recipe, index) => (
                        <Link key={index} to={`/recipe/${recipe.id}`}>
                            <div className="max-w-sm border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-gray-500 hover:bg-gray-100 shadow hover:shadow-md hover:shadow-gray-200 transition-all duration-200">
                                <div className="w-full">
                                    <img src={recipe.image} alt={recipe.name} className="w-full rounded-none" />
                                </div>
                                <div className="p-4">
                                    <h1 className="text-lg font-bold mb-2">{recipe.name}</h1>
                                    <hr className="my-4"/>
                                    <p className="text-sm text-gray-700 mb-2">{recipe.description}</p>
                                    <p className="text-sm text-gray-700"><strong>Autor: </strong> {recipe.user.username}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <Footer/>
            </div>
        );
    }
}
