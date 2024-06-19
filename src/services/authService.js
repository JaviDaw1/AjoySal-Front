export default class authService {
  constructor() {
    this.url = "http://localhost:8080/api/auth";
  }

  async login(email, password) {
    const loginRequest = {
      email: email,
      password: password,
    };
    const response = await fetch(this.url + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  }

  async signup(signupData) {
    const response = await fetch(this.url + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });
    return response.json();
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getUserInfo() {
    const userInfo = localStorage.getItem("user");
    return userInfo ? JSON.parse(userInfo) : null;
  }

  async getUploadedRecipes(userId) {
    try {
      const response = await fetch(`${this.baseUrl}recipe/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching uploaded recipes");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching uploaded recipes:", error);
      throw new Error("Error fetching uploaded recipes");
    }
  }
}
