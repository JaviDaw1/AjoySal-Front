import axios from 'axios';

class AsessmentsService {
    constructor() {
        this.baseUrl = 'http://localhost:8080/api/asessments/';
    }

    async findAsessmentsByRecipeId(recipeId) {
        try {
            const response = await axios.get(`${this.baseUrl}recipe/${recipeId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching asessments for recipe ${recipeId}:`, error);
            return [];
        }
    }

    async postAsessment(asessment) {
        try {
            const response = await axios.post(this.baseUrl, asessment);
            return response.data;
        } catch (error) {
            console.error('Error posting asessment:', error);
            throw error;
        }
    }
}

export default new AsessmentsService();
