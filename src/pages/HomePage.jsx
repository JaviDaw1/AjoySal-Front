import React, { Component } from 'react';
import Header from '../components/Header'
import { RecipeService } from '../service/RecipeService.js';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

// function HomePage() {

//   return (
//   <div>
//     <Header />
//   </div>

//   )
// }

// export default HomePage

export default class HomePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      recipes: []
    };
    this.recipeService = new RecipeService();
  }

  componentDidMount(){
    this.recipeService.findAll().then(data => this.setState({recipes : data}));
  }

  // renderOpinions(opinions) {
  //   return opinions.map(opinion => (
  //     <div key={opinion.id}>
  //       <p>Title: {opinion.title}</p>
  //     </div>
  //   ));
  // }
  
  // renderAssessments(assessments) {
  //   return assessments.map(assessment => (
  //     <div key={assessment.id}>
  //       <p>Calification: {assessment.calification}</p>
  //     </div>
  //   ));
  // }  

  render(){
    return (
      //<div><Header />
      <DataTable value={this.state.recipes}>
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
      //</div>
    );
  }
}