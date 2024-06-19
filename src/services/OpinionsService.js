import axios from "axios";
import AuthService from "./AuthService";

const authService = new AuthService();

export default class OpinionsService {
  baseUrl = "http://localhost:8080/api/";
  
  getAllOpinions() {
    return axios.get(this.baseUrl + "opinions").then((res) => res.data);
  }

  getOpinionById(id) {
    const token = authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios
      .get(`${this.baseUrl}opinions/${id}`, { headers })
      .then((res) => res.data);
  }

  addOpinion(opinionData) {
    const token = authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios
      .post(this.baseUrl + "opinions", opinionData, { headers })
      .then((res) => res.data);
  }

  updateOpinion(id, opinionData) {
    const token = authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios
      .put(`${this.baseUrl}opinions/${id}`, opinionData, { headers })
      .then((res) => res.data);
  }

  deleteOpinion(id) {
    const token = authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.delete(`${this.baseUrl}opinions/delete/${id}`, { headers });
  }

  getOpinionsByRecipeId(recipeId) {
    const token = authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios
      .get(`${this.baseUrl}opinions/recipe/${recipeId}`, { headers })
      .then((res) => res.data);
  }

  countOpinionsByRecipeId(recipeId) {
    const token = authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios
      .get(`${this.baseUrl}opinions/count/recipe/${recipeId}`, { headers })
      .then((res) => res.data);
  }
  
}
