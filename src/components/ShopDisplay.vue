<template>
  <div class="shop-display">
    <!-- Shop Hero -->
    <section class="shop-hero">
      <div class="container">
        <h1 class="display-4 fw-bold text-white">PowerFit Shop</h1>
        <p class="fs-5 text-light">Premium Gear for Serious Athletes</p>
        <button class="btn btn-outline-light mt-3" @click="$router.push('/shop/all')">
          Explore Now
        </button>
      </div>
    </section>

    <!-- Shop Content -->
    <section class="shop-main">
      <div class="container">
        <!-- Filters -->
        <div class="shop-controls mb-5">
          <div class="categories">
            <button
              v-for="category in categories"
              :key="category"
              class="category-filter"
              :class="{ active: selectedCategory === category }"
              @click="navigateToCategory(category)"
              :aria-pressed="selectedCategory === category"
            >
              {{ category }}
            </button>
          </div>
          <div class="sorting">
            <select
              class="sort-select"
              v-model="sortOption"
              @change="sortProducts"
              aria-label="Sort products"
            >
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="best-selling">Best Selling</option>
            </select>
          </div>
        </div>

        <!-- Product Grid -->
        <div class="product-grid">
          <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
        </div>
        <p v-if="!filteredProducts.length" class="text-gray text-center mt-5 fs-5">
          No products found in this category.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
  name: 'ShopDisplay',
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [
        { id: 1, name: 'Gold Standard Whey', price: 49.99, category: 'Supplements', flavor: 'Chocolate', weight: 1.5, form: 'Powder', originalPrice: 59.99, onSale: true, image: '/images/protein.jpg' },
        { id: 2, name: 'Resistance Bands', price: 19.99, category: 'Accessories', material: 'Rubber', brand: 'FitPro', size: 'Medium', weight: 0.2, originalPrice: 24.99, onSale: true, image: '/images/bands.jpg' },
        { id: 3, name: 'Gym T-Shirt', price: 24.99, category: 'Clothes', size: 'M', color: 'Black', gender: 'Unisex', material: 'Cotton', originalPrice: 29.99, onSale: false, image: '/images/tshirt.jpg' },
        { id: 4, name: 'Creatine', price: 29.99, category: 'Supplements', flavor: 'Unflavored', weight: 0.5, form: 'Powder', originalPrice: 34.99, onSale: true, image: '/images/creatine.jpg' },
        { id: 5, name: 'Water Bottle', price: 12.99, category: 'Accessories', material: 'Plastic', brand: 'Hydro', size: 'Large', weight: 0.3, originalPrice: 15.99, onSale: true, image: '/images/bottle.jpg' }
      ],
      sortOption: 'low-high',
      categories: ['All', 'Supplements', 'Clothes', 'Accessories']
    };
  },
  computed: {
    selectedCategory() {
      const category = this.$route.params.category?.toLowerCase();
      return this.categories.find(c => c.toLowerCase() === category) || 'All';
    },
    filteredProducts() {
      let filtered = this.selectedCategory === 'All'
        ? this.products
        : this.products.filter(product => product.category === this.selectedCategory);

      if (this.sortOption === 'low-high') {
        filtered = filtered.slice().sort((a, b) => a.price - b.price);
      } else if (this.sortOption === 'high-low') {
        filtered = filtered.slice().sort((a, b) => b.price - b.price);
      } else if (this.sortOption === 'newest') {
        filtered = filtered.slice().sort((a, b) => (b.id || 0) - (a.id || 0));
      } else if (this.sortOption === 'best-selling') {
        filtered = filtered.slice();
      }

      return filtered;
    }
  },
  methods: {
    navigateToCategory(category) {
      const routeCategory = category.toLowerCase();
      if (this.$route.params.category !== routeCategory) {
        this.$router.push(`/shop/${routeCategory}`);
      }
    },
    sortProducts() {
      // Sorting handled by computed property
    }
  },
  watch: {
    '$route.params.category': {
      immediate: true,
      handler(newCategory) {
        if (newCategory && !this.categories.map(c => c.toLowerCase()).includes(newCategory.toLowerCase())) {
          this.$router.replace('/shop/all');
        }
      }
    }
  }
};
</script>

<style scoped>
.shop-display {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: #f8fafc;
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Hero Section */
.shop-hero {
  background: linear-gradient(135deg, #3b82f6, #1e40af);
  color: #ffffff;
  padding: 5rem 0;
  text-align: center;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.shop-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 10%, transparent 10%);
  background-size: 20px 20px;
  opacity: 0.3;
}

.shop-hero h1 {
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 0.75rem;
}

.shop-hero p {
  font-size: 1.25rem;
  color: #e2e8f0;
  margin-bottom: 1.5rem;
}

.btn-outline-light {
  border: 2px solid #ffffff;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-outline-light:hover {
  background: #ffffff;
  color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Shop Controls */
.shop-main {
  padding: 3rem 0;
}

.shop-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  position: sticky;
  top: 20px;
  background: #f8fafc;
  z-index: 10;
  padding: 1rem 0;
  border-radius: 12px;
}

.categories {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.category-filter {
  padding: 0.8rem 1.8rem;
  background-color: #ffffff;
  color: #1a1a1a;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-filter:hover {
  background: #f1f5f9;
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.category-filter.active {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.category-filter:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
}

.sorting {
  min-width: 220px;
}

.sort-select {
  width: 100%;
  padding: 0.8rem;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  color: #1a1a1a;
  transition: all 0.3s ease;
}

.sort-select:hover {
  border-color: #3b82f6;
}

.sort-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.text-gray {
  color: #6b7280;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 1.5rem 1rem;
  }

  .shop-hero {
    padding: 3.5rem 0;
  }

  .shop-hero h1 {
    font-size: 2.5rem;
  }

  .shop-hero p {
    font-size: 1.1rem;
  }

  .shop-controls {
    flex-direction: column;
    align-items: stretch;
    top: 10px;
  }

  .categories {
    width: 100%;
    justify-content: center;
  }

  .category-filter {
    padding: 0.7rem 1.5rem;
    font-size: 0.9rem;
  }

  .sorting {
    width: 100%;
  }

  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 576px) {
  .shop-hero {
    padding: 2.5rem 0;
  }

  .shop-hero h1 {
    font-size: 2rem;
  }

  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>