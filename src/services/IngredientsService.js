// IngredientsService.js
import axios from 'axios';

class IngredientsService {
    constructor() {
        this.baseUrl = 'http://localhost:8080/api/ingredients/';
    }

    async findIngredientsByRecipeId(recipeId) {
        try {
            const response = await axios.get(`${this.baseUrl}recipe/${recipeId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching ingredients for recipe ${recipeId}:`, error);
            return [];
        }
    }
}

export default IngredientsService;