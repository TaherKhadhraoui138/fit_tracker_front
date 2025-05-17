import axios from "axios";
import AuthServices from "@/services/AuthServices";

const API_URL = "http://localhost:8000/api";

class UserServices {
  getAuthHeaders() {
    const token = AuthServices.getToken();
    if (!token) {
      console.error("No auth token found. User might be logged out.");
      return {};
    }
    return { Authorization: `Bearer ${token}` };
  }

  getCurrentUser() {
    return AuthServices.getUser();
  }

  async getProfile() {
    try {
      const user = AuthServices.getUser();
      if (!user?.id) throw new Error("User not authenticated");
      
      const response = await axios.get(`${API_URL}/user/${user.id}`, { 
        headers: this.getAuthHeaders() 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch profile");
    }
  }

  async updateProfile(profileData) {
    try {
      const user = AuthServices.getUser();
      if (!user?.id) throw new Error("User not authenticated");
      
      const response = await axios.put(`${API_URL}/user/${user.id}`, profileData, {
        headers: this.getAuthHeaders()
      });
      
      // Update local user data
      const updatedUser = { ...user, ...response.data };
      AuthServices.setUser(updatedUser);
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update profile");
    }
  }


  async deleteUser(id) {
    try {
      const response = await axios.delete(`${API_URL}/user/${id}`, { headers: this.getAuthHeaders() });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete user");
    }
  }

  async getAllUsers() {
    try {
      const response = await axios.get(`${API_URL}/user`, { headers: this.getAuthHeaders() });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch users");
    }
  }

  async updateUser(id, userData) {
    try {
      const response = await axios.put(`${API_URL}/user/${id}`, userData, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update user");
    }
  }

  async createUser(userData) {
    try {
      const response = await axios.post(`${API_URL}/user`, userData, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create user");
    }
  }

  async getSubscription() {
    try {
      const response = await axios.get(`${API_URL}/user/subscription`, { headers: this.getAuthHeaders() });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch subscription");
    }
  }

  async cancelSubscription() {
    try {
      const response = await axios.post(`${API_URL}/user/subscription/cancel`, {}, { headers: this.getAuthHeaders() });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to cancel subscription");
    }
  }

  // Note: changePassword is not implemented in the current API, but included for completeness
  async changePassword(data) {
    try {
      const response = await axios.post(`${API_URL}/user/change-password`, data, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to change password");
    }
  }
}

export default new UserServices();