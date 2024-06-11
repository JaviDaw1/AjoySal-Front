// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import RecipeService from '../services/RecipeService.js';
import { Button } from 'primereact/button';
import { FaCheckCircle, FaTrash } from 'react-icons/fa';
import Modal from '../components/Modal';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import TableBase from '../components/TableBase.jsx';

const recipeService = new RecipeService();

export default class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            selectedRecipe: null,
            opinionTitle: '',
            opinionContent: '',
            asessmentRating: 0,
            displayOpinionDialog: false,
            displayRatingDialog: false,
            deleteSuccess: false,
            showModal: false,
            selectedRecipeId: null
        };
        this.recipeService = recipeService;
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);

        this.opinionDialogFooter = (
            <div>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => this.setState({ displayOpinionDialog: false })} />
                <Button label="Submit" icon="pi pi-check" className="p-button-text" onClick={this.handleOpinionSubmit} />
            </div>
        );
        this.ratingDialogFooter = (
            <div>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => this.setState({ displayRatingDialog: false })} />
                <Button label="Submit" icon="pi pi-check" className="p-button-text" onClick={this.handleAsessmentSubmit} />
            </div>
        );
    }

    componentDidMount() {
        this.loadRecipes();
    }

    async loadRecipes() {
        try {
            const data = await this.recipeService.findAll();
            this.setState({ recipes: data });
        } catch (error) {
            console.error('Error loading recipes:', error);
        }
    }

    async deleteRecipe() {
        try {
            await this.recipeService.deleteRecipe(this.state.selectedRecipeId);
            this.setState((prevState) => ({
                recipes: prevState.recipes.filter(recipe => recipe.id !== prevState.selectedRecipeId),
                deleteSuccess: true,
                showModal: false,
                selectedRecipeId: null
            }));
            setTimeout(() => this.setState({ deleteSuccess: false }), 3000);
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    }

    openModal(id) {
        this.setState({ selectedRecipeId: id, showModal: true });
    }

    closeModal() {
        this.setState({ showModal: false, selectedRecipeId: null });
    }

    confirmDelete() {
        confirmDialog({
            message: 'Are you sure you want to delete this recipe?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: this.deleteRecipe,
            reject: () => { }
        });
    }
      

    render() {
        const { recipes, deleteSuccess, showModal } = this.state;
        return (
            <div>
                <Header />
                <div className="p-grid p-justify-center">
                    {deleteSuccess && (
                        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 bg-green-200 bg-opacity-75 px-6 py-3 rounded-md shadow-md flex items-center z-50">
                            <FaCheckCircle className="text-green-800 mr-2" />
                            <p className="text-green-800 font-bold">OK! La receta se ha eliminado correctamente.</p>
                        </div>
                    )}
                    <TableBase recipes={recipes} onDeleteRecipe={this.openModal} />
                </div>
                <Modal show={showModal} onClose={this.closeModal} onConfirm={this.deleteRecipe} />
            </div>
        );
    }
}
