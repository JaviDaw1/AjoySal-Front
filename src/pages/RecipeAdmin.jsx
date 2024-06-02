// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import RecipeService from '../services/RecipeService.js';
import OpinionsService from '../services/OpinionsService';
import AsessmentsService from '../services/AsessmentsService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { Rating } from 'primereact/rating';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            selectedRecipe: null,
            opinionTitle: '',
            opinionContent: '',
            asessmentRating: 0,
        };
        this.recipeService = new RecipeService();
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.handleOpinionSubmit = this.handleOpinionSubmit.bind(this);
        this.handleAsessmentSubmit = this.handleAsessmentSubmit.bind(this);
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

    async handleOpinionSubmit() {
        const { selectedRecipe, opinionTitle, opinionContent } = this.state;
        if (!opinionContent) {
            alert('Opinion content is required');
            return;
        }
        try {
            await OpinionsService.postOpinion({
                recipeId: selectedRecipe.id,
                title: opinionTitle,
                content: opinionContent,
            });
            this.setState({ opinionTitle: '', opinionContent: '' });
            alert('Opinion submitted successfully');
        } catch (error) {
            console.error('Error submitting opinion:', error);
            alert('Failed to submit opinion');
        }
    }

    async handleAsessmentSubmit() {
        const { selectedRecipe, asessmentRating } = this.state;
        if (asessmentRating === 0) {
            alert('Rating is required');
            return;
        }
        try {
            await AsessmentsService.postAsessment({
                recipeId: selectedRecipe.id,
                calification: asessmentRating,
            });
            this.setState({ asessmentRating: 0 });
            alert('Rating submitted successfully');
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Failed to submit rating');
        }
    }

    renderOpinions(opinions) {
        if (!opinions || opinions.length === 0) {
            return <p>No opinions available for this recipe.</p>;
        }
        return opinions.map(opinion => (
            <div key={opinion.id}>
                <p>Title: {opinion.title}</p>
                <p>Content: {opinion.content}</p>
            </div>
        ));
    }

    renderAsessments(asessments) {
        if (!asessments || asessments.length === 0) {
            return <p>No asessments available for this recipe.</p>;
        }
        return asessments.map(asessment => (
            <div key={asessment.id}>
                <p>Calification: {asessment.calification}</p>
            </div>
        ));
    }

    renderIngredients(ingredients) {
        if (!ingredients || ingredients.length === 0) {
            return <p>No ingredients available for this recipe.</p>;
        }
        return ingredients.map(ingredient => (
            <div key={ingredient.id}>
                <p>Name: {ingredient.name}</p>
                <p>Calories: {ingredient.calories}</p>
            </div>
        ));
    }

    deleteRecipe(id) {
        this.recipeService.deleteRecipe(id)
            .then(() => {
                this.toast.show({ severity: 'success', summary: 'Success', detail: 'Recipe deleted successfully' });
                this.loadRecipes(); // Recargar las recetas después de eliminar
            })
            .catch((error) => {
                console.error('Error deleting recipe:', error);
                this.toast.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete recipe' });
            });
    }

    confirmDelete(id) {
        confirmDialog({
            message: 'Are you sure you want to delete this recipe?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.deleteRecipe(id),
            reject: () => { }
        });
    }

    render() {
        const { recipes, selectedRecipe, opinionTitle, opinionContent, asessmentRating } = this.state;
        return (
            <div>
                <Header />
                <div className="p-grid p-justify-center">
                    <div className="p-col-8">
                        <DataTable value={recipes}>
                            <Column field="id" header="ID"></Column>
                            <Column field="name" header="Name"></Column>
                            <Column header="Ver Detalles" body={(rowData) => (
                                <Button
                                    icon="pi pi-info-circle"
                                    className="p-button-rounded p-button-info"
                                    onClick={() => this.setState({ selectedRecipe: rowData })}
                                />
                            )}></Column>
                            <Column header="Eliminar" body={(rowData) => (
                                <Button
                                    icon="pi pi-trash"
                                    className="p-button-rounded p-button-danger"
                                    onClick={() => this.confirmDelete(rowData.id)}
                                />
                            )}></Column>
                        </DataTable>
                        {selectedRecipe && (
                            <div>
                                <DataTable value={[selectedRecipe]}>
                                    <Column field="id" header="ID"></Column>
                                    <Column field="name" header="Name"></Column>
                                    <Column field="instructions" header="Instructions"></Column>
                                    <Column field="nationality" header="Nationality"></Column>
                                    <Column field="difficulty" header="Difficulty"></Column>
                                    <Column field="favorites" header="Favorites"></Column>
                                    <Column field="date" header="Date"></Column>
                                    <Column field="description" header="Description"></Column>
                                    <Column field="image" header="Image"></Column>
                                    <Column header="Opinions" body={(rowData) => this.renderOpinions(rowData.opinions)}></Column>
                                    <Column header="Assessments" body={(rowData) => this.renderAsessments(rowData.asessments)}></Column>
                                    <Column header="Ingredients" body={(rowData) => this.renderIngredients(rowData.ingredients)}></Column>
                                    <Column header="Eliminar" body={(rowData) => (
                                        <Button
                                            icon="pi pi-trash"
                                            className="p-button-rounded p-button-danger"
                                            onClick={() => this.confirmDelete(rowData.id)}
                                        />
                                    )}></Column>
                                </DataTable>
                                <Button
                                    label="Back to All Recipes"
                                    className="p-button-secondary"
                                    onClick={() => this.setState({ selectedRecipe: null })}
                                />

                                {/* Opinion Form */}
                                <div>
                                    <h3>Submit an Opinion</h3>
                                    <div>
                                        <label htmlFor="opinionTitle">Title</label>
                                        <input
                                            id="opinionTitle"
                                            type="text"
                                            value={opinionTitle}
                                            onChange={(e) => this.setState({ opinionTitle: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="opinionContent">Content</label>
                                        <textarea
                                            id="opinionContent"
                                            value={opinionContent}
                                            onChange={(e) => this.setState({ opinionContent: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <Button label="Submit Opinion" onClick={this.handleOpinionSubmit} />
                                </div>

                                {/* Assessment Form */}
                                <div>
                                    <h3>Submit a Rating</h3>
                                    <div>
                                        <Rating
                                            value={asessmentRating}
                                            cancel={false}
                                            onChange={(e) => this.setState({ asessmentRating: e.value })}
                                        />
                                    </div>
                                    <Button label="Submit Rating" onClick={this.handleAsessmentSubmit} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
