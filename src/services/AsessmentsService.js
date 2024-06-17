import axios from "axios";
import AuthService from "./AuthService";

const authService = new AuthService();

export default class AsessmentsService {
  baseUrl = "http://localhost:8080/api/";

  getAllAsessments() {
    return axios.get(this.baseUrl + "asessments").then((res) => res.data);
  }

  getAsessmentsById(id) {
    const token = authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios
      .get(`${this.baseUrl}asessments/${id}`, { headers })
      .then((res) => res.data);
  }

  addAsessments(asessmentsData) {
    const token = authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios
      .post(this.baseUrl + "asessments", asessmentsData, { headers })
      .then((res) => res.data);
  }

  updateAsessments(id, asessmentsData) {
    const token = authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios
      .put(`${this.baseUrl}asessments/patch/${id}`, asessmentsData, { headers })
      .then((res) => res.data);
  }

  deleteAsessments(id) {
    const token = authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.delete(`${this.baseUrl}/${id}`, { headers });
  }

  getAsessmentsByRecipeId(recipeId) {
    const token = authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios
      .get(`${this.baseUrl}asessments/recipe/${recipeId}`, { headers })
      .then((res) => res.data);
  }

  countAsessmentsByRecipeId(recipeId) {
    const token = authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios
      .get(`${this.baseUrl}asessments/count/recipe/${recipeId}`, { headers })
      .then((res) => res.data);
  }

  getAverageRatingByRecipeId(recipeId) {
    const token = authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios
      .get(`${this.baseUrl}asessments/average/recipe/${recipeId}`, { headers })
      .then((res) => res.data);
  }
}
