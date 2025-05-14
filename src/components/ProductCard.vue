<template>
  <div class="product-card">
    <div class="card" @click="viewProduct">
      <div class="product-badge" v-if="product.onSale">Sale</div>
      <div class="product-image">
        <img :src="product.image || '/images/placeholder.jpg'" :alt="product.name || 'Product image'" />
        <button class="quick-view" @click.stop="viewProduct" aria-label="Quick view product">
          Quick View
        </button>
      </div>
      <div class="product-details">
        <h3 class="product-title">{{ product.name || 'Unnamed Product' }}</h3>
        <div class="price-container">
          <span class="current-price">${{ product.price.toFixed(2) }}</span>
          <span class="original-price" v-if="product.originalPrice && product.originalPrice > product.price">
            ${{ product.originalPrice.toFixed(2) }}
          </span>
        </div>
        <p class="product-category">{{ product.category }}</p>
        <div class="product-actions">
          <button class="add-to-cart" @click.stop="addToCart" aria-label="Add product to cart">
            <i class="bi bi-cart-plus me-2"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    viewProduct() {
      const productType = this.product.category;
      if (!this.product.id || !productType) {
        console.error("Invalid product data:", this.product);
        return;
      }
      this.$router.push({
        path: `/shop/product/${this.product.id}`,
        query: { type: productType },
      });
    },
    addToCart() {
      console.log("Adding to cart:", this.product);
      alert(`${this.product.name} added to cart!`);
    },
  },
};
</script>

<style scoped>
.product-card {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.card {
  background: #f5f5f5;
  border: none;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.product-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: linear-gradient(135deg, #6ee7b7, #34d399);
  color: #1a1a1a;
  padding: 0.5rem 1.2rem;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 500;
  z-index: 2;
}

.product-image {
  position: relative;
  height: 260px;
  overflow: hidden;
  background: #f8fafc;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease, opacity 0.6s ease;
}

.card:hover .product-image img {
  transform: scale(1.05);
  opacity: 0.95;
}

.quick-view {
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  color: #3b82f6;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.5s ease;
}

.card:hover .quick-view {
  bottom: 16px;
}

.quick-view:hover {
  background: #ffffff;
  transform: translateX(-50%) translateY(-2px);
}

.quick-view:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.product-details {
  padding: 1.5rem;
}

.product-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.price-container {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin: 0.75rem 0;
}

.current-price {
  font-size: 1.3rem;
  font-weight: 600;
  color: #3b82f6;
}

.original-price {
  font-size: 1rem;
  color: #9ca3af;
  text-decoration: line-through;
}

.product-category {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.product-actions {
  margin-top: 1rem;
}

.add-to-cart {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(to right, #667eea, #764ba2);
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.5s ease;
}

.add-to-cart:hover {
  background: linear-gradient(135deg, #60a5fa, #2563eb);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.add-to-cart:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-image {
    height: 220px;
  }

  .product-details {
    padding: 1.25rem;
  }

  .product-title {
    font-size: 1.15rem;
  }

  .current-price {
    font-size: 1.2rem;
  }

  .original-price {
    font-size: 0.95rem;
  }

  .product-category {
    font-size: 0.85rem;
  }

  .add-to-cart {
    padding: 0.7rem;
    font-size: 0.9rem;
  }

  .quick-view {
    padding: 0.65rem 1.25rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 576px) {
  .product-image {
    height: 200px;
  }

  .product-title {
    font-size: 1.1rem;
  }

  .product-details {
    padding: 1rem;
  }
}
</style>