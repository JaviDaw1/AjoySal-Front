// RecipeService.js
import axios from "axios";
import AuthService from "./AuthService";

const authService = new AuthService();

export class RecipeService {
  baseUrl = "http://localhost:8080/api/";

  findAll() {
    return axios.get(this.baseUrl + "recipe").then((res) => res.data);
  }

  findById(id) {
    const token = authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios
      .get(this.baseUrl + `recipe/${id}`, { headers })
      .then((res) => res.data);
  }

  postRecipe(recipeData) {
    const token = authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios
      .post(this.baseUrl + "recipe", recipeData, { headers })
      .then((res) => res.data);
  }

  updateRecipe(id, recipeData) {
    const token = authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios
      .put(`${this.baseUrl}recipe/${id}`, recipeData, { headers })
      .then((res) => res.data);
  }

  deleteRecipe(id) {
    const token = authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.delete(`${this.baseUrl}recipe/${id}`, { headers });
  }
}
