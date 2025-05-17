import axios from "axios";
import AuthServices from "@/services/AuthServices";

const API_URL = "http://localhost:8000/api";

class ProductServices {
  getAuthHeaders() {
    const token = AuthServices.getToken();
    if (!token) {
      console.error("No auth token found. User might be logged out.");
      return {};
    }
    return { Authorization: `Bearer ${token}` };
  }

  // General Product Endpoints
  async getAllProducts() {
    try {
      const response = await axios.get(`${API_URL}/GymProduct`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch products");
    }
  }

  async getProductById(id) {
    try {
      const response = await axios.get(`${API_URL}/GymProduct/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Product not found");
    }
  }

  async createProduct(productData) {
    try {
      const response = await axios.post(`${API_URL}/GymProduct`, productData, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create product");
    }
  }

  async updateProduct(id, productData) {
    try {
      const response = await axios.put(`${API_URL}/GymProduct/${id}`, productData, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update product");
    }
  }

  async deleteProduct(id) {
    try {
      const response = await axios.delete(`${API_URL}/GymProduct/${id}`, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete product");
    }
  }

  // Category Specific Endpoints
  async getSupplements() {
    try {
      const response = await axios.get(`${API_URL}/supplements`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch supplements");
    }
  }

  async createSupplement(supplementData) {
    try {
      const response = await axios.post(`${API_URL}/supplements`, supplementData, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create supplement");
    }
  }

  async getClothing() {
    try {
      const response = await axios.get(`${API_URL}/clothing`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch clothing");
    }
  }

  async createClothing(clothingData) {
    try {
      const response = await axios.post(`${API_URL}/clothing`, clothingData, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create clothing item");
    }
  }

  async getAccessories() {
    try {
      const response = await axios.get(`${API_URL}/accessories`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch accessories");
    }
  }

  async createAccessory(accessoryData) {
    try {
      const response = await axios.post(`${API_URL}/accessories`, accessoryData, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create accessory");
    }
  }

  // Admin Product Management
  async createProductAdmin(productData) {
    try {
      const response = await axios.post(`${API_URL}/admin/products`, productData, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Admin product creation failed");
    }
  }

  async updateProductAdmin(id, productData) {
    try {
      const response = await axios.put(`${API_URL}/admin/products/${id}`, productData, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Admin product update failed");
    }
  }

  async deleteProductAdmin(id) {
    try {
      const response = await axios.delete(`${API_URL}/admin/products/${id}`, {
        headers: this.getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Admin product deletion failed");
    }
  }

//   // Product Search
//   async searchProducts(query) {
//     try {
//       const response = await axios.post(`${API_URL}/lookForProduct`, { query });
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || "Product search failed");
//     }
//   }
}

export default new ProductServices();