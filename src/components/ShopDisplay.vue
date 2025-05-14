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
            <button v-for="category in categories" :key="category" class="category-filter"
              :class="{ active: selectedCategory === category }" @click="navigateToCategory(category)"
              :aria-pressed="selectedCategory === category">
              {{ category }}
            </button>
          </div>
          <div class="sorting">
            <select class="sort-select" v-model="sortOption" @change="sortProducts" aria-label="Sort products">
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
        filtered = filtered.slice().sort((a, b) => b.price - a.price);
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
  margin-top: 100px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Hero Section */
.shop-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  padding: 4rem 0;
  text-align: center;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
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
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(255,255,255,0.1)" fill-opacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,170.7C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  background-size: cover;
  opacity: 0.3;
}

.shop-hero h1 {
  font-size: 2.75rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.75rem;
}

.shop-hero p {
  font-size: 1.2rem;
  color: #f1f5f9;
  margin-bottom: 1.5rem;
}

.btn-outline-light {
  border: 2px solid #f1f5f9;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 12px;
  transition: all 0.5s ease;
}

.btn-outline-light:hover {
  background: #ffffff;
  color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Shop Controls */
.shop-main {
  padding: 2.5rem 0;
}

.shop-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.categories {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.category-filter {
  padding: 0.75rem 1.5rem;
  background-color: #f8fafc;
  color: #1a1a1a;
  border: none;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.5s ease;
}

.category-filter:hover {
  background: #e2e8f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.category-filter.active {
  background: linear-gradient(to right, #667eea, #764ba2);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.category-filter:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.sorting {
  min-width: 200px;
}

.sort-select {
  width: 100%;
  padding: 0.75rem;
  background-color: #f8fafc;
  border: none;
  border-radius: 16px;
  font-size: 0.9rem;
  color: #1a1a1a;
  transition: all 0.5s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.sort-select:hover {
  background: #e2e8f0;
}

.sort-select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.75rem;
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
    padding: 3rem 0;
  }

  .shop-hero h1 {
    font-size: 2.25rem;
  }

  .shop-hero p {
    font-size: 1.1rem;
  }

  .shop-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .categories {
    width: 100%;
    justify-content: center;
  }

  .category-filter {
    padding: 0.65rem 1.25rem;
    font-size: 0.85rem;
  }

  .sorting {
    width: 100%;
  }

  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 576px) {
  .shop-hero {
    padding: 2rem 0;
  }

  .shop-hero h1 {
    font-size: 2rem;
  }

  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>