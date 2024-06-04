// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import RecipeService from '../services/RecipeService';
import AuthService from '../services/AuthService';

const recipeService = new RecipeService();
const authService = new AuthService();

const RecipeClient = () => {
    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const data = await recipeService.findAll();
                setRecipes(data);
            } catch (error) {
                console.error('Error loading recipes:', error);
            }
        };
        loadRecipes();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            const userInfo = authService.getUserInfo();
            setUser(userInfo);
        };
        fetchData();
    }, []);

    const handlePostRecipeClick = (e) => {
        e.preventDefault();
        if (!user) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                navigate('/login', { replace: true, state: { message: 'Tienes que estar logueado para ver los detalles de la receta' } });
            }, 2000);
        } else {
            navigate('/postrecipe');
        }
    };

    return (
        <div className='overflow-x-hidden'>
            <Header />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
                {recipes.map((recipe, index) => (
                    <Link key={index} onClick={handlePostRecipeClick} to={`/recipe/${recipe.id}`}>
                        <div className="max-w-sm border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-gray-500 hover:bg-gray-100 shadow hover:shadow-md hover:shadow-gray-200 transition-all duration-200">
                            <div className="w-full">
                                <img src={recipe.image} alt={recipe.name} className="w-full rounded-none" />
                            </div>
                            <div className="p-4">
                                <h1 className="text-lg font-bold mb-2">{recipe.name}</h1>
                                <hr className="my-4" />
                                <p className="text-sm text-gray-700 mb-2">{recipe.description}</p>
                                <p className="text-sm text-gray-700"><strong>Autor: </strong> {recipe.user.username}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <Footer />
            {loading && <Loading />}
        </div>
    );
};

export default RecipeClient;