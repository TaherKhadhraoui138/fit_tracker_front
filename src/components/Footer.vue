<template>
  <footer class="footer bg-dark text-white pt-5 position-relative">
    <div class="container">
      <div class="row g-5">
        <!-- Gym Info -->
        <div class="col-md-6 col-lg-3">
          <div class="d-flex flex-column h-100">
            <h3 class="h5 mb-4 fw-bold text-primary">PowerFit Gym</h3>
            <div class="d-flex align-items-start mb-3">
              <i class="fas fa-map-marker-alt mt-1 me-3 text-primary"></i>
              <address class="mb-0">
                123 Fitness Street<br>
                New York, NY 10001
              </address>
            </div>
            <div class="d-flex align-items-center mb-3">
              <i class="fas fa-phone-alt me-3 text-primary"></i>
              <a class="text-white text-decoration-none">(555) 123-4567</a>
            </div>
            <div class="d-flex align-items-center">
              <i class="fas fa-envelope me-3 text-primary"></i>
              <a class="text-white text-decoration-none">info@powerfit.com</a>
            </div>
          </div>
        </div>

        <!-- Hours -->
        <div class="col-md-6 col-lg-3">
          <h3 class="h5 mb-4 fw-bold text-primary">Opening Hours</h3>
          <ul class="list-unstyled">
            <li class="d-flex mb-3">
              <i class="far fa-clock me-3 mt-1 text-primary"></i>
              <div>
                <strong>Mon - Fri</strong><br>
                5:00 AM - 11:00 PM
              </div>
            </li>
            <li class="d-flex">
              <i class="far fa-clock me-3 mt-1 text-primary"></i>
              <div>
                <strong>Sat - Sun</strong><br>
                7:00 AM - 9:00 PM
              </div>
            </li>
          </ul>
        </div>

        <!-- Quick Links -->
        <div class="col-md-6 col-lg-3">
          <h3 class="h5 mb-4 fw-bold text-primary">Quick Links</h3>
          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link to="/" class="text-white text-decoration-none hover-primary d-flex align-items-center">
                <i class="fas fa-arrow-right me-2 small text-primary"></i>
                Home
              </router-link>
            </li>
            <!-- Repeat for other links -->
            <li class="mb-2">
              <router-link to="/membership" class="text-white text-decoration-none hover-primary d-flex align-items-center">
                <i class="fas fa-arrow-right me-2 small text-primary"></i>
                Membership
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/supplements" class="text-white text-decoration-none hover-primary d-flex align-items-center">
                <i class="fas fa-arrow-right me-2 small text-primary"></i>
                Supplements
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/accessories" class="text-white text-decoration-none hover-primary d-flex align-items-center">
                <i class="fas fa-arrow-right me-2 small text-primary"></i>
                Accessories
              </router-link>
            </li>
            <li class="mb-0">
              <router-link to="/clothes" class="text-white text-decoration-none hover-primary d-flex align-items-center">
                <i class="fas fa-arrow-right me-2 small text-primary"></i>
                Clothes
              </router-link>
            </li>
          </ul>
        </div>
        
        <!-- Social Media -->
        <div class="col-md-6 col-lg-3">
          <h3 class="h5 mb-4 fw-bold text-primary">Connect With Us</h3>
          <div class="d-flex gap-3 social-icons">
            <a href="#" class="btn btn-sm btn-outline-primary rounded-circle p-2" aria-label="Facebook">
              <i class="bi bi-facebook"></i>
            </a>
            <a href="#" class="btn btn-sm btn-outline-primary rounded-circle p-2" aria-label="Instagram">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="#" class="btn btn-sm btn-outline-primary rounded-circle p-2" aria-label="Twitter">
              <i class="bi bi-twitter"></i>
            </a>
            <a href="#" class="btn btn-sm btn-outline-primary rounded-circle p-2" aria-label="YouTube">
              <i class="bi bi-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="text-center py-4 mt-4 border-top border-secondary">
        <p class="mb-0 small opacity-75">
          &copy; 2025 PowerFit Gym. All rights reserved. 
          <a href="#" class="text-white text-decoration-none hover-primary">Privacy Policy</a> | 
          <a href="#" class="text-white text-decoration-none hover-primary">Terms of Service</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterDisplay',
};
</script>

<style scoped>
.footer {
  background: linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.95) 100%);
  
}

.hover-primary:hover {
  color: var(--bs-primary) !important;
  padding-left: 0.5rem;
  transition: all 0.3s ease;
}

.social-icons .btn-outline-primary {
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-icons .btn-outline-primary:hover {
  background-color: var(--bs-primary) !important;
  border-color: var(--bs-primary) !important;
  transform: translateY(-2px);
}

.social-icons .btn-outline-primary i {
  font-size: 1.1rem;
}

.border-secondary {
  border-color: rgba(255,255,255,0.1) !important;
}
</style>