import { Fragment } from 'react'

const initialState = {
    recipes: [
        { id: 1, name: 'Front-end Developer', description: 'lindsay.walton@example.com', date: 'Member' },
        { id: 2, name: 'Front-end Developer', description: 'lindsay.walton@example.com', date: 'Member' },
        { id: 3, name: 'Front-end Developer', description: 'lindsay.walton@example.com', date: 'Member' },
    ]
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function TableBase({ recipes = initialState.recipes, ...props }) {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full">
                            <thead className="bg-white">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
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
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                    <Fragment key={'Hola'}>
                                        {(recipes || []).map((recipe, idx) => (
                                            <tr
                                                key={idx}
                                                className={classNames(idx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                                            >
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                    {recipe.id}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{recipe.name}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{recipe.description}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{recipe.date}</td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                        Edit<span className="sr-only">, {recipe.name}</span>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </Fragment>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}