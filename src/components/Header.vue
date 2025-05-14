<template>
  <header class="header fixed-top" :class="{ 'header-scrolled': isScrolled }">
    <div class="container">
      <div class="header-grid">
        <!-- Logo -->
        <div class="logo">
          <router-link to="/" class="text-decoration-none fs-1 fw-bold text-white" aria-label="PowerFit Home">
            Power<span class="text-light">Fit</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="nav-desktop ms-auto">
          <ul class="nav align-items-center gap-5">
            <li class="nav-item">
              <router-link to="/" class="nav-link" active-class="active-link" aria-current="page">
                Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/membership" class="nav-link" active-class="active-link">
                Membership
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" id="shopDropdown" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Shop
              </a>
              <ul class="dropdown-menu" aria-labelledby="shopDropdown">
                <li>
                  <h6 class="dropdown-header text-primary">Shop Categories</h6>
                </li>
                <li>
                  <hr class="dropdown-divider mx-2" />
                </li>
                <li>
                  <router-link to="/shop/all" class="dropdown-item rounded">
                    <i class="bi bi-grid me-2"></i>All
                  </router-link>
                </li>
                <li>
                  <hr class="dropdown-divider mx-2" />
                </li>
                <li>
                  <router-link to="/shop/supplements" class="dropdown-item rounded">
                    Supplements
                  </router-link>
                </li>
                <li>
                  <hr class="dropdown-divider mx-2" />
                </li>
                <li>
                  <router-link to="/shop/accessories" class="dropdown-item rounded">
                   Accessories
                  </router-link>
                </li>
                <li>
                  <hr class="dropdown-divider mx-2" />
                </li>
                <li>
                  <router-link to="/shop/clothes" class="dropdown-item rounded">
                      Clothes
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <!-- Actions -->
        <div class="actions d-flex align-items-center gap-3">
          <router-link to="/user/cart" class="cart-icon" aria-label="View Cart">
            <i class="bi bi-cart3 fs-4 text-white"></i>
          </router-link>
          <a href="/login" class="btn btn-primary px-4 py-2 rounded-pill">Login</a>
        </div>

        <!-- Mobile Menu Toggle -->
        <button class="nav-toggle d-none" @click="toggleMobileMenu" aria-label="Toggle navigation menu"
          aria-expanded="false">
          <i class="bi bi-list fs-3 text-white"></i>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <nav class="nav-mobile" :class="{ 'nav-mobile-open': mobileMenuOpen }">
        <ul class="nav flex-column p-4">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active-link" @click="toggleMobileMenu">
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/membership" class="nav-link" active-class="active-link" @click="toggleMobileMenu">
              Membership
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="toggleShopSubmenu" aria-expanded="false"
              aria-controls="shopSubmenu">
              Shop
              <i class="bi bi-chevron-down ms-2"></i>
            </a>
            <ul class="submenu" :class="{ 'submenu-open': shopSubmenuOpen }" id="shopSubmenu">
              <li>
                <router-link to="/shop/all" class="dropdown-item" @click="toggleMobileMenu">
                  <i class="bi bi-grid me-2"></i>All
                </router-link>
              </li>
              <li>
                <router-link to="/shop/supplements" class="dropdown-item" @click="toggleMobileMenu">
                  Supplements
                </router-link>
              </li>
              <li>
                <router-link to="/shop/accessories" class="dropdown-item" @click="toggleMobileMenu">
                  Accessories
                </router-link>
              </li>
              <li>
                <router-link to="/shop/clothes" class="dropdown-item" @click="toggleMobileMenu">
                  Clothes
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'BannerDisplay',
  data() {
    return {
      isScrolled: false,
      mobileMenuOpen: false,
      shopSubmenuOpen: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : 'auto';
    },
    toggleShopSubmenu() {
      this.shopSubmenuOpen = !this.shopSubmenuOpen;
    },
  },
};
</script>

<style scoped>
.header {
  background: linear-gradient(to right, #667eea, #764ba2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 1.5rem 0;
  transition: all 0.4s ease-in-out;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: fixed;
}

.header-scrolled {
  padding: 1rem 0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.container {
  max-width: 1400px;
}

.header-grid {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2rem;
}

.logo a {
  font-size: clamp(2rem, 5vw, 2.5rem);
  font-weight: 800;
  color: #ffffff;
  text-decoration: none;
  position: relative;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #93c5fd, #a5b4fc);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo a:hover {
  transform: translateY(-2px);
}

.logo a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.logo a span {
  color: #f1f5f9;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo a span:hover {
  animation: textPop 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes textPop {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.15);
  }

  75% {
    transform: scale(0.95);
  }
}

.nav-desktop {
  display: flex;
}

.nav {
  gap: 2.5rem;
}

.nav-link {
  font-size: 1.1rem;
  font-weight: 500;
  color: #f1f5f9;
  position: relative;
  transition: color 0.4s ease, transform 0.4s ease;
}

.nav-link:hover,
.nav-link.active-link {
  color: #ffffff;
  transform: translateY(-2px);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #ffffff;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s ease;
}

.nav-link:hover::after,
.nav-link.active-link::after {
  transform: scaleX(1);
  transform-origin: left;
}

.dropdown-toggle::after {
  border-color: #f1f5f9;
  transition: border-color 0.4s ease;
}

.dropdown-menu {
  min-width: 260px;
  padding: 1rem 0;
  border: none;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  transition: all 0.4s ease;
  margin-top: 0.75rem;
}

.dropdown-item {
  font-size: 0.95rem;
  font-weight: 500;
  color: #1a1a1a;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.dropdown-item:hover,
.dropdown-item:focus {
  background: linear-gradient(to right, #e0f2fe, #dbeafe);
  color: #3b82f6;
  border-radius: 12px;
}

.dropdown-divider {
  border-color: #e2e8f0;
  margin: 0.5rem 1rem;
}

.dropdown-header {
  font-size: 0.9rem;
  font-weight: 600;
  color: #3b82f6;
  padding: 0.75rem 1.5rem;
}

.btn-primary {
  background: linear-gradient(to right, #667eea, #764ba2);
  border: none;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.75rem 2rem;
  transition: all 0.4s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background: linear-gradient(to right, #5b67d8, #6b3e99);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
}

.cart-icon {
  display: flex;
  align-items: center;
  transition: all 0.4s ease;
}

.cart-icon:hover {
  transform: translateY(-2px);
  color: #ffffff;
}

.nav-toggle {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

.nav-mobile {
  position: fixed;
  top: 0;
  right: -100%;
  width: 280px;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);
  transition: right 0.4s ease;
  z-index: 1000;
}

.nav-mobile-open {
  right: 0;
}

.nav-mobile .nav {
  gap: 1rem;
}

.nav-mobile .nav-link {
  font-size: 1.2rem;
  color: #1a1a1a;
  padding: 0.75rem 1.5rem;
}

.nav-mobile .nav-link:hover,
.nav-mobile .nav-link.active-link {
  color: #3b82f6;
  background: #f8fafc;
  border-radius: 12px;
}

.submenu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
  padding-left: 1.5rem;
}

.submenu-open {
  max-height: 300px;
}

.submenu .dropdown-item {
  font-size: 1rem;
  color: #1a1a1a;
  padding: 0.5rem 1rem;
}

/* Responsive Design */
@media (max-width: 992px) {
  .header-grid {
    gap: 1.5rem;
  }

  .nav-desktop {
    gap: 2rem;
  }

  .nav-link {
    font-size: 1rem;
  }

  .btn-primary {
    padding: 0.65rem 1.5rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1rem 0;
  }

  .header-scrolled {
    padding: 0.75rem 0;
  }

  .nav-desktop {
    display: none;
  }

  .nav-toggle {
    display: block;
  }

  .logo a {
    font-size: clamp(1.75rem, 4vw, 2rem);
  }

  .actions {
    gap: 1.5rem;
  }

  .btn-primary {
    padding: 0.6rem 1.25rem;
    font-size: 0.9rem;
  }

  .dropdown-menu {
    min-width: 220px;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 0 1rem;
  }

  .header-grid {
    grid-template-columns: auto auto;
    justify-content: space-between;
  }

  .actions {
    display: none;
  }

  .nav-mobile .nav-link {
    font-size: 1.1rem;
  }

  .nav-mobile {
    width: 100%;
  }
}

/* Accessibility */
.nav-link:focus,
.dropdown-toggle:focus,
.cart-icon:focus,
.nav-toggle:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.dropdown-item:focus {
  outline: none;
  background: linear-gradient(to right, #e0f2fe, #dbeafe);
  color: #3b82f6;
}
</style>