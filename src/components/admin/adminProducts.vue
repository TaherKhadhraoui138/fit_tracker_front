<template>
  <div class="container py-5">
    <header class="admin-header mb-5">
      <div>
        <h1 class="display-5 fw-bold text-dark">Manage Products</h1>
        <p class="text-secondary fs-5">Add, edit, or remove supplements, clothes, and accessories</p>
      </div>
      <button class="btn btn-primary add-product-btn" @click="addProduct">
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
                <th>Flavor</th>
                <th>Weight (kg)</th>
                <th>Form</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in supplements" :key="product.id" @click="selectProduct(product)">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.flavor }}</td>
                <td>{{ product.weight }}</td>
                <td>{{ product.form }}</td>
                <td class="action-buttons">
                  <button class="btn btn-warning btn-sm me-2" @click.stop="editProduct(product)"><i class="bi bi-pencil"></i></button>
                  <button class="btn btn-danger btn-sm" @click.stop="deleteProduct(product)"><i class="bi bi-trash"></i></button>
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
                <th>Size</th>
                <th>Color</th>
                <th>Gender</th>
                <th>Material</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in clothes" :key="product.id" @click="selectProduct(product)">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.size }}</td>
                <td>{{ product.color }}</td>
                <td>{{ product.gender }}</td>
                <td>{{ product.material }}</td>
                <td class="action-buttons">
                  <button class="btn btn-warning btn-sm me-2" @click.stop="editProduct(product)"><i class="bi bi-pencil"></i></button>
                  <button class="btn btn-danger btn-sm" @click.stop="deleteProduct(product)"><i class="bi bi-trash"></i></button>
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
                <th>Material</th>
                <th>Brand</th>
                <th>Size</th>
                <th>Weight (kg)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in accessories" :key="product.id" @click="selectProduct(product)">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.material }}</td>
                <td>{{ product.brand }}</td>
                <td>{{ product.size }}</td>
                <td>{{ product.weight }}</td>
                <td class="action-buttons">
                  <button class="btn btn-warning btn-sm me-2" @click.stop="editProduct(product)"><i class="bi bi-pencil"></i></button>
                  <button class="btn btn-danger btn-sm" @click.stop="deleteProduct(product)"><i class="bi bi-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminProducts",
  data() {
    return {
      activeTab: "supplements",
      supplements: [
        { id: 1, name: "Whey Protein", flavor: "Chocolate", weight: 1.5, form: "Powder" }
      ],
      clothes: [
        { id: 1, name: "T-Shirt", size: "M", color: "Black", gender: "Unisex", material: "Cotton" }
      ],
      accessories: [
        { id: 1, name: "Gym Bag", material: "Polyester", brand: "Nike", size: "Medium", weight: 0.8 }
      ]
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    addProduct() {
      console.log("Add product clicked");
    },
    editProduct(product) {
      console.log("Edit product:", product);
    },
    deleteProduct(product) {
      console.log("Delete product:", product);
    },
    selectProduct(product) {
      console.log("Selected product:", product);
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
}
</style>