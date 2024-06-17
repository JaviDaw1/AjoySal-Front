// eslint-disable-next-line no-unused-vars
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

// eslint-disable-next-line react/prop-types
const Pagination = ({ recipesPerPage, totalRecipes, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalRecipes / recipesPerPage);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ChevronLeftIcon className="h-5 w-5 mr-1" aria-hidden="true" />
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
          <ChevronRightIcon className="h-5 w-5 ml-1" aria-hidden="true" />
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando{' '}
            <span className="font-medium">
              {((currentPage - 1) * recipesPerPage) + 1}
            </span>{' '}
            a{' '}
            <span className="font-medium">
              {Math.min(currentPage * recipesPerPage, totalRecipes)}
            </span>{' '}
            de{' '}
            <span className="font-medium">{totalRecipes}</span> resultados
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center transition-all duration-200 ease-in-out ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} px-3 py-2 text-sm font-semibold focus:z-20 ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
            >
              <ChevronLeftIcon className="h-5 w-8" aria-hidden="true" />
            </button>
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`relative inline-flex items-center transition-all duration-200 ease-in-out ${number === currentPage ? 'bg-yellow-500 text-gray-900' : 'bg-white text-gray-900'} px-4 py-2 text-sm font-semibold focus:z-20 ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center transition-all duration-200 ease-in-out ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''} px-3 py-2 text-sm font-semibold focus:z-20 ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
            >
              <ChevronRightIcon className="h-5 w-8" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;