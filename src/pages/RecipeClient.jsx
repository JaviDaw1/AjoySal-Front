import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import RecipeService from '../services/RecipeService';
import AuthService from '../services/AuthService';

const recipeService = new RecipeService();
const authService = new AuthService();

const RecipeClient = () => {
    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        name: '',
        difficulty: [],
        nationality: ''
    });
    const [showMoreNationalities, setShowMoreNationalities] = useState(false);

    const recipesPerPage = 12;
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

    const handlePostRecipeClick = (e, recipeId) => {
        e.preventDefault();
        if (!user) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                navigate('/login', { replace: true, state: { message: 'Tienes que estar logueado para ver los detalles de la receta' } });
            }, 2000);
        } else {
            navigate(`/recipe/${recipeId}`);
        }
    };

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const applyFilters = async () => {
        let filteredRecipes = [...recipes];
        if (filters.name) {
            filteredRecipes = await recipeService.getRecipesByName(filters.name);
        } 
        if (filters.difficulty.length > 0) {
            const promises = filters.difficulty.map(difficulty => 
                recipeService.getRecipesByDifficulty(difficulty));
            const results = await Promise.all(promises);
            filteredRecipes = results.flat();
        }
        if (filters.nationality) {
            filteredRecipes = await recipeService.getRecipesByNationality(filters.nationality);
        }
        setRecipes(filteredRecipes);
    };

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prev => {
            if (type === 'checkbox') {
                let newDifficultyFilters;
                if (checked) {
                    newDifficultyFilters = [...prev[name], value];
                } else {
                    newDifficultyFilters = prev[name].filter(item => item !== value);
                }
                applyFilters(); // Aplicar filtros inmediatamente después de actualizar los filtros de dificultad
                return { ...prev, [name]: newDifficultyFilters };
            } else {
                return { ...prev, [name]: value };
            }
        });
    };

    const handleShowMoreNationalities = () => {
        setShowMoreNationalities(true);
    };

    return (
        <div className='flex flex-col min-h-screen justify-between'>
            <Header />
            <div className="flex">
                <div className="w-1/4 p-4">
                    <div className="mb-4">
                        <h2 className="text-lg font-bold mb-2">Buscar por Nombre</h2>
                        <input 
                            type="text" 
                            name="name" 
                            value={filters.name} 
                            onChange={handleFilterChange} 
                            className="border p-2 w-full mb-2" 
                            placeholder="Buscar receta" 
                        />
                        <button onClick={applyFilters} className="bg-blue-500 text-white p-2 w-full">Buscar</button>
                    </div>
                    <hr className="my-4" />
                    <div className="mb-4">
                        <h2 className="text-lg font-bold mb-2">Filtrar por Dificultad</h2>
                        <div>
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="difficulty" 
                                    value="Fácil" 
                                    onChange={handleFilterChange} 
                                    className="mr-2" 
                                />
                                Fácil
                            </label>
                        </div>
                        <div>
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="difficulty" 
                                    value="Media" 
                                    onChange={handleFilterChange} 
                                    className="mr-2" 
                                />
                                Media
                            </label>
                        </div>
                        <div>
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="difficulty" 
                                    value="Difícil" 
                                    onChange={handleFilterChange} 
                                    className="mr-2" 
                                />
                                Difícil
                            </label>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="mb-4">
                        <h2 className="text-lg font-bold mb-2">Filtrar por Nacionalidad</h2>
                        <input 
                            type="text" 
                            name="nationality" 
                            value={filters.nationality} 
                            onChange={handleFilterChange} 
                            className="border p-2 w-full mb-2" 
                            placeholder="Buscar nacionalidad" 
                        />
                        <div>
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="nationality" 
                                    value="Española" 
                                    onChange={handleFilterChange} 
                                    className="mr-2" 
                                />
                                Española
                            </label>
                        </div>
                        <div>
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="nationality" 
                                    value="Italiana" 
                                    onChange={handleFilterChange} 
                                    className="mr-2" 
                                />
                                Italiana
                            </label>
                        </div>
                        <div>
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="nationality" 
                                    value="Mexicana" 
                                    onChange={handleFilterChange} 
                                    className="mr-2" 
                                />
                                Mexicana
                            </label>
                        </div>
                        {showMoreNationalities && (
                            <>
                                <div>
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            name="nationality" 
                                            value="Francesa" 
                                            onChange={handleFilterChange} 
                                            className="mr-2" 
                                        />
                                        Francesa
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            name="nationality" 
                                            value="Japonesa" 
                                            onChange={handleFilterChange} 
                                            className="mr-2" 
                                        />
                                        Japonesa
                                    </label>
                                </div>
                            </>
                        )}
                        {!showMoreNationalities && (
                            <button onClick={handleShowMoreNationalities} className="bg-blue-500 text-white p-2 w-full mt-2">Ver más</button>
                        )}
                        <button onClick={applyFilters} className="bg-blue-500 text-white p-2 w-full mt-2">Filtrar</button>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center p-2 w-3/4">
                    {currentRecipes.map((recipe, index) => (
                        <Link key={index} onClick={(e) => handlePostRecipeClick(e, recipe.id)} className="flex flex-col max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
                            <div className="border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-gray-500 hover:bg-gray-100 shadow hover:shadow-md hover:shadow-gray-200 ease-in-out transition-all duration-200 flex-grow">
                                <img src={recipe.image} alt={recipe.name} className="w-full rounded-none" />
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
            </div>
            <div>
                <Pagination 
                    recipesPerPage={recipesPerPage} 
                    totalRecipes={recipes.length} 
                    paginate={paginate} 
                    currentPage={currentPage} 
                />
            </div>
            <Footer />
            {loading && <Loading />}
        </div>
    );
};

export default RecipeClient;
