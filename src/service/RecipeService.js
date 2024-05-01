import axios from 'axios';

export class RecipeService{
    getAll(){
        baseUrl = "http://localhost:8080/api/"
        return axios.get(this.baseUrl + "recipe").then(res => res.data.data);
    }
}