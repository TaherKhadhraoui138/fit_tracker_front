<template>
  <div class="container py-5">
    <header class="cart-header mb-5">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div>
          <h1 class="display-4 fw-bold text-dark">Your Cart</h1>
          <p class="text-gray fs-5">Review and manage your selected items</p>
        </div>
        <button class="btn btn-secondary" @click="goBack">
          <i class="bi bi-house-door-fill me-2"></i> Back to Shop
        </button>
      </div>
    </header>

    <div class="row justify-content-center">
      <div class="col-lg-10">
        <!-- Empty Cart State -->
        <div v-if="cartItems.length === 0" class="card h-100 text-center">
          <div class="card-body">
            <i class="bi bi-cart-x display-1 text-gray mb-4"></i>
            <h3 class="card-title fw-bold mb-3">Your cart is empty</h3>
            <p class="text-gray mb-4">Looks like you haven't added any items yet.</p>
            <button class="btn btn-primary" @click="$router.push('/shop/all')">
              <i class="bi bi-shop me-2"></i> Shop Now
            </button>
          </div>
        </div>

        <!-- Cart Items -->
        <div v-else>
          <!-- Desktop Table -->
          <div class="card mb-4 d-none d-md-block">
            <div class="card-body p-0">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th scope="col" class="ps-4">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col" class="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cartItems" :key="item.id">
                    <td class="ps-4">
                      <div class="d-flex align-items-center gap-3">
                        <img
                          :src="item.image || 'https://via.placeholder.com/60'"
                          :alt="item.name"
                          class="product-image"
                        />
                        <span>{{ item.name }}</span>
                      </div>
                    </td>
                    <td>${{ item.price.toFixed(2) }}</td>
                    <td>
                      <input
                        type="number"
                        class="form-control quantity-input"
                        v-model.number="item.quantity"
                        @change="updateQuantity(item)"
                        min="1"
                        max="10"
                        aria-label="Quantity"
                      />
                    </td>
                    <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
                    <td class="text-end pe-4">
                      <button
                        class="btn btn-danger btn-sm"
                        @click="removeItem(item.id)"
                        aria-label="Remove item"
                      >
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Mobile Cards -->
          <div class="d-md-none">
            <div v-for="item in cartItems" :key="item.id" class="card mb-3">
              <div class="card-body">
                <div class="d-flex align-items-center gap-3 mb-3">
                  <img
                    :src="item.image || 'https://via.placeholder.com/60'"
                    :alt="item.name"
                    class="product-image"
                  />
                  <div>
                    <h5 class="fw-bold mb-1">{{ item.name }}</h5>
                    <p class="text-gray mb-0">Price: ${{ item.price.toFixed(2) }}</p>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-3">
                  <div class="flex-grow-1">
                    <label :for="'quantity-' + item.id" class="form-label fw-semibold text-primary">
                      Quantity
                    </label>
                    <input
                      :id="'quantity-' + item.id"
                      type="number"
                      class="form-control quantity-input"
                      v-model.number="item.quantity"
                      @change="updateQuantity(item)"
                      min="1"
                      max="10"
                      aria-label="Quantity"
                    />
                  </div>
                  <div>
                    <label class="form-label fw-semibold text-primary">Subtotal</label>
                    <p class="fw-bold mb-0">${{ (item.price * item.quantity).toFixed(2) }}</p>
                  </div>
                </div>
                <button
                  class="btn btn-danger btn-sm mt-3 w-100"
                  @click="removeItem(item.id)"
                  aria-label="Remove item"
                >
                  <i class="bi bi-trash-fill me-2"></i> Remove
                </button>
              </div>
            </div>
          </div>

          <!-- Cart Summary -->
          <div class="card">
            <div class="card-body">
              <h4 class="fw-semibold mb-4 text-dark">Cart Summary</h4>
              <dl class="row g-3 mb-4">
                <dt class="col-sm-6 fw-semibold text-primary">Subtotal</dt>
                <dd class="col-sm-6 text-end">${{ subtotal.toFixed(2) }}</dd>
                <dt class="col-sm-6 fw-semibold text-primary">Tax (10%)</dt>
                <dd class="col-sm-6 text-end">${{ tax.toFixed(2) }}</dd>
                <dt class="col-sm-6 fw-bold text-dark">Total</dt>
                <dd class="col-sm-6 text-end fw-bold">${{ total.toFixed(2) }}</dd>
              </dl>
              <div class="d-flex gap-2 justify-content-end">
                <button class="btn btn-outline-danger" @click="showClearCartModal = true">
                  <i class="bi bi-x-circle me-2"></i> Clear Cart
                </button>
                <button class="btn btn-primary" @click="$router.push('')">
                  <i class="bi bi-credit-card me-2"></i> Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Clear Cart Modal -->
    <div v-if="showClearCartModal" class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold text-primary">Confirm Clear Cart</h5>
            <button type="button" class="btn-close" @click="showClearCartModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="text-gray">Are you sure you want to clear all items from your cart?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" @click="showClearCartModal = false">Cancel</button>
            <button type="button" class="btn btn-danger" @click="clearCart">Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showClearCartModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
export default {
  name: 'UserCart',
          props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showClearCartModal: false
    };
  },
  computed: {
        cartItems() {
      return this.cart;
    },
    subtotal() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    tax() {
      return this.subtotal * 0.1; // 10% tax
    },
    total() {
      return this.subtotal + this.tax;
    },
  },
  methods: {
    updateQuantity(item) {
      if (item.quantity < 1) {
        item.quantity = 1;
      } else if (item.quantity > 10) {
        item.quantity = 10;
      }
      console.log('Updating quantity:', item);
      // Placeholder: Implement API call to update cart
      // Example: await axios.patch(`/api/cart/${item.id}`, { quantity: item.quantity });
    },
    removeItem(itemId) {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      console.log('Removing item:', itemId);
      // Placeholder: Implement API call to remove item
      // Example: await axios.delete(`/api/cart/${itemId}`);
      alert('Item removed from cart!');
    },
    clearCart() {
      this.cartItems = [];
      this.showClearCartModal = false;
      console.log('Clearing cart');
      // Placeholder: Implement API call to clear cart
      // Example: await axios.delete('/api/cart');
      alert('Cart cleared successfully!');
    },
    goBack() {
      this.$router.push('/shop/all');
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
  margin-top: var(--Header-height,100px);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.cart-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
}

.cart-header p {
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
  font-size: 1.5rem;
  color: #1a1a1a;
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.quantity-input {
  width: 80px;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  padding: 0.5rem;
  font-size: 0.95rem;
}

.quantity-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  outline: none;
}

.table {
  border-collapse: separate;
  border-spacing: 0;
}

.table th,
.table td {
  vertical-align: middle;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.table th {
  font-weight: 600;
  color: #3b82f6;
  font-size: 0.95rem;
}

.table td {
  font-size: 0.95rem;
  color: #1f2937;
}

.table-hover tbody tr:hover {
  background-color: #f1f5f9;
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

.btn-danger {
  background: linear-gradient(135deg, #dc3545, #b91c1c);
  color: #ffffff;
  border: none;
}

.btn-danger:hover {
  background: linear-gradient(135deg, #b91c1c, #991b1b);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.btn-danger:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.3);
}

.btn-sm {
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
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

.btn-outline-danger {
  border: 1px solid #dc3545;
  color: #dc3545;
  background: none;
}

.btn-outline-danger:hover {
  background: #fef2f2;
  color: #b91c1c;
  transform: translateY(-2px);
}

.btn-outline-danger:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.3);
}

.btn-outline-secondary {
  border: 1px solid #6b7280;
  color: #6b7280;
  background: none;
}

.btn-outline-secondary:hover {
  background: #f1f5f9;
  color: #374151;
  transform: translateY(-2px);
}

.btn-outline-secondary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.3);
}

.modal-content {
  border-radius: 12px;
  border: 1px solid #3b82f6;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.modal-header {
  border-bottom: none;
  padding: 1.5rem;
}

.modal-title {
  font-size: 1.25rem;
  color: #3b82f6;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  border-top: none;
  padding: 1.5rem;
}

.btn-close {
  filter: invert(0.5);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 2rem 1rem;
  }

  .cart-header h1 {
    font-size: 2rem;
  }

  .cart-header p {
    font-size: 1rem;
  }

  .card-body {
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.25rem;
  }

  .product-image {
    width: 50px;
    height: 50px;
  }

  .quantity-input {
    width: 100%;
  }

  .btn {
    width: 100%;
    text-align: center;
  }

  .modal-dialog {
    margin: 1rem;
  }
}

@media (max-width: 576px) {
  .cart-header {
    text-align: center;
  }

  .cart-header .d-flex {
    flex-direction: column;
    align-items: center;
  }
}
</style>