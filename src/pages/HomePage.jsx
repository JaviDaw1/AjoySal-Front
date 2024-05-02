// HomePage.jsx
import React, { Component } from 'react';
import Header from '../components/Header';
import { RecipeService } from '../service/RecipeService.js';
import OpinionsService from '../service/OpinionsService.js';
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
            selectedRecipe: null,
            opinions: [],
            showAllRecipes: true,
        };
        this.recipeService = new RecipeService();
    }

    componentDidMount() {
        this.loadRecipes();
    }

    loadRecipes() {
        this.recipeService.findAll().then(data => {
            this.setState({ recipes: data });
        });
    }

    fetchOpinions(recipeId) {
        OpinionsService.findOpinionsByRecipeId(recipeId).then(opinions => {
            this.setState({ opinions: opinions });
        });
    }

    renderOpinions(opinions) {
        if (!opinions) {
            return null;
        }
        return opinions.map(opinion => (
            <div key={opinion.id}>
                <p>Title: {opinion.title}</p>
                <p>Content: {opinion.content}</p>
            </div>
        ));
    }

    render() {
        const { recipes, selectedRecipe, opinions, showAllRecipes } = this.state;
        return (
            <div>
                <Header />
                <div className="p-grid p-justify-center">
                    <div className="p-col-8">
                        {showAllRecipes ? (
                            <Card title="Recipes App">
                                <DataTable value={recipes} selectionMode="single" selection={selectedRecipe} onSelectionChange={(e) => {
                                    this.setState({ selectedRecipe: e.value });
                                    if (e.value) {
                                        this.fetchOpinions(e.value.id);
                                    } else {
                                        this.setState({ opinions: [] });
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
                                </DataTable>
                            </Card>
                        ) : (
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
                                <Button label="Back to All Recipes" className="p-button-secondary" onClick={() => this.setState({ showAllRecipes: true })} />
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
