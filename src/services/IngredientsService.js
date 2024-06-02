// IngredientsService.js
import axios from 'axios';
import AuthService from './AuthService';

const authService = new AuthService();

export default class IngredientsService {
    baseUrl = "http://localhost:8080/api/";

    getAllIngredients() {
      return axios.get(this.baseUrl + "ingredients").then((res) => res.data);
    }
    getIngredientsById(id) {
      const token = authService.getToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      return axios
        .get(`${this.baseUrl}ingredients/${id}`, { headers })
        .then((res) => res.data);
    }
    addIngredients(opinionData) {
      const token = authService.getToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      return axios
        .post(this.baseUrl + "ingredients", opinionData, { headers })
        .then((res) => res.data);
    }
    updateIngredients(id, opinionData) {
      const token = authService.getToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      return axios
        .put(`${this.baseUrl}ingredients/patch/${id}`, opinionData, { headers })
        .then((res) => res.data);
    }
    deleteIngredients(id) {
      const token = authService.getToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      return axios.delete(`${this.baseUrl}/${id}`, { headers });
    }
    getIngredientsByRecipeId(recipeId) {
        const token = authService.getToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        return axios
          .get(`${this.baseUrl}ingredients/recipe/${recipeId}`, { headers })
          .then((res) => res.data);
      }
}