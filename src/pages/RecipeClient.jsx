import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaChevronDown, FaChevronUp, FaFilter, FaSadTear } from 'react-icons/fa';
import { Dialog, Transition } from '@headlessui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import RecipeService from '../services/RecipeService';
import AuthService from '../services/AuthService';
import Divider from '../components/Divider';

const recipeService = new RecipeService();
const authService = new AuthService();

const RecipeClient = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        name: '',
        difficulty: [],
        nationality: [],
        nationalitySearch: ''
    });
    const [showMoreNationalities, setShowMoreNationalities] = useState(false);
    const [allNationalities, setAllNationalities] = useState([]);
    const [displayedNationalities, setDisplayedNationalities] = useState([]);
    const [open, setOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const recipesPerPage = 12;
    const navigate = useNavigate();

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const data = await recipeService.findAll();
                setRecipes(data);
                setFilteredRecipes(data);

                const nationalities = Array.from(new Set(data.map(recipe => recipe.nationality)));
                setAllNationalities(nationalities);
                setDisplayedNationalities(nationalities.slice(0, 3));
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

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };
        handleResize(); // Llamamos a la función cuando el componente se monta para establecer el estado inicial
        window.addEventListener('resize', handleResize); // Agregamos el listener para manejar el cambio de tamaño
        return () => {
            window.removeEventListener('resize', handleResize); // Limpiamos el listener cuando el componente se desmonta
        };
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
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const applyFilters = () => {
        let filtered = [...recipes];
        if (filters.name) {
            filtered = filtered.filter(recipe => recipe.name.toLowerCase().includes(filters.name.toLowerCase()));
        }
        if (filters.difficulty.length > 0) {
            filtered = filtered.filter(recipe => filters.difficulty.includes(recipe.difficulty));
        }
        if (filters.nationality.length > 0) {
            filtered = filtered.filter(recipe => filters.nationality.includes(recipe.nationality));
        }
        setFilteredRecipes(filtered);
    };

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prev => {
            if (type === 'checkbox') {
                if (name === 'difficulty') {
                    let newDifficultyFilters;
                    if (checked) {
                        newDifficultyFilters = [...prev.difficulty, value];
                    } else {
                        newDifficultyFilters = prev.difficulty.filter(item => item !== value);
                    }
                    return { ...prev, difficulty: newDifficultyFilters };
                } else if (name === 'nationality') {
                    let newNationalityFilters
                    if (checked) {
                        newNationalityFilters = [...prev.nationality, value];
                    } else {
                        newNationalityFilters = prev.nationality.filter(item => item !== value);
                    }
                    return { ...prev, nationality: newNationalityFilters };
                }
            } else {
                if (name === 'nationalitySearch') {
                    const searchValue = value.toLowerCase();
                    const filteredNationalities = allNationalities.filter(nationality =>
                        nationality.toLowerCase().includes(searchValue)
                    );
                    setDisplayedNationalities(filteredNationalities);
                    if (filteredNationalities.length > 3) {
                        setShowMoreNationalities(true);
                    } else {
                        setShowMoreNationalities(false);
                    }

                    return { ...prev, [name]: value };
                }
                return { ...prev, [name]: value };
            }
        });
    };

    useEffect(() => {
        applyFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const handleShowMoreNationalities = () => {
        setShowMoreNationalities(true);
        if (filters.nationalitySearch) {
            const filteredNationalities = allNationalities.filter(nationality =>
                nationality.toLowerCase().includes(filters.nationalitySearch.toLowerCase())
            );
            setDisplayedNationalities(filteredNationalities);
        } else {
            setDisplayedNationalities(allNationalities);
        }
    };

    const handleShowLessNationalities = () => {
        setShowMoreNationalities(false);
        if (filters.nationalitySearch) {
            const filteredNationalities = allNationalities.filter(nationality =>
                nationality.toLowerCase().includes(filters.nationalitySearch.toLowerCase())
            );
            setDisplayedNationalities(filteredNationalities);
        } else {
            setDisplayedNationalities(allNationalities.slice(0, 3));
        }
    };

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            {isSmallScreen && (
                <button onClick={handleOpenDialog} className='pt-4 items-center flex justify-end pr-5'>
                    <FaFilter className="mr-1" /> Abrir Filtros
                </button>
            )}
            <div className="flex flex-grow">
                {!isSmallScreen && (
                    <aside className="w-2/12 py-4 pl-4">
                        <div className="mb-4">
                            <h2 className="text-lg font-bold mb-2">Buscar por Nombre</h2>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                                    <FaSearch className="h-4 w-8 text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    value={filters.name}
                                    onChange={handleFilterChange}
                                    className="border p-1 pl-4 text-sm w-full"
                                    placeholder="Buscar receta"
                                />
                            </div>
                        </div>
                        <Divider className="my-4" />
                        <div className="mb-4">
                            <h2 className="text-lg font-bold mb-2">Filtrar por Dificultad</h2>
                            <div>
                                <label className="text-sm">
                                    <input
                                        type="checkbox"
                                        name="difficulty"
                                        value="Fácil"
                                        onChange={handleFilterChange}
                                        className="mr-2 rounded-sm"
                                    />
                                    Fácil
                                </label>
                            </div>
                            <div>
                                <label className="text-sm">
                                    <input
                                        type="checkbox"
                                        name="difficulty"
                                        value="Media"
                                        onChange={handleFilterChange}
                                        className="mr-2 rounded-sm"
                                    />
                                    Media
                                </label>
                            </div>
                            <div>
                                <label className="text-sm">
                                    <input
                                        type="checkbox"
                                        name="difficulty"
                                        value="Difícil"
                                        onChange={handleFilterChange}
                                        className="mr-2 rounded-sm"
                                    />
                                    Difícil
                                </label>
                            </div>
                        </div>
                        <Divider className="my-4" />
                        <div className="mb-4">
                            <h2 className="text-lg font-bold mb-2">Filtrar por Nacionalidad</h2>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                                    <FaSearch className="h-4 w-8 text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    name="nationalitySearch"
                                    value={filters.nationalitySearch}
                                    onChange={handleFilterChange}
                                    className="border p-1 pl-4 mb-2 text-sm w-full"
                                    placeholder="Buscar nacionalidad"
                                />
                            </div>
                            {displayedNationalities.map((nationality, index) => (
                                <div key={index}>
                                    <label className="text-sm">
                                        <input
                                            type="checkbox"
                                            name="nationality"
                                            value={nationality}
                                            onChange={handleFilterChange}
                                            checked={filters.nationality.includes(nationality)}
                                            className="mr-2 rounded-sm"
                                        />
                                        {nationality}
                                    </label>
                                </div>
                            ))}
                            {!showMoreNationalities && displayedNationalities.length < allNationalities.length && (
                                <button onClick={handleShowMoreNationalities} className="bg-transparent text-blue-500 p-1 text-sm w-full mt-2 flex justify-center items-center">
                                    <span className="mr-1"><FaChevronDown /></span> Mostrar más
                                </button>
                            )}
                            {showMoreNationalities && (
                                <button onClick={handleShowLessNationalities} className="bg-transparent text-blue-500 p-1 text-sm w-full mt-2 flex justify-center items-center">
                                    <span className="mr-1"><FaChevronUp /></span> Mostrar menos
                                </button>
                            )}
                        </div>
                    </aside>
                )}
                <div className="flex flex-wrap justify-center pr-2 w-full sm:w-2/3 lg:w-3/4">
                    {currentRecipes.length === 0 ? (
                        <div className="text-center flex justify-normal items-center">
                            <p className='text-gray-700 flex items-center font-semibold'>No se han encontrado recetas. <FaSadTear className="ml-2" /></p>
                        </div>
                    ) : (
                        currentRecipes.map((recipe, index) => (
                            <Link key={index} onClick={(e) => handlePostRecipeClick(e, recipe.id)} className="flex flex-col max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4">
                                <div className="border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-gray-500 hover:bg-gray-100 shadow hover:shadow-md hover:shadow-gray-200 ease-in-out transition-all duration-200 flex-grow">
                                    <img src={recipe.image} alt={recipe.name} className="w-full rounded-none" />
                                    <div className="p-3">
                                        <h1 className="text-lg font-bold mb-2">{recipe.name}</h1>
                                        <Divider className="my-4" />
                                        <p className="text-sm text-gray-700 mb-2">{recipe.description}</p>
                                        <p className="text-sm text-gray-700"><strong>Autor: </strong> {recipe.user.username}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
            <Transition show={open} as={React.Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto"
                    onClose={handleCloseDialog}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                        </Transition.Child>

                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <div>
                                    <h2 className="text-lg font-bold mb-2">Buscar por Nombre</h2>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                                            <FaSearch className="h-4 w-8 text-gray-400" />
                                        </span>
                                        <input
                                            type="text"
                                            name="name"
                                            value={filters.name}
                                            onChange={handleFilterChange}
                                            className="border p-1 pl-4 text-sm w-full"
                                            placeholder="Buscar receta"
                                        />
                                    </div>
                                </div>
                                <Divider className="my-4" />
                                <div>
                                    <h2 className="text-lg font-bold mb-2">Filtrar por Dificultad</h2>
                                    <div>
                                        <label className="text-sm">
                                            <input
                                                type="checkbox"
                                                name="difficulty"
                                                value="Fácil"
                                                onChange={handleFilterChange}
                                                className="mr-2 rounded-sm"
                                            />
                                            Fácil
                                        </label>
                                    </div>
                                    <div>
                                        <label className="text-sm">
                                            <input
                                                type="checkbox"
                                                name="difficulty"
                                                value="Media"
                                                onChange={handleFilterChange}
                                                className="mr-2 rounded-sm"
                                            />
                                            Media
                                        </label>
                                    </div>
                                    <div>
                                        <label className="text-sm">
                                            <input
                                                type="checkbox"
                                                name="difficulty"
                                                value="Difícil"
                                                onChange={handleFilterChange}
                                                className="mr-2 rounded-sm"
                                            />
                                            Difícil
                                        </label>
                                    </div>
                                </div>
                                <Divider className="my-4" />
                                <div>
                                    <h2 className="text-lg font-bold mb-2">Filtrar por Nacionalidad</h2>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                                            <FaSearch className="h-4 w-8 text-gray-400" />
                                        </span>
                                        <input
                                            type="text"
                                            name="nationalitySearch"
                                            value={filters.nationalitySearch}
                                            onChange={handleFilterChange}
                                            className="border p-1 pl-4 mb-2 text-sm w-full"
                                            placeholder="Buscar nacionalidad"
                                        />
                                    </div>
                                    {displayedNationalities.map((nationality, index) => (
                                        <div key={index}>
                                            <label className="text-sm">
                                                <input
                                                    type="checkbox"
                                                    name="nationality"
                                                    value={nationality}
                                                    onChange={handleFilterChange}
                                                    checked={filters.nationality.includes(nationality)}
                                                    className="mr-2 rounded-sm"
                                                />
                                                {nationality}
                                            </label>
                                        </div>
                                    ))}
                                    {!showMoreNationalities && (
                                        <button onClick={handleShowMoreNationalities} className="bg-transparent text-blue-500 p-1 text-sm w-full mt-2 flex justify-center items-center">
                                            <span className="mr-1"><FaChevronDown /></span> Mostrar más
                                        </button>
                                    )}
                                    {showMoreNationalities && (
                                        <button onClick={handleShowLessNationalities} className="bg-transparent text-blue-500 p-1 text-sm w-full mt-2 flex justify-center items-center">
                                            <span className="mr-1"><FaChevronUp /></span> Mostrar menos
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
            <div>
                <Pagination
                    recipesPerPage={recipesPerPage}
                    totalRecipes={filteredRecipes.length}
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
