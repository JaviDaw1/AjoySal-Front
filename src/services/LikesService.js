import axios from "axios";
import AuthService from "./AuthService";

export default class LikesService {
  constructor() {
    this.baseUrl = "http://localhost:8080/api/";
    this.authService = new AuthService();
  }
  
  async likeRecipe(recipeId, userId) {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post(`${this.baseUrl}likes`, { recipe: { id: recipeId }, user: { id: userId } }, { headers });
      return response.data;
    } catch (error) {
      throw new Error("Error liking recipe: " + error.message);
    }
  }

  async unlikeRecipe(recipeId, userId) {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.delete(`${this.baseUrl}likes/${recipeId}/${userId}`, { headers });
      return response.data;
    } catch (error) {
      throw new Error("Error unliking recipe: " + error.message);
    }
  }

  async isRecipeLikedByUser(recipeId, userId) {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(`${this.baseUrl}likes/isliked/${recipeId}/${userId}`, { headers });
      return response.data;
    } catch (error) {
      throw new Error("Error checking if recipe is liked: " + error.message);
    }
  }

  async getRecipesLikedByUser(userId) {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(`${this.baseUrl}likes/liked/user/${userId}`, { headers });
      return response.data;
    } catch (error) {
      throw new Error("Error checking if recipe is liked: " + error.message);
    }
  }
}
