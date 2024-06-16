import React from 'react';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Importa Link para la navegación

const TableBase = ({ recipes, onDeleteRecipe }) => {
    const confirmDelete = (id) => {
        onDeleteRecipe(id);
    };

    // Ordenar los usuarios por su ID
    const sortedUsers = [...new Set(recipes.map(recipe => recipe.user.id))].sort((a, b) => a - b);

    // Ordenar las recetas para cada usuario
    const sortedRecipes = sortedUsers.map(userId => ({
        userId,
        recipes: recipes.filter(recipe => recipe.user.id === userId).sort((a, b) => a.id - b.id)
    }));

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900 mt-4">Recipes</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Lista de recetas con sus usuarios.
                    </p>
                </div>
            </div>
            <div className="mt-4 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full">
                            <thead className="bg-white">
                                <tr>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        User ID
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        User Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        ID
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Description
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Date
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Show
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Edit
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {/* Mapear y renderizar las recetas para cada usuario */}
                                {sortedRecipes.map(({ userId, recipes }) => (
                                    recipes.map((recipe, idx) => (
                                        <tr
                                            key={idx}
                                            className={idx % 2 === 0 ? undefined : 'bg-gray-50'}
                                        >
                                            <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{userId}</td>
                                            <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{recipe.user.username}</td>
                                            <td className="px-3 py-4 text-sm text-gray-500">{recipe.id}</td>
                                            <td className="px-3 py-4 text-sm text-gray-500">{recipe.name}</td>
                                            <td className="px-3 py-4 text-sm text-gray-500">{recipe.description}</td>
                                            <td className="px-3 py-4 text-sm text-gray-500">{recipe.date}</td>
                                            <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                                <Link to={`/recipes/${recipe.id}`}>
                                                    <FaEye className="text-blue-600 hover:text-blue-800 transition-all duration-200 text-lg" />
                                                </Link>
                                            </td>
                                            <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                                <Link to={`/editrecipe/${recipe.id}?sourcePage=recipeadmin`}>
                                                    <FaEdit className="text-green-600 hover:text-green-800 transition-all duration-200 mr-2 text-lg" />
                                                </Link>
                                            </td>
                                            <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                                <button
                                                    onClick={() => confirmDelete(recipe.id)}
                                                >
                                                    <FaTrash className="text-red-600 hover:text-red-800 transition-all duration-200 mr-2 text-lg" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableBase;
