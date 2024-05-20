export default class AuthService {
    constructor() {
      this.url = "http://localhost:8080/api/auth";
    }
  
    async login(email, password) {
      const loginRequest = {
        email: email,
        password: password
      };
      const response = await fetch(this.url + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginRequest)
      });
      return response.json();
    }
  
    async signup(signupData) {
      const response = await fetch(this.url + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupData)
      });
      return response.json();
    }
  }
  