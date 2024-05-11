// RecipeService.js
import axios from 'axios';

export class RecipeService {
    baseUrl = "http://localhost:8080/api/";

    findAll() {
        return axios.get(this.baseUrl + "recipe").then(res => res.data);
    }

    findById(id) {
        return axios.get(this.baseUrl + `recipe/${id}`).then(res => res.data);
    }
}