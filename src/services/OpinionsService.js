import axios from 'axios';

class OpinionsService {
    constructor() {
        this.baseUrl = 'http://localhost:8080/api/opinions/';
    }

    async findOpinionsByRecipeId(recipeId) {
        try {
            const response = await axios.get(`${this.baseUrl}recipe/${recipeId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching opinions for recipe ${recipeId}:`, error);
            return [];
        }
    }

    async postOpinion(opinion) {
        try {
            const response = await axios.post(this.baseUrl, opinion);
            return response.data;
        } catch (error) {
            console.error('Error posting opinion:', error);
            throw error;
        }
    }
}

export default new OpinionsService();
