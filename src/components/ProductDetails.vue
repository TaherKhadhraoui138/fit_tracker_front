<template>
  <div class="container py-5">
    <div v-if="!displayProduct" class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card h-100 text-center">
          <div class="card-body">
            <i class="bi bi-exclamation-circle display-1 text-danger mb-4"></i>
            <p class="text-danger fs-5 mb-4">Product not found.</p>
            <button class="btn btn-secondary" @click="goBack">
              <i class="bi bi-arrow-left me-2"></i> Back to Shop
            </button>
          </div>
        </div>
      </div>
    </div>
    <template v-else>
      <header class="product-header mb-5">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h1 class="display-4 fw-bold text-dark">{{ displayProduct.name }}</h1>
            <p class="text-gray fs-5">{{ productType }} Details</p>
          </div>
          <button class="btn btn-secondary" @click="goBack">
            <i class="bi bi-arrow-left me-2"></i> Back
          </button>
        </div>
      </header>
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card h-100">
            <div class="card-body">
              <div class="row g-4">
                <div class="col-md-4">
                  <img
                    :src="displayProduct.image || 'https://via.placeholder.com/300'"
                    :alt="displayProduct.name"
                    class="product-image img-fluid rounded"
                  />
                </div>
                <div class="col-md-8">
                  <div class="d-flex align-items-center gap-3 mb-3">
                    <h3 class="card-title fw-bold mb-0">{{ displayProduct.name }}</h3>
                    <span v-if="displayProduct.onSale" class="badge bg-success">On Sale</span>
                  </div>
                  <div class="mb-3">
                    <span class="fs-4 fw-bold text-primary">${{ displayProduct.price.toFixed(2) }}</span>
                    <span v-if="displayProduct.onSale" class="text-gray text-decoration-line-through ms-2">
                      ${{ displayProduct.originalPrice.toFixed(2) }}
                    </span>
                  </div>
                  <div class="product-details mb-4">
                    <dl class="row g-3">
                      <template v-if="productType === 'Supplements'">
                        <SupplementsDetails :product="displayProduct" />
                      </template>
                      <template v-if="productType === 'Clothes'">
                        <ClothesDetails :product="displayProduct" />
                      </template>
                      <template v-if="productType === 'Accessories'">
                        <AccessoriesDetails :product="displayProduct" />
                      </template>
                    </dl>
                  </div>
                  <button class="btn btn-primary" @click="addToCart">
                    <i class="bi bi-cart-plus me-2"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import SupplementsDetails from "./SupplementsDetails.vue";
import ClothesDetails from "./ClothesDetails.vue";
import AccessoriesDetails from "./AccessoriesDetails.vue";

export default {
  name: "ProductDetails",
  components: {
    SupplementsDetails,
    ClothesDetails,
    AccessoriesDetails,
  },
  props: {
    product: {
      type: Object,
      default: null,
    },
    productType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localProduct: null,
    };
  },
  created() {
    const id = Number(this.$route.params.id);
    const products = [
      { id: 1, name: 'Gold Standard Whey', price: 49.99, category: 'Supplements', flavor: 'Chocolate', weight: 1.5, form: 'Powder', originalPrice: 59.99, onSale: true, image: '/images/protein.jpg' },
      { id: 2, name: 'Resistance Bands', price: 19.99, category: 'Accessories', material: 'Rubber', brand: 'FitPro', size: 'Medium', weight: 0.2, originalPrice: 24.99, onSale: true, image: '/images/bands.jpg' },
      { id: 3, name: 'Gym T-Shirt', price: 24.99, category: 'Clothes', size: 'M', color: 'Black', gender: 'Unisex', material: 'Cotton', originalPrice: 29.99, onSale: false, image: '/images/tshirt.jpg' },
      { id: 4, name: 'Creatine', price: 29.99, category: 'Supplements', flavor: 'Unflavored', weight: 0.5, form: 'Powder', originalPrice: 34.99, onSale: true, image: '/images/creatine.jpg' },
      { id: 5, name: 'Water Bottle', price: 12.99, category: 'Accessories', material: 'Plastic', brand: 'Hydro', size: 'Large', weight: 0.3, originalPrice: 15.99, onSale: true, image: '/images/bottle.jpg' }
    ];
    this.localProduct = products.find((p) => p.id === id) || null;
    if (!this.localProduct) {
      console.error("Product not found:", id);
      this.$router.push("/shop/all");
    }
  },
  computed: {
    displayProduct() {
      return this.localProduct || this.product;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    addToCart() {
      console.log('Adding to cart:', this.displayProduct);
      // Placeholder: Implement API call to add to cart
      // Example: await axios.post('/api/cart', { productId: this.displayProduct.id, quantity: 1 });
      alert(`${this.displayProduct.name} added to cart!`);
    },
  },
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

.product-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
}

.product-header p {
  font-size: 1.125rem;
  color: #6b7280;
}

.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
}

.card-body {
  padding: 2rem;
}

.card-title {
  font-size: 1.75rem;
  color: #1a1a1a;
}

.product-image {
  max-width: 100%;
  height: auto;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  object-fit: cover;
}

.product-details dt {
  font-weight: 600;
  color: #3b82f6;
  font-size: 0.95rem;
}

.product-details dd {
  color: #1f2937;
  font-size: 0.95rem;
  margin-bottom: 0;
}

.badge {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
}

.bg-success {
  background-color: #10b981 !important;
  color: #ffffff;
}

.text-primary {
  color: #3b82f6 !important;
}

.text-gray {
  color: #6b7280 !important;
}

.text-dark {
  color: #1a1a1a !important;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.btn-secondary {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  color: #ffffff;
  border: none;
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #4b5563, #374151);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);
}

.btn-secondary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 2rem 1rem;
  }

  .product-header h1 {
    font-size: 2rem;
  }

  .product-header p {
    font-size: 1rem;
  }

  .card-body {
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.5rem;
  }

  .product-details dt,
  .product-details dd {
    font-size: 0.9rem;
  }

  .product-image {
    margin-bottom: 1rem;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 576px) {
  .product-header {
    text-align: center;
  }

  .product-header .d-flex {
    flex-direction: column;
    align-items: center;
  }

  .product-details dt {
    margin-bottom: 0.5rem;
  }

  .product-details dd {
    margin-bottom: 1rem;
  }
}
</style>