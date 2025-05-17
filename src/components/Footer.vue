<template>
  <footer class="footer text-white pt-5 position-relative">
    <div class="container">
      <div class="row g-5">
        <!-- Gym Info -->
        <div class="col-md-6 col-lg-3">
          <div class="d-flex flex-column h-100">
            <h3 class="h5 mb-4 fw-bold text-gradient">PowerFit Gym</h3>
            <div class="d-flex align-items-start mb-3">
              <i class="fas fa-map-marker-alt mt-1 me-3 text-primary"></i>
              <address class="mb-0 text-light">
                123 Fitness Street<br>
                New York, NY 10001
              </address>
            </div>
            <div class="d-flex align-items-center mb-3">
              <i class="fas fa-phone-alt me-3 text-primary"></i>
              <a href="tel:(555)123-4567" class="text-light text-decoration-none hover-primary">(555) 123-4567</a>
            </div>
            <div class="d-flex align-items-center">
              <i class="fas fa-envelope me-3 text-primary"></i>
              <a href="mailto:info@powerfit.com" class="text-light text-decoration-none hover-primary">info@powerfit.com</a>
            </div>
          </div>
        </div>

        <!-- Hours -->
        <div class="col-md-6 col-lg-3">
          <h3 class="h5 mb-4 fw-bold text-gradient">Opening Hours</h3>
          <ul class="list-unstyled">
            <li class="d-flex mb-3">
              <i class="far fa-clock me-3 mt-1 text-primary"></i>
              <div class="text-light">
                <strong>Mon - Fri</strong><br>
                5:00 AM - 11:00 PM
              </div>
            </li>
            <li class="d-flex">
              <i class="far fa-clock me-3 mt-1 text-primary"></i>
              <div class="text-light">
                <strong>Sat - Sun</strong><br>
                7:00 AM - 9:00 PM
              </div>
            </li>
          </ul>
        </div>

        <!-- Quick Links -->
        <div class="col-md-6 col-lg-3">
          <h3 class="h5 mb-4 fw-bold text-gradient">Quick Links</h3>
          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link to="/" class="text-light text-decoration-none hover-primary d-flex align-items-center">
                <i class="fas fa-arrow-right me-2 small text-primary"></i>
                Home
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/membership" class="text-light text-decoration-none hover-primary d-flex align-items-center">
                <i class="fas fa-arrow-right me-2 small text-primary"></i>
                Membership
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/supplements" class="text-light text-decoration-none hover-primary d-flex align-items-center">
                <i class="fas fa-arrow-right me-2 small text-primary"></i>
                Supplements
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/accessories" class="text-light text-decoration-none hover-primary d-flex align-items-center">
                <i class="fas fa-arrow-right me-2 small text-primary"></i>
                Accessories
              </router-link>
            </li>
            <li class="mb-0">
              <router-link to="/clothes" class="text-light text-decoration-none hover-primary d-flex align-items-center">
                <i class="fas fa-arrow-right me-2 small text-primary"></i>
                Clothes
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Social Media -->
        <div class="col-md-6 col-lg-3">
          <h3 class="h5 mb-4 fw-bold text-gradient">Connect With Us</h3>
          <div class="d-flex gap-3 social-icons">
            <a href="https://facebook.com" target="_blank" class="social-icon" aria-label="Facebook">
              <i class="bi bi-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" class="social-icon" aria-label="Instagram">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" class="social-icon" aria-label="Twitter">
              <i class="bi bi-twitter"></i>
            </a>
            <a href="https://youtube.com" target="_blank" class="social-icon" aria-label="YouTube">
              <i class="bi bi-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="text-center py-4 mt-5 border-top border-gradient">
        <p class="mb-0 small text-light opacity-75">
          © 2025 PowerFit Gym. All rights reserved.
          <a href="/privacy" class="text-light text-decoration-none hover-primary">Privacy Policy</a> |
          <a href="/terms" class="text-light text-decoration-none hover-primary">Terms of Service</a>
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
  background: linear-gradient(to bottom, #1a1a1a, #2d2d2d);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(102,126,234,0.05)" fill-opacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,170.7C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  background-size: cover;
  opacity: 0.3;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  position: relative;
  z-index: 1;
}

.text-gradient {
  background: linear-gradient(to right, #667eea, #764ba2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.text-primary {
  color: #3b82f6 !important;
}

.text-light {
  color: #d1d5db !important;
}

.hover-primary {
  transition: all 0.3s ease;
}

.hover-primary:hover {
  color: #3b82f6 !important;
  transform: translateX(5px);
}

h3.h5 {
  font-size: 1.25rem;
  font-weight: 700;
}

.row > div {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding-right: 2rem;
}

.row > div:last-child {
  border-right: none;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #e0f2fe, #dbeafe);
  color: #3b82f6;
  border-radius: 50%;
  transition: all 0.4s ease;
  text-decoration: none;
}

.social-icon:hover {
  background: linear-gradient(to right, #3b82f6, #2563eb);
  color: #ffffff;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.social-icon i {
  font-size: 1.5rem;
}

.social-icon:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.border-gradient {
  border-top: 1px solid transparent;
  border-image: linear-gradient(to right, #667eea, #764ba2) 1;
}

.text-center p {
  font-size: 0.9rem;
}

.text-center a {
  margin: 0 0.5rem;
}

/* Responsive Design */
@media (max-width: 992px) {
  .row > div {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 2rem;
    padding-right: 0;
  }

  .row > div:last-child {
    border-bottom: none;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 1.5rem 1rem;
  }

  h3.h5 {
    font-size: 1.1rem;
  }

  .social-icon {
    width: 40px;
    height: 40px;
  }

  .social-icon i {
    font-size: 1.25rem;
  }

  .text-center p {
    font-size: 0.85rem;
  }
}

/* Accessibility */
a:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
</style>  