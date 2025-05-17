<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-custom-gradient shadow">
    <div class="container-fluid">
      <div class="navbar-left">
        <router-link class="navbar-brand" to="/">
          <i class="fas fa-dumbbell"></i> PowerFit
        </router-link>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/" :class="{ active: isActive('/') }">
              <i class="bi bi-house-fill me-2"></i> Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/membership" :class="{ active: isActive('/membership') }">
              <i class="bi bi-person-check-fill me-2"></i> Membership
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a href="#" class="nav-link dropdown-toggle" id="shopDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              <i class="bi bi-shop-window me-2"></i> Shop
            </a>
            <ul class="dropdown-menu" aria-labelledby="shopDropdown">
              <li>
                <router-link to="/shop/all" class="dropdown-item" :class="{ active: isActive('/shop/all') }">
                  <i class="bi bi-grid-fill me-2"></i> All
                </router-link>
              </li>
              <li>
                <router-link to="/shop/supplements" class="dropdown-item"
                  :class="{ active: isActive('/shop/supplements') }">
                  Supplements
                </router-link>
              </li>
              <li>
                <router-link to="/shop/accessories" class="dropdown-item"
                  :class="{ active: isActive('/shop/accessories') }">
                   Accessories
                </router-link>
              </li>
              <li>
                <router-link to="/shop/clothes" class="dropdown-item" :class="{ active: isActive('/shop/clothes') }">
                  Clothes
                </router-link>
              </li>
            </ul>
          </li>
          <!-- Role-based Links -->
          <template v-if="user">
            <li class="nav-item" v-if="isAdmin">
              <router-link class="nav-link" to="/admin/dashboard" :class="{ active: isActive('/admin/dashboard') }">
                <i class="bi bi-speedometer2 me-2"></i> Admin Dashboard
              </router-link>
            </li>
            <li class="nav-item" v-if="isAdmin">
              <router-link class="nav-link" to="/admin/users" :class="{ active: isActive('/admin/users') }">
                <i class="bi bi-people-fill me-2"></i> Manage Users
              </router-link>
            </li>
            <li class="nav-item" v-if="isAdmin">
              <router-link class="nav-link" to="/admin/products" :class="{ active: isActive('/admin/products') }">
                <i class="bi bi-box-seam-fill me-2"></i> Manage Products
              </router-link>
            </li>
            <li class="nav-item" v-else-if="isUser">
              <router-link class="nav-link" to="/user/cart" :class="{ active: isActive('/user/cart') }">
                <i class="bi bi-cart-fill me-2"></i> My Cart
              </router-link>
            </li>
          </template>
        </ul>
      </div>
      <div class="navbar-right">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <template v-if="!user">
              <li class="nav-item">
                <router-link class="nav-link" to="/login" :class="{ active: isActive('/login') }">
                  <i class="bi bi-box-arrow-in-right me-2"></i> Login
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/register" :class="{ active: isActive('/register') }">
                  <i class="bi bi-person-plus-fill me-2"></i> Register
                </router-link>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link class="nav-link" :to="profileLink" :class="{ active: isActive(profileLink) }">
                  <i class="bi bi-person-circle me-2"></i> Profile
                </router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="confirmLogout">
                  <i class="bi bi-box-arrow-right me-2"></i> Logout
                </a>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import AuthServices from "@/services/AuthServices.js";

export default {
  name: "NavBar",
  data() {
    return {
      user: AuthServices.getUser(),
    };
  },
  computed: {
    isAdmin() {
      return this.user && this.user.role === "admin";
    },
    isUser() {
      return this.user && this.user.role === "user";
    },
    profileLink() {
      if (this.isAdmin) return "/admin/profile";
      if (this.isUser) return "/user/profile";
      return "/login";
    },
  },
  watch: {
    user(newVal, oldVal) {
      if (!oldVal && newVal) {
        // User just logged in, refresh the page
        window.location.reload();
      }
    },
  },
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
    confirmLogout() {
      if (confirm("Are you sure you want to log out?")) {
        this.logout();
      }
    },
    logout() {
      AuthServices.logout();
      this.user = null;
      this.$router.push("/login");
    },
  },
  created() {
    window.addEventListener("storage", () => {
      this.user = AuthServices.getUser();
    });
  },
};
</script>

<style scoped>
.navbar {
  padding: 1.5rem 0;
  transition: padding 0.4s ease-in-out;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  background: linear-gradient(to right, #667eea, #764ba2);
}

.navbar-scrolled {
  padding: 1rem 0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.navbar-brand {
  font-size: clamp(2rem, 5vw, 2.5rem);
  font-weight: 800;
  color: #ffffff;
  text-decoration: none;
  position: relative;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
}

.navbar-brand::after {
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

.navbar-brand:hover {
  transform: translateY(-2px);
}

.navbar-brand:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
}

.navbar-left {
  gap: 2rem;
}

.navbar-right {
  margin-left: auto;
}

.nav-link {
  font-size: 1.1rem;
  font-weight: 500;
  color: #f1f5f9;
  position: relative;
  transition: all 0.4s ease;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
}

.nav-link:hover,
.nav-link.active {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
.nav-link.active::after {
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
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(245, 245, 245, 0.95));
  backdrop-filter: blur(12px);
  transition: all 0.4s ease;
  margin-top: 0.75rem;
}

.dropdown-item {
  font-size: 1rem;
  font-weight: 500;
  color: #1a1a1a;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.dropdown-item:hover,
.dropdown-item:focus,
.dropdown-item.active {
  background: linear-gradient(to right, #e0f2fe, #dbeafe);
  color: #3b82f6;
  transform: translateX(5px);
}

.navbar-toggler {
  border: none;
  padding: 0.5rem 0.75rem;
  transition: all 0.4s ease;
}

.navbar-toggler:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
}

@media (max-width: 992px) {
  .navbar {
    padding: 1rem 0;
  }

  .nav-link {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }

  .navbar-left,
  .navbar-right {
    flex-direction: column;
    width: 100%;
  }

  .navbar-right {
    margin-left: 0;
  }

  .navbar-nav {
    width: 100%;
  }

  .nav-link {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.75rem 0;
  }

  .navbar-brand {
    font-size: clamp(1.75rem, 4vw, 2rem);
  }

  .dropdown-menu {
    min-width: 200px;
  }
}

@media (max-width: 576px) {
  .container-fluid {
    padding: 0 0.5rem;
  }

  .navbar-brand {
    font-size: 1.5rem;
  }
}

/* Accessibility */
.nav-link:focus,
.dropdown-toggle:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.dropdown-item:focus {
  outline: none;
  background: linear-gradient(to right, #e0f2fe, #dbeafe);
  color: #3b82f6;
}



.fas.fa-dumbbell {
  color: #ffffff;
  margin-right: 1rem;
}
</style>