// HomePage.jsx
import React, { Component } from 'react';
import Header from '../components/Header';
import { RecipeService } from '../service/RecipeService.js';
import OpinionsService from '../service/OpinionsService.js';
import AsessmentsService from '../service/AsessmentsService.js';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            selectedRecipe: {},
            opinions: [],
            asessments: [],
            showAllRecipes: true,
        };
        this.recipeService = new RecipeService();
        this.opinionsService = OpinionsService;
        this.asessmentsService = new AsessmentsService(); // Create a new instance of AsessmentsService
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

    fetchOpinions = async (recipeId) => {
        try {
            const opinions = await this.opinionsService.findOpinionsByRecipeId(recipeId);
            this.setState({ opinions });
        } catch (error) {
            console.error('Error fetching opinions:', error);
        }
    };

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

    fetchAsessments = async (recipeId) => {
        try {
            const asessments = await this.asessmentsService.findAsessmentsByRecipeId(recipeId);
            this.setState({ asessments });
        } catch (error) {
            console.error('Error fetching asessments:', error);
        }
    };

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

    render() {
        const { recipes, selectedRecipe, opinions, asessments, showAllRecipes } = this.state;
        return (
            <div>
                <Header />
                <div className="p-grid p-justify-center">
                    <div className="p-col-8">
                        {showAllRecipes ? (
                            <Card title="Recipes App">
                                <DataTable value={recipes} selectionMode="single" selection={selectedRecipe} onSelectionChange={(e) => {
                                    console.log('Selected Recipe:', e.value);
                                    if (selectedRecipe && e.value && e.value.id === selectedRecipe.id) {
                                        return;
                                    }
                                    this.setState({ selectedRecipe: e.value });
                                    if (e.value) {
                                        this.fetchOpinions(e.value.id);
                                        this.fetchAsessments(e.value.id);
                                    } else {
                                        this.setState({ opinions: [], asessments: [] });
                                    }
                                }}>
                                    <Column field="id" header="ID"></Column>
                                    <Column field="name" header="Name"></Column>
                                    <Column field="ingredients" header="Ingredients"></Column>
                                    <Column field="instructions" header="Instructions"></Column>
                                    <Column field="nationality" header="Nationality"></Column>
                                    <Column field="difficulty" header="Difficulty"></Column>
                                    <Column field="favorites" header="Favorites"></Column>
                                    <Column field="date" header="Date"></Column>
                                    <Column field="description" header="Description"></Column>
                                    {/* <Column header="Opinions" body={(rowData) => this.renderOpinions(rowData.opinions)}></Column>
                                    <Column header="Assessments" body={(rowData) => this.renderAsessments(rowData.asessments)}></Column> */}
                                </DataTable>
                            </Card>
                        ) : (
                            <div>
                                {console.log("llego")}
                                <Card title="Recipe Details">
                                    <h3>{selectedRecipe.name}</h3>
                                    <p>ID: {selectedRecipe.id}</p>
                                    <p>Ingredients: {selectedRecipe.ingredients}</p>
                                    <p>Instructions: {selectedRecipe.instructions}</p>
                                    <p>Nationality: {selectedRecipe.nationality}</p>
                                    <p>Difficulty: {selectedRecipe.difficulty}</p>
                                    <p>Favorites: {selectedRecipe.favorites ? 'Yes' : 'No'}</p>
                                    <p>Date: {selectedRecipe.date}</p>
                                    <p>Description: {selectedRecipe.description}</p>
                                    <h4>Opinions:</h4>
                                    {this.renderOpinions(opinions)}
                                    <h4>Asessments:</h4>
                                    {this.renderAsessments(asessments)}
                                    <Button label="Back to All Recipes" className="p-button-secondary" onClick={() => this.setState({ showAllRecipes: true })} />
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}