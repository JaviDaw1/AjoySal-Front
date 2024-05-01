// OpinionService.js
import axios from 'axios';

class OpinionService {
  constructor() {
    this.baseUrl = 'http://localhost:8080/api/opinions/';
  }

  async getAll() {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching opinions:', error);
      return [];
    }
  }

  async findByRecipeId(recipeId) {
    try {
      const response = await axios.get(`${this.baseUrl}recipe/${recipeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching opinions for recipe ${recipeId}:`, error);
      return [];
    }
  }
}

export default new OpinionService();
