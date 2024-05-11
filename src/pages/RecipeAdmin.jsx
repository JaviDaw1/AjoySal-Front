// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import { RecipeService } from '../services/RecipeService.js';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            selectedRecipe: null,
        };
        this.recipeService = new RecipeService();
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
    }

    componentDidMount() {
        this.loadRecipes();
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

    loadRecipes = async () => {
        try {
            const data = await this.recipeService.findAll();
            this.setState({ recipes: data });
        } catch (error) {
            console.error('Error loading recipes:', error);
        }
    };

    deleteRecipe(id) {
        this.recipeService.deleteRecipe(id)
            .then(() => {
                this.toast.show({severity:'success', summary:'Success', detail:'Recipe deleted successfully'});
                this.loadRecipes(); // Recargar las recetas después de eliminar
            })
            .catch((error) => {
                console.error('Error deleting recipe:', error);
                this.toast.show({severity:'error', summary:'Error', detail:'Failed to delete recipe'});
            });
    }

    confirmDelete(id) {
        confirmDialog({
            message: 'Are you sure you want to delete this recipe?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.deleteRecipe(id),
            reject: () => {}
        });
    }

    render() {
        const { recipes, selectedRecipe } = this.state;
        return (
            <div>
                <Header />
                <div className="p-grid p-justify-center">
                    <div className="p-col-8">
                        <DataTable value={recipes}>
                            <Column field="id" header="ID"></Column>
                            <Column field="name" header="Name"></Column>
                            <Column field="ingredients" header="Ingredients"></Column>
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
                                    <Column field="ingredients" header="Ingredients"></Column>
                                    <Column field="instructions" header="Instructions"></Column>
                                    <Column field="nationality" header="Nationality"></Column>
                                    <Column field="difficulty" header="Difficulty"></Column>
                                    <Column field="favorites" header="Favorites"></Column>
                                    <Column field="date" header="Date"></Column>
                                    <Column field="description" header="Description"></Column>
                                    <Column field="image" header="Image"></Column>
                                    <Column header="Opinions" body={(rowData) => this.renderOpinions(rowData.opinions)}></Column>
                                    <Column header="Assessments" body={(rowData) => this.renderAsessments(rowData.asessments)}></Column>
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
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}