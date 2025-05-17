<template>
  <div class="container py-5">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-muted">Loading product details...</p>
    </div>

    <!-- Error / Not Found State -->
    <div v-else-if="error" class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card h-100 text-center shadow-sm">
          <div class="card-body">
            <i class="bi bi-exclamation-circle display-1 text-danger mb-4"></i>
            <p class="text-danger fs-5 mb-4">{{ error }}</p>
            <button class="btn btn-secondary" @click="goBack">
              <i class="bi bi-arrow-left me-2"></i> Back to Shop
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Display -->
    <div v-else>
      <header class="product-header mb-5">
        <!--  <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h1 class="display-5 fw-bold text-dark">{{ displayProduct.name }}</h1>
            <p class="text-gray fs-5">{{ productType }}</p>
          </div>
          
        </div> -->
        <button class="btn btn-outline-secondary" @click="goBack">
          <i class="bi bi-arrow-left me-2"></i> Back
        </button>
      </header>

      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card product-detail-card mb-5">
            <div class="card-body">
              <div class="row g-4">
                <!-- Product Image Column -->
                <div class="col-md-5">
                  <div class="image-container">
                    <img :src="displayProduct.image" :alt="displayProduct.name"
                      class="product-image img-fluid rounded-3 shadow-lg" />
                    <div v-if="displayProduct.onSale" class="sale-badge">
                      Save {{ calculateDiscount() }}%
                    </div>
                  </div>
                </div>

                <!-- Product Info Column -->
                <div class="col-md-7">
                  <div class="product-meta">
                    <h1 class="product-title">{{ displayProduct.name }}</h1>
                    <div class="price-section">
                      <span class="current-price">
                        {{
                          displayProduct.price !== undefined && displayProduct.price !== null &&
                            !isNaN(Number(displayProduct.price))
                            ? `$${Number(displayProduct.price).toFixed(2)}`
                            : 'N/A'
                        }}
                      </span>
                      <span
                        v-if="displayProduct.onSale && displayProduct.originalPrice !== undefined && displayProduct.originalPrice !== null && !isNaN(Number(displayProduct.originalPrice))"
                        class="original-price">
                        ${{ Number(displayProduct.originalPrice).toFixed(2) }}
                      </span>
                    </div>
                  </div>
                  <div class="product-actions mt-5">
                    <button class="btn btn-primary btn-add-to-cart" @click="addToCart">
                      <i class="bi bi-cart-plus me-2"></i>Add to Cart
                    </button>
                  </div>
                  <br>

                  <div class="product-description mb-5">
                    <h3 class="section-heading">Description</h3>
                    <p class="description-text">
                      {{ displayProduct.description || 'No description available' }}
                    </p>
                  </div>

                  <div class="product-specifications">
                    <h3 class="section-heading">Specifications</h3>

                    <!-- Common Specifications -->
                    <div class="spec-grid">
                      <div class="spec-item">
                        <span class="spec-label">Category</span>
                        <span class="spec-value">{{ productType }}</span>
                      </div>
                    </div>

                    <!-- Supplement Specific -->
                    <template v-if="productType === 'Supplement'">
                      <div class="spec-grid">
                        <div class="spec-item">
                          <span class="spec-label">Flavor</span>
                          <span class="spec-value">
                            {{ displayProduct.supplement?.flavor || 'N/A' }}
                          </span>
                        </div>
                        <div class="spec-item">
                          <span class="spec-label">Weight</span>
                          <span class="spec-value">
                            {{ displayProduct.supplement?.weight ? `${displayProduct.supplement.weight} lbs` : 'N/A' }}
                          </span>
                        </div>
                        <div class="spec-item">
                          <span class="spec-label">Form</span>
                          <span class="spec-value">
                            {{ displayProduct.supplement?.form || 'N/A' }}
                          </span>
                        </div>
                      </div>
                    </template>

                    <!-- Clothing Specific -->
                    <template v-if="productType === 'Clothing'">
                      <div class="spec-grid">
                        <div class="spec-item">
                          <span class="spec-label">Size</span>
                          <span class="spec-value">
                            {{ displayProduct.clothing?.size || 'N/A' }}
                          </span>
                        </div>
                        <div class="spec-item">
                          <span class="spec-label">Color</span>
                          <span class="spec-value">
                            {{ displayProduct.clothing?.color || 'N/A' }}
                          </span>
                        </div>
                        <div class="spec-item">
                          <span class="spec-label">Gender</span>
                          <span class="spec-value">
                            {{ displayProduct.clothing?.gender || 'N/A' }}
                          </span>
                        </div>
                        <div class="spec-item">
                          <span class="spec-label">Material</span>
                          <span class="spec-value">
                            {{ displayProduct.clothing?.material || 'N/A' }}
                          </span>
                        </div>
                      </div>
                    </template>

                    <!-- Accessory Specific -->
                    <template v-if="productType === 'Accessory'">
                      <div class="spec-grid">
                        <div class="spec-item">
                          <span class="spec-label">Material</span>
                          <span class="spec-value">
                            {{ displayProduct.accessory?.material || 'N/A' }}
                          </span>
                        </div>
                        <div class="spec-item">
                          <span class="spec-label">Brand</span>
                          <span class="spec-value">
                            {{ displayProduct.accessory?.brand || 'N/A' }}
                          </span>
                        </div>
                        <div class="spec-item">
                          <span class="spec-label">Size</span>
                          <span class="spec-value">
                            {{ displayProduct.accessory?.size || 'N/A' }}
                          </span>
                        </div>
                        <div class="spec-item">
                          <span class="spec-label">Weight</span>
                          <span class="spec-value">
                            {{ displayProduct.accessory?.weight ? `${displayProduct.accessory.weight} lbs` : 'N/A' }}
                          </span>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReviewSection :productId="displayProduct.id" />
    </div>
  </div>
</template>

<script>
import ProductServices from '@/services/ProductServices';
import ReviewSection from "./ReviewSection.vue";

export default {
  name: "ProductDetails",
  components: { ReviewSection },
  data() {
    return {
      loading: true,
      displayProduct: null,
      error: null
    };
  },
  computed: {
    productType() {
      if (!this.displayProduct?.category) return 'N/A';
      return this.displayProduct.category.charAt(0).toUpperCase() + this.displayProduct.category.slice(1);
    }
  },
  async created() {
    try {
      const productId = Number(this.$route.params.id);
      const response = await ProductServices.getProductById(productId);

      if (!response) {
        this.$router.push("/shop/all");
        return;
      }

      const productData = {
        ...response,
        supplement: response.supplement || {},
        clothing: response.clothing || {},
        accessory: response.accessory || {}
      };

      this.displayProduct = {
        ...productData,
        flavor: productData.supplement?.flavor || 'N/A',
        weight: productData.supplement?.weight || productData.accessory?.weight || 'N/A',
        form: productData.supplement?.form || 'N/A',
        size: productData.clothing?.size || productData.accessory?.size || 'N/A',
        color: productData.clothing?.color || 'N/A',
        gender: productData.clothing?.gender || 'N/A',
        material: productData.clothing?.material || productData.accessory?.material || 'N/A',
        brand: productData.accessory?.brand || 'N/A',
        onSale: productData.originalPrice && productData.originalPrice > productData.price,
        image: productData.image || this.getDefaultImage(productData.category),
        description: productData.description || 'No description available'
      };

    } catch (error) {
      this.error = error.message;
      console.error("Product load error:", error);
      this.$router.push("/shop/all");
    } finally {
      this.loading = false;
    }
  },
  methods: {
    getDefaultImage(category) {
      const images = {
        supplements: '/images/default-supplement.jpg',
        clothes: '/images/default-clothing.jpg',
        accessories: '/images/default-accessory.jpg'
      };
      return images[category?.toLowerCase()] || '/images/default-product.jpg';
    },
    calculateDiscount() {
      const { originalPrice, price } = this.displayProduct;
      if (!originalPrice || !price || isNaN(originalPrice) || isNaN(price)) return 'N/A';
      return Math.round(((originalPrice - price) / originalPrice) * 100);
    },
    addToCart() {
      this.$store.dispatch('cart/addToCart', {
        product: this.displayProduct,
        quantity: 1
      });
      this.$toast.success(`${this.displayProduct.name} added to cart!`, {
        position: "top-right",
        timeout: 3000
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 1rem;
  background-color: #f9fafb;
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  margin-top: 100px;
}

.product-detail-card {
  border: none;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.product-detail-card:hover {
  transform: translateY(-5px);
}

.image-container {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  padding: 1rem;
}

.product-image {
  height: 400px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.sale-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #10b981;
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.product-meta {
  margin-bottom: 2rem;
}

.product-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.current-price {
  font-size: 2rem;
  font-weight: 700;
  color: #3b82f6;
}

.original-price {
  font-size: 1.25rem;
  color: #94a3b8;
  text-decoration: line-through;
}

.product-description {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.section-heading {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.75rem;
  margin-bottom: 1.5rem;
}

.description-text {
  color: #64748b;
  line-height: 1.7;
  font-size: 1.1rem;
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.spec-item {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
}

.spec-label {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.spec-value {
  font-size: 1.1rem;
  color: #1e293b;
  font-weight: 600;
}

.product-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.btn-add-to-cart {
  width: 100%;
  max-width: 300px;
  /* Limits width for better proportionality */
  padding: 1.25rem 2rem;
  /* Adjusted padding for better spacing */
  font-size: 1.1rem;
  font-weight: 600;
  /* Bolder text for emphasis */
  color: #ffffff;
  border: none;
  border-radius: 12px;
  background: linear-gradient(to right, #667eea, #764ba2);
  /* Requested gradient */
  transition: all 0.3s ease;
  /* Smooth transition for all properties */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  /* Subtle shadow for depth */
}

.btn-add-to-cart:hover {
  background: linear-gradient(to right, #5a71d8, #6a41a0);
  /* Slightly darker gradient on hover */
  transform: translateY(-3px);
  /* Enhanced lift effect */
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  /* Stronger shadow on hover */
}

.btn-add-to-cart:active {
  transform: translateY(0);
  /* Press-down effect on click */
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
  /* Reduced shadow on click */
  transition: all 0.1s ease;
  /* Faster transition for click */
}

.btn-add-to-cart:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.3);
  /* Focus ring for accessibility */
}

.btn-add-to-cart i {
  font-size: 1.2rem;
  /* Slightly larger icon */
  transition: transform 0.3s ease;
  /* Smooth icon animation */
}

.btn-add-to-cart:hover i {
  transform: scale(1.1);
  /* Slight icon enlargement on hover */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .btn-add-to-cart {
    padding: 1rem 1.5rem;
    font-size: 1rem;
    max-width: 250px;
  }

  .btn-add-to-cart i {
    font-size: 1.1rem;
  }
}

@media (max-width: 576px) {
  .btn-add-to-cart {
    padding: 0.75rem 1.25rem;
    font-size: 0.95rem;
    max-width: 200px;
  }
}

@media (max-width: 768px) {
  .product-image {
    height: 300px;
  }

  .product-title {
    font-size: 1.75rem;
  }

  .current-price {
    font-size: 1.5rem;
  }

  .original-price {
    font-size: 1rem;
  }

  .spec-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 2rem 1rem;
  }

  .product-image {
    height: 250px;
  }

  .product-title {
    font-size: 1.5rem;
  }

  .section-heading {
    font-size: 1.25rem;
  }

  .description-text {
    font-size: 1rem;
  }
}
</style>