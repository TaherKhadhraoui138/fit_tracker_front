<template>
    <div class="container py-5">
      <header class="admin-header mb-5">
        <div>
          <h1 class="display-5 fw-bold text-dark">Manage Products</h1>
          <p class="text-secondary fs-5">Add, edit, or remove supplements, clothes, and accessories</p>
        </div>
        <button class="btn btn-primary add-product-btn" @click="showAddModal = true">
          <i class="bi bi-plus-circle me-2"></i> Add New Product
        </button>
      </header>

      <div class="mb-4">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeTab === 'supplements' }" href="#supplements" data-bs-toggle="tab" @click="setActiveTab('supplements')">Supplements</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeTab === 'clothes' }" href="#clothes" data-bs-toggle="tab" @click="setActiveTab('clothes')">Clothes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeTab === 'accessories' }" href="#accessories" data-bs-toggle="tab" @click="setActiveTab('accessories')">Accessories</a>
          </li>
        </ul>
      </div>

      <div class="tab-content">
        <div class="tab-pane fade" :class="{ 'show active': activeTab === 'supplements' }" id="supplements">
          <h3 class="text-dark mb-4">Supplements</h3>
          <div class="table-container">
            <table class="table table-striped table-hover align-middle">
              <thead class="table-header">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Flavor</th>
                  <th>Weight (kg)</th>
                  <th>Form</th>
                  <th>Price ($)</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in supplements" :key="product.id">
                  <td>{{ product.id }}</td>
                  <td>{{ product.name }}</td>
                  <td>{{ product.description || 'N/A' }}</td>
                  <td>{{ product.supplement?.flavor || 'N/A' }}</td>
                  <td>{{ product.supplement?.weight || 'N/A' }}</td>
                  <td>{{ product.supplement?.form || 'N/A' }}</td>
                  <td>
                    {{ typeof product.price === 'number' 
                        ? `$${product.price.toFixed(2)}` 
                        : (product.price ? `$${Number(product.price).toFixed(2)}` : 'N/A') 
                    }}
                  </td>
                  <td :class="{ 'low-stock': product.stock <= 5 }">
                    {{ product.stock !== undefined ? product.stock : 'N/A' }}
                  </td>
                  <td class="action-buttons">
                    <button class="btn btn-warning btn-sm me-2" @click.stop="openEditModal(product, 'supplements')"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-danger btn-sm" @click.stop="deleteProduct(product, 'supplements')"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="tab-pane fade" :class="{ 'show active': activeTab === 'clothes' }" id="clothes">
          <h3 class="text-dark mb-4">Clothes</h3>
          <div class="table-container">
            <table class="table table-striped table-hover align-middle">
              <thead class="table-header">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Gender</th>
                  <th>Material</th>
                  <th>Price ($)</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in clothes" :key="product.id">
                  <td>{{ product.id }}</td>
                  <td>{{ product.name }}</td>
                  <td>{{ product.description || 'N/A' }}</td>
                  <td>{{ product.clothing?.size || 'N/A' }}</td>
                  <td>{{ product.clothing?.color || 'N/A' }}</td>
                  <td>{{ product.clothing?.gender || 'N/A' }}</td>
                  <td>{{ product.clothing?.material || 'N/A' }}</td>
                  <td>
                    {{ typeof product.price === 'number' 
                        ? `$${product.price.toFixed(2)}` 
                        : (product.price ? `$${Number(product.price).toFixed(2)}` : 'N/A') 
                    }}
                  </td>
                  <td :class="{ 'low-stock': product.stock <= 5 }">
                    {{ product.stock !== undefined ? product.stock : 'N/A' }}
                  </td>
                  <td class="action-buttons">
                    <button class="btn btn-warning btn-sm me-2" @click.stop="openEditModal(product, 'clothes')"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-danger btn-sm" @click.stop="deleteProduct(product, 'clothes')"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="tab-pane fade" :class="{ 'show active': activeTab === 'accessories' }" id="accessories">
          <h3 class="text-dark mb-4">Accessories</h3>
          <div class="table-container">
            <table class="table table-striped table-hover align-middle">
              <thead class="table-header">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Material</th>
                  <th>Brand</th>
                  <th>Size</th>
                  <th>Weight (kg)</th>
                  <th>Price ($)</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in accessories" :key="product.id">
                  <td>{{ product.id }}</td>
                  <td>{{ product.name }}</td>
                  <td>{{ product.description || 'N/A' }}</td>
                  <td>{{ product.accessory?.material || 'N/A' }}</td>
                  <td>{{ product.accessory?.brand || 'N/A' }}</td>
                  <td>{{ product.accessory?.size || 'N/A' }}</td>
                  <td>{{ product.accessory?.weight || 'N/A' }}</td>
                  <td>
                    {{ typeof product.price === 'number' 
                        ? `$${product.price.toFixed(2)}` 
                        : (product.price ? `$${Number(product.price).toFixed(2)}` : 'N/A') 
                    }}
                  </td>
                  <td :class="{ 'low-stock': product.stock <= 5 }">
                    {{ product.stock !== undefined ? product.stock : 'N/A' }}
                  </td>
                  <td class="action-buttons">
                    <button class="btn btn-warning btn-sm me-2" @click.stop="openEditModal(product, 'accessories')"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-danger btn-sm" @click.stop="deleteProduct(product, 'accessories')"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Add Product Modal -->
      <div class="modal fade" tabindex="-1" :class="{ show: showAddModal }" :style="{ display: showAddModal ? 'block' : 'none' }" @click.self="showAddModal = false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add New Product</h5>
              <button type="button" class="btn-close" @click="showAddModal = false" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="createProduct">
                <div class="mb-3">
                  <label for="addCategory" class="form-label">Category</label>
                  <select class="form-select" id="addCategory" v-model="newProduct.category" @change="resetNewProductFields" required>
                    <option value="" disabled>Select Category</option>
                    <option value="supplements">Supplements</option>
                    <option value="clothes">Clothes</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="addName" class="form-label">Name</label>
                  <input type="text" class="form-control" id="addName" v-model="newProduct.name" required />
                </div>
                <div class="mb-3">
                  <label for="addDescription" class="form-label">Description</label>
                  <textarea class="form-control" id="addDescription" v-model="newProduct.description" rows="3" required></textarea>
                </div>
                <div class="mb-3">
                  <label for="addPrice" class="form-label">Price ($)</label>
                  <input type="number" step="0.01" class="form-control" id="addPrice" v-model="newProduct.price" required />
                </div>
                <div class="mb-3">
                  <label for="addStock" class="form-label">Stock</label>
                  <input type="number" class="form-control" id="addStock" v-model="newProduct.stock" required />
                </div>

                <!-- Supplements Fields -->
                <template v-if="newProduct.category === 'supplements'">
                  <div class="mb-3">
                    <label for="addFlavor" class="form-label">Flavor</label>
                    <input
                      type="text"
                      class="form-control"
                      id="addFlavor"
                      v-model="newProduct.flavor"
                      :required="newProduct.category === 'supplements'"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="addWeight" class="form-label">Weight (kg)</label>
                    <input type="number" step="0.01" class="form-control" id="addWeight" v-model="newProduct.weight" required />
                  </div>
                  <div class="mb-3">
                    <label for="addForm" class="form-label">Form</label>
                    <select class="form-select" id="addForm" v-model="newProduct.form" required>
                      <option value="" disabled>Select Form</option>
                      <option value="Powder">Powder</option>
                      <option value="Capsule">Capsule</option>
                      <option value="Tablet">Tablet</option>
                      <option value="Liquid">Liquid</option>
                    </select>
                  </div>
                </template>

                <!-- Clothes Fields -->
                <template v-if="newProduct.category === 'clothes'">
                  <div class="mb-3">
                    <label for="addSize" class="form-label">Size</label>
                    <select class="form-select" id="addSize" v-model="newProduct.size" required>
                      <option value="" disabled>Select Size</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="addColor" class="form-label">Color</label>
                    <input type="text" class="form-control" id="addColor" v-model="newProduct.color" required />
                  </div>
                  <div class="mb-3">
                    <label for="addGender" class="form-label">Gender</label>
                    <select class="form-select" id="addGender" v-model="newProduct.gender" required>
                      <option value="" disabled>Select Gender</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="addMaterial" class="form-label">Material</label>
                    <input type="text" class="form-control" id="addMaterial" v-model="newProduct.material" required />
                  </div>
                </template>

                <!-- Accessories Fields -->
                <template v-if="newProduct.category === 'accessories'">
                  <div class="mb-3">
                    <label for="addMaterial" class="form-label">Material</label>
                    <input type="text" class="form-control" id="addMaterial" v-model="newProduct.material" required />
                  </div>
                  <div class="mb-3">
                    <label for="addBrand" class="form-label">Brand</label>
                    <input type="text" class="form-control" id="addBrand" v-model="newProduct.brand" required />
                  </div>
                  <div class="mb-3">
                    <label for="addSize" class="form-label">Size</label>
                    <input type="text" class="form-control" id="addSize" v-model="newProduct.size" required />
                  </div>
                  <div class="mb-3">
                    <label for="addWeight" class="form-label">Weight (kg)</label>
                    <input type="number" step="0.01" class="form-control" id="addWeight" v-model="newProduct.weight" required />
                  </div>
                </template>

                <button type="submit" class="btn btn-primary">Save</button>
                <button type="button" class="btn btn-secondary ms-2" @click="showAddModal = false">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Product Modal -->
      <div class="modal fade" tabindex="-1" :class="{ show: showEditModal }" :style="{ display: showEditModal ? 'block' : 'none' }" @click.self="showEditModal = false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Product</h5>
              <button type="button" class="btn-close" @click="showEditModal = false" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form v-if="editProduct" @submit.prevent="updateProduct">
                <input type="hidden" v-model="editProduct.id" />
                <div class="mb-3">
                  <label for="editName" class="form-label">Name</label>
                  <input type="text" class="form-control" id="editName" v-model="editProduct.name" required />
                </div>
                <div class="mb-3">
                  <label for="editDescription" class="form-label">Description</label>
                  <textarea class="form-control" id="editDescription" v-model="editProduct.description" rows="3" required></textarea>
                </div>
                <div class="mb-3">
                  <label for="editPrice" class="form-label">Price ($)</label>
                  <input type="number" step="0.01" class="form-control" id="editPrice" v-model="editProduct.price" required />
                </div>
                <div class="mb-3">
                  <label for="editStock" class="form-label">Stock</label>
                  <input type="number" class="form-control" id="editStock" v-model="editProduct.stock" required />
                </div>

                <!-- Supplements Fields -->
                <template v-if="editProductCategory === 'supplements'">
                  <div class="mb-3">
                    <label for="editFlavor" class="form-label">Flavor</label>
                    <input type="text" class="form-control" id="editFlavor" v-model="editProduct.supplement.flavor" required />
                  </div>
                  <div class="mb-3">
                    <label for="editWeight" class="form-label">Weight (kg)</label>
                    <input type="number" step="0.01" class="form-control" id="editWeight" v-model="editProduct.supplement.weight" required />
                  </div>
                  <div class="mb-3">
                    <label for="editForm" class="form-label">Form</label>
                    <select class="form-select" id="editForm" v-model="editProduct.supplement.form" required>
                      <option value="" disabled>Select Form</option>
                      <option value="Powder">Powder</option>
                      <option value="Capsule">Capsule</option>
                      <option value="Tablet">Tablet</option>
                      <option value="Liquid">Liquid</option>
                    </select>
                  </div>
                </template>

                <!-- Clothes Fields -->
                <template v-if="editProductCategory === 'clothes'">
                  <div class="mb-3">
                    <label for="editSize" class="form-label">Size</label>
                    <select class="form-select" id="editSize" v-model="editProduct.clothing.size" required>
                      <option value="" disabled>Select Size</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="editColor" class="form-label">Color</label>
                    <input type="text" class="form-control" id="editColor" v-model="editProduct.clothing.color" required />
                  </div>
                  <div class="mb-3">
                    <label for="editGender" class="form-label">Gender</label>
                    <select class="form-select" id="editGender" v-model="editProduct.clothing.gender" required>
                      <option value="" disabled>Select Gender</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="editMaterial" class="form-label">Material</label>
                    <input type="text" class="form-control" id="editMaterial" v-model="editProduct.clothing.material" required />
                  </div>
                </template>

                <!-- Accessories Fields -->
                <template v-if="editProductCategory === 'accessories'">
                  <div class="mb-3">
                    <label for="editMaterial" class="form-label">Material</label>
                    <input type="text" class="form-control" id="editMaterial" v-model="editProduct.accessory.material" required />
                  </div>
                  <div class="mb-3">
                    <label for="editBrand" class="form-label">Brand</label>
                    <input type="text" class="form-control" id="editBrand" v-model="editProduct.accessory.brand" required />
                  </div>
                  <div class="mb-3">
                    <label for="editSize" class="form-label">Size</label>
                    <input type="text" class="form-control" id="editSize" v-model="editProduct.accessory.size" required />
                  </div>
                  <div class="mb-3">
                    <label for="editWeight" class="form-label">Weight (kg)</label>
                    <input type="number" step="0.01" class="form-control" id="editWeight" v-model="editProduct.accessory.weight" required />
                  </div>
                </template>

                <button type="submit" class="btn btn-primary">Save Changes</button>
                <button type="button" class="btn btn-secondary ms-2" @click="showEditModal = false">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import ProductServices from "@/services/ProductServices.js";

export default {
  name: "AdminProducts",
  data() {
    return {
      activeTab: "supplements",
      supplements: [],
      clothes: [],
      accessories: [],
      loading: false,
      error: "",
      showAddModal: false,
      showEditModal: false,
      newProduct: {
        category: "",
        name: "",
        description: "",
        price: null,
        stock: null,
        // Supplement fields
        flavor: "",
        weight: null,
        form: "",
        // Clothing fields
        size: "",
        color: "",
        gender: "",
        material: "",
        // Accessory fields
        brand: ""
      },
      editProduct: null,
      editProductCategory: "",
      editErrors: {}
    };
  },
  async created() {
    await this.fetchAllProducts();
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    async fetchAllProducts() {
      this.loading = true;
      this.error = "";
      try {
        const [supplements, clothes, accessories] = await Promise.all([
          ProductServices.getSupplements(),
          ProductServices.getClothing(),
          ProductServices.getAccessories()
        ]);
        
        this.supplements = supplements;
        this.clothes = clothes;
        this.accessories = accessories;
      } catch (err) {
        this.error = err.message || "Failed to load products";
        alert(this.error);
      } finally {
        this.loading = false;
      }
    },

    resetNewProductFields() {
      this.newProduct = {
        category: this.newProduct.category,
        name: "",
        description: "",
        price: null,
        stock: null,
        flavor: "",
        weight: null,
        form: "",
        size: "",
        color: "",
        gender: "",
        material: "",
        brand: ""
      };
    },

    async createProduct() {
  try {
    const categoryMap = {
      supplements: 'supplement',
      clothes: 'clothing',
      accessories: 'accessory'
    };

    const baseData = {
      name: this.newProduct.name,
      description: this.newProduct.description,
      price: parseFloat(this.newProduct.price),
      stock: parseInt(this.newProduct.stock, 10),
      category: categoryMap[this.newProduct.category]
    };

    let requestData = { ...baseData };

    switch(this.newProduct.category) {
      case 'supplements':
        requestData = {
          ...requestData,
          flavor: this.newProduct.flavor,
          weight: parseFloat(this.newProduct.weight),
          form: this.newProduct.form
        };
        await ProductServices.createSupplement(requestData);
        break;
        
      case 'clothes':
        requestData = {
          ...requestData,
          size: this.newProduct.size,
          color: this.newProduct.color,
          gender: this.newProduct.gender,
          material: this.newProduct.material
        };
        await ProductServices.createClothing(requestData);
        break;
        
      case 'accessories':
        requestData = {
          ...requestData,
          material: this.newProduct.material,
          brand: this.newProduct.brand,
          size: this.newProduct.size,
          weight: parseFloat(this.newProduct.weight)
        };
        await ProductServices.createAccessory(requestData);
        break;
    }

    await this.fetchAllProducts();
    alert("Product created successfully.");
    this.showAddModal = false;
    this.resetNewProductFields();
  } catch (err) {
    if (err.response?.data?.errors) {
      const errorMessages = Object.values(err.response.data.errors).flat().join('\n');
      alert(`Validation errors:\n${errorMessages}`);
    } else {
      alert("Failed to create product: " + (err.message || "Unknown error"));
    }
  }
},

    openEditModal(product, category) {
      this.editProduct = JSON.parse(JSON.stringify(product));
      this.editProductCategory = category;
      
      // Ensure nested object exists
      const categoryKey = category.slice(0, -1); // Convert to singular
      if (!this.editProduct[categoryKey]) {
        this.editProduct[categoryKey] = {};
      }
      
      this.showEditModal = true;
      this.editErrors = {};
    },

    async updateProduct() {
      try {
        const categoryMap = {
          supplements: 'supplement',
          clothes: 'clothing',
          accessories: 'accessory'
        };

        const baseData = {
          name: this.editProduct.name,
          description: this.editProduct.description,
          price: parseFloat(this.editProduct.price),
          stock: parseInt(this.editProduct.stock, 10),
          category: categoryMap[this.editProductCategory]
        };

        const categoryKey = categoryMap[this.editProductCategory];
        let specificData = {};

        switch(this.editProductCategory) {
          case 'supplements':
            specificData = {
              flavor: this.editProduct.supplement.flavor,
              weight: parseFloat(this.editProduct.supplement.weight),
              form: this.editProduct.supplement.form
            };
            break;
            
          case 'clothes':
            specificData = {
              size: this.editProduct.clothing.size,
              color: this.editProduct.clothing.color,
              gender: this.editProduct.clothing.gender,
              material: this.editProduct.clothing.material
            };
            break;
            
          case 'accessories':
            specificData = {
              material: this.editProduct.accessory.material,
              brand: this.editProduct.accessory.brand,
              size: this.editProduct.accessory.size,
              weight: parseFloat(this.editProduct.accessory.weight)
            };
            break;
        }

        const requestData = {
          ...baseData,
          [categoryKey]: specificData
        };

        const response = await ProductServices.updateProduct(
          this.editProduct.id, 
          requestData
        );

        // Update local state
        const updatedProduct = response.product || response;
        const targetArray = this[this.editProductCategory];
        const index = targetArray.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          targetArray.splice(index, 1, updatedProduct);
        }

        alert("Product updated successfully.");
        this.showEditModal = false;
      } catch (err) {
        this.editErrors = {};
        if (err.response?.data?.errors) {
          // Handle nested errors
          for (const [field, messages] of Object.entries(err.response.data.errors)) {
            const [parent, child] = field.split('.');
            if (child) {
              this.editErrors[`${parent}_${child}`] = messages[0];
            } else {
              this.editErrors[field] = messages[0];
            }
          }
        }
        alert("Failed to update product:\n" + 
          Object.values(this.editErrors).join('\n') || 
          err.message || 
          "Unknown error"
        );
      }
    },

    async deleteProduct(product, category) {
      if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
        try {
          await ProductServices.deleteProduct(product.id);
          this[category] = this[category].filter(p => p.id !== product.id);
          alert("Product deleted successfully.");
        } catch (err) {
          alert("Failed to delete product: " + (err.message || "Unknown error"));
        }
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 1rem;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  margin-top: var(--Header-height, 100px);
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.admin-header h1 {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1a1a1a;
}

.admin-header p {
  font-size: 1.125rem;
  color: #6b7280;
}

.add-product-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.add-product-btn:hover {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.add-product-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.nav-tabs {
  border: none;
  gap: 0.5rem;
}

.nav-tabs .nav-link {
  padding: 0.75rem 1.5rem;
  background-color: #e2e8f0;
  color: #4a5568;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-tabs .nav-link:hover {
  background-color: #cbd5e1;
  color: #1a1a1a;
}

.nav-tabs .nav-link.active {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-tabs .nav-link:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.table-container {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 0;
}

.table-header th {
  background-color: #e2e8f0;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  color: #4a5568;
  letter-spacing: 0.05em;
  padding: 1rem 1.25rem;
}

.table tbody tr {
  background-color: #ffffff;
  transition: background-color 0.2s ease;
}

.table tbody tr:nth-child(even) {
  background-color: #f8fafc;
}

.table tbody tr:hover {
  background-color: #edf2f7;
  cursor: pointer;
}

.table td {
  padding: 1rem 1.25rem;
  font-size: 0.9rem;
  color: #2d3748;
  border-bottom: 1px solid #e2e8f0;
}

.table tr:last-child td {
  border-bottom: none;
}

.low-stock {
  color: #dc2626;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-warning {
  background-color: #f59e0b;
  color: #ffffff;
  border: none;
}

.btn-warning:hover {
  background-color: #d97706;
  transform: translateY(-1px);
}

.btn-warning:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.3);
}

.btn-danger {
  background-color: #dc2626;
  color: #ffffff;
  border: none;
}

.btn-danger:hover {
  background-color: #b91c1c;
  transform: translateY(-1px);
}

.btn-danger:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.3);
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1050;
  display: none;
}

.modal.show {
  display: block;
}

.modal-dialog {
  max-width: 500px;
  margin: 1.75rem auto;
}

.modal-content {
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  background: #ffffff;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  transition: color 0.3s ease;
}

.btn-close:hover {
  color: #1a1a1a;
}

.modal-body {
  padding: 1.5rem;
}

.form-label {
  font-weight: 500;
  color: #4a5568;
}

.form-control,
.form-select {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-control:focus,
.form-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  outline: none;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background: #e2e8f0;
  color: #1a1a1a;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #d1d5db;
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 2rem 1rem;
  }

  .admin-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .admin-header h1 {
    font-size: 1.75rem;
  }

  .admin-header p {
    font-size: 1rem;
  }

  .nav-tabs {
    flex-wrap: wrap;
  }

  .nav-tabs .nav-link {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .table-container {
    overflow-x: auto;
  }

  .table th,
  .table td {
    padding: 0.75rem;
    font-size: 0.85rem;
  }

  .action-buttons {
    flex-direction: column;
    gap: 0.25rem;
  }

  .btn-sm {
    width: 100%;
    text-align: center;
  }

  .modal-dialog {
    margin: 1rem;
  }
}
</style>