import axios from "axios";

const API_URL = "http://localhost:8000/api";

class AuthService {
  async login(credentials) {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      headers: { "Content-Type": "application/json" },
    });

    const user = response.data.user;
    const token = response.data.token;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("auth_token", token);

    // Set default Authorization header for future requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return response.data;
  }

  async register(userData) {
    return axios.post(`${API_URL}/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });
  }

  async logout() {
    const token = this.getToken();
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    await axios.post(`${API_URL}/logout`);
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
    delete axios.defaults.headers.common["Authorization"];
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getToken() {
    return localStorage.getItem("auth_token");
  }

  getCurrentUser() {
    return this.getUser();
  }

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  // New method to check user role
  getUserRole() {
    const user = this.getUser();
    return user ? user.role : null;
  }

  // New method to get the user's join/created date
  getJoinDate() {
    const user = this.getUser();
    // Assumes the user object has a 'created_at' field
    return user && user.createdat ? user.createdat : null;
  }
  static setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  
  static clearUser() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();