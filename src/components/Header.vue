<template>
  <div class="header bg-white shadow-lg fixed-top py-3">
    <div class="container d-flex align-items-center justify-content-between">
      <div class="logo">
        <router-link to="/" class="text-decoration-none fs-1 fw-bold text-secondary">
          Power<span class="text-primary">Fit</span>
        </router-link>
      </div>

      <nav class="ms-auto">
        <ul class="nav align-items-center">
          <li class="nav-item">
            <router-link to="/" class="nav-link position-relative" active-class="active-link">
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/membership" class="nav-link position-relative" active-class="active-link">
              Membership
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a href="#" class="nav-link dropdown-toggle position-relative" id="shopDropdown"
               role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Shop
            </a>
            <ul class="dropdown-menu border-0" aria-labelledby="shopDropdown">
              <li><h6 class="dropdown-header text-primary">Shop Categories</h6></li>
              <li><hr class="dropdown-divider"></li>
              <li><router-link to="/shop/all" class="dropdown-item rounded">All</router-link></li>
              <li><hr class="dropdown-divider mx-2"></li>
              <li><router-link to="/shop/supplements" class="dropdown-item rounded">Supplements</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><router-link to="/shop/accessories" class="dropdown-item rounded">Accessories</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><router-link to="/shop/clothes" class="dropdown-item rounded">Clothes</router-link></li>
            </ul>
          </li>
        </ul>
      </nav>

      <a href="/login" class="btn btn-primary btn-lg ms-4 px-4 py-2 shadow-sm rounded-pill">Login</a>
    </div>
  </div>
</template>

<script>
export default { 
    name: 'BannerDisplay', 
    }; 
</script> 

<style scoped>
.header {
  background-color: var(--white);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  padding: 0.75rem 0;
  transition: all 0.3s ease-in-out;
  margin-bottom: auto;
  position: relative;
  

}

.header:hover {
  box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.12);
}

.logo {
  a {
    font-size: clamp(2rem, 5vw, 2.5rem); /* Responsive sizing */
    font-weight: 800;
    color: var(--secondary-color);
    text-decoration: none;
    display: inline-block;
    position: relative;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    
    /* Gradient highlight animation */
    &::after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
    }
    
    &:hover {
      transform: translateY(-2px);
      
      &::after {
        transform: scaleX(1);
        transform-origin: left;
      }
      
      span {
        color: var(--primary-hover-color, #3a36e1); /* Optional hover variant */
      }
    }
    
    span {
      color: var(--primary-color);
      transition: color 0.4s ease;
      display: inline-block;
      
      /* Optional character pop animation */
      &:hover {
        animation: textPop 0.5s cubic-bezier(0.22, 1, 0.36, 1);
      }
    }
  }
}

/* Animation for character pop */
@keyframes textPop {
  0%, 100% {
    transform: scale(1);
  }
  33% {
    transform: scale(1.2);
  }
  66% {
    transform: scale(0.9);
  }
}

/* Dark mode adaptation */
@media (prefers-color-scheme: dark) {
  .logo a {
    color: var(--secondary-color-light, #e2e8f0);
    
    span {
      color: var(--primary-color-light, #818cf8);
    }
  }
}

/* Accessibility focus states */
.logo a:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 4px;
  border-radius: 2px;
}
.nav {
  gap: 30px;
}

.nav-link {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--secondary-color);
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover,
.nav-link.active-link {
  color: var(--primary-color);
}


.dropdown-menu {
  min-width: 220px;
  padding: 10px 0;
  border: none;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
}

.dropdown-item:hover,
.dropdown-item:focus {
  background-color: rgba(0, 123, 255, 0.1);
  color: var(--primary-color);
  border-radius: 8px;
}

.btn-primary {
  background-color: var(--primary-color);
  border: none;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
}
</style>