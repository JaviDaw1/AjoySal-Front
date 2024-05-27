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
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
        }
        return data;
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

    logout() {
        localStorage.removeItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

// Función para verificar si el usuario es admin
  static async isUserAdmin() {
  const token = localStorage.getItem('token');
  if (!token) {
    return false; // No hay token, el usuario no está autenticado
  }

  try {
    const response = await fetch("http://localhost:8080/api/auth/isAdmin", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      return false; // La solicitud no fue exitosa, el usuario no es admin
    }

    const data = await response.json();
    return data.isAdmin; // Suponiendo que el backend devuelve un objeto con la propiedad isAdmin
  } catch (error) {
    console.error("Error fetching isAdmin status:", error);
    return false; // Error al hacer la solicitud, el usuario no es admin
  }
}
}
  