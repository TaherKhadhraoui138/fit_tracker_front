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
      // Placeholder: Emit or API call
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
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.product-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.product-image {
  position: relative;
  height: 280px;
  overflow: hidden;
  background: #f1f5f9;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.card:hover .product-image img {
  transform: scale(1.08);
  opacity: 0.9;
}

.quick-view {
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.8rem 1.8rem;
  border: none;
  border-radius: 10px;
  background: rgba(59, 130, 246, 0.95);
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.card:hover .quick-view {
  bottom: 20px;
}

.quick-view:hover {
  background: #2563eb;
  transform: translateX(-50%) translateY(-2px);
}

.quick-view:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
}

.product-details {
  padding: 1.75rem;
}

.product-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.price-container {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 0.75rem 0;
}

.current-price {
  font-size: 1.4rem;
  font-weight: 600;
  color: #3b82f6;
}

.original-price {
  font-size: 1.1rem;
  color: #6b7280;
  text-decoration: line-through;
}

.product-category {
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.product-actions {
  margin-top: 1.25rem;
}

.add-to-cart {
  width: 100%;
  padding: 0.9rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
}

.add-to-cart:hover {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
}

.add-to-cart:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-image {
    height: 240px;
  }

  .product-details {
    padding: 1.5rem;
  }

  .product-title {
    font-size: 1.2rem;
  }

  .current-price {
    font-size: 1.3rem;
  }

  .original-price {
    font-size: 1rem;
  }

  .product-category {
    font-size: 0.9rem;
  }

  .add-to-cart {
    padding: 0.8rem;
    font-size: 0.95rem;
  }

  .quick-view {
    padding: 0.7rem 1.5rem;
    font-size: 0.9rem;
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
    padding: 1.25rem;
  }
}
</style>