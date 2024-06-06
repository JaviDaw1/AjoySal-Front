// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import RecipeService from '../services/RecipeService.js';
import OpinionsService from '../services/OpinionsService';
import AsessmentsService from '../services/AsessmentsService';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
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
            displayOpinionDialog: false,
            displayRatingDialog: false
        };
        this.recipeService = new RecipeService();
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.handleOpinionSubmit = this.handleOpinionSubmit.bind(this);
        this.handleAsessmentSubmit = this.handleAsessmentSubmit.bind(this);
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
            this.setState({ opinionTitle: '', opinionContent: '', displayOpinionDialog: false });
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
            this.setState({ asessmentRating: 0, displayRatingDialog: false });
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
            return <p>No assessments available for this recipe.</p>;
        }
        return asessments.map(asessment => (
            <div key={asessment.id}>
                <p>Calification: {asessment.calification}</p>
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
                            <Column header="View Details" body={(rowData) => (
                                <Button
                                    icon="pi pi-info-circle"
                                    className="p-button-rounded p-button-info"
                                    onClick={() => this.setState({ selectedRecipe: rowData })}
                                />
                            )}></Column>
                            <Column header="Delete" body={(rowData) => (
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
                                    <Column header="Assessments" body={(rowData) => this.renderAsessments(rowData.assessments)}></Column>
                                    <Column header="Delete" body={(rowData) => (
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
                                    <div className="mb-4">
                                        <label htmlFor="opinionTitle" className="block text-gray-700">Title</label>
                                        <input
                                            id="opinionTitle"
                                            type="text"
                                            value={opinionTitle}
                                            onChange={(e) => this.setState({ opinionTitle: e.target.value })}
                                            className="form-input mt-1 block w-full rounded-md border-gray-300"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="opinionContent" className="block text-gray-700">Content</label>
                                        <textarea
                                            id="opinionContent"
                                            value={opinionContent}
                                            onChange={(e) => this.setState({ opinionContent: e.target.value })}
                                            required
                                            className="form-textarea mt-1 block w-full rounded-md border-gray-300"
                                        />
                                    </div>
                                    <Button label="Submit Opinion" className="p-button-success" onClick={() => this.setState({ displayOpinionDialog: true })} />
                                </div>

                                {/* Assessment Form */}
                                <div>
                                    <h3>Submit a Rating</h3>
                                    <div className="mb-4">
                                        <Rating
                                            value={asessmentRating}
                                            cancel={false}
                                            onChange={(e) => this.setState({ asessmentRating: e.value })}
                                            className="inline-block"
                                        />
                                    </div>
                                    <Button label="Submit Rating" className="p-button-success" onClick={() => this.setState({ displayRatingDialog: true })} />
                                </div>

                                <Dialog visible={this.state.displayOpinionDialog} style={{ width: '450px' }} header="Submit Opinion" modal footer={this.opinionDialogFooter} onHide={() => this.setState({ displayOpinionDialog: false })}>
                                    <div className="p-grid p-fluid">
                                        <div className="p-field p-col-12 p-md-12">
                                            <label htmlFor="opinionTitle">Title</label>
                                            <InputText id="opinionTitle" value={opinionTitle} onChange={(e) => this.setState({ opinionTitle: e.target.value })} />
                                        </div>
                                        <div className="p-field p-col-12 p-md-12">
                                            <label htmlFor="opinionContent">Content</label>
                                            <InputTextarea id="opinionContent" value={opinionContent} onChange={(e) => this.setState({ opinionContent: e.target.value })} rows={4} />
                                        </div>
                                    </div>
                                </Dialog>

                                {/* Rating Dialog */}
                                <Dialog visible={this.state.displayRatingDialog} style={{ width: '450px' }} header="Submit Rating" modal footer={this.ratingDialogFooter} onHide={() => this.setState({ displayRatingDialog: false })}>
                                    <div className="p-grid p-fluid">
                                        <div className="p-field p-col-12 p-md-12">
                                            <label htmlFor="asessmentRating">Rating</label>
                                            <Rating id="asessmentRating" value={asessmentRating} onChange={(e) => this.setState({ asessmentRating: e.value })} cancel={false} />
                                        </div>
                                    </div>
                                </Dialog>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

