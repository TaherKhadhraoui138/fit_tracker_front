<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Transform Your Body. Transform Your Life.</h1>
          <p>Join PowerFit Gym for world-class facilities, expert trainers, and a supportive community.</p>
          <div class="hero-buttons">
            <router-link to="/membership" class="btn btn-primary">Join Now</router-link>
            <router-link to="/about" class="btn btn-secondary">Learn More</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Facility Highlights -->
    <section class="facility-highlights">
      <div class="container">
        <h2>World-Class Training Environment</h2>
        <ul class="premium-list">
          <li>
            <i class="fas fa-dumbbell"></i>
            <div>
              <h3>10,000+ sq/ft Training Space</h3>
              <p>Spacious zones for functional training, free weights, and cardio.</p>
            </div>
          </li>
          <li>
            <i class="fas fa-fan"></i>
            <div>
              <h3>Climate-Controlled Environment</h3>
              <p>Advanced air filtration with optimal temperature control.</p>
            </div>
          </li>
          <li>
            <i class="fas fa-shield-alt"></i>
            <div>
              <h3>Hospital-Grade Sanitation</h3>
              <p>24/7 cleaning and self-sanitizing equipment surfaces.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Facility Features -->
    <section class="facility-features">
      <div class="container">
        <div class="feature-grid">
          <div class="feature-card" data-aos="fade-up" data-aos-delay="100">
            <div class="feature-number">01</div>
            <h3>Luxury Locker Rooms</h3>
            <p>Private showers, premium toiletries, and secured digital lockers.</p>
          </div>
          <div class="feature-card" data-aos="fade-up" data-aos-delay="200">
            <div class="feature-number">02</div>
            <h3>Recovery Zone</h3>
            <p>Cryotherapy chambers, massage chairs, and hydrotherapy pools.</p>
          </div>
          <div class="feature-card" data-aos="fade-up" data-aos-delay="300">
            <div class="feature-number">03</div>
            <h3>Smart Gym Technology</h3>
            <p>Equipment with touchscreens and performance tracking.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Shop Preview -->
    <section class="shop-preview">
      <div class="container">
        <h2>Featured Products</h2>
        <div class="product-grid">
          <ProductCard
            :product="{ id: 1, name: 'Gold Standard Whey', price: 49.99, category: 'Supplements', image: '/images/protein.jpg', onSale: true, originalPrice: 59.99 }"
            @add-to-cart="addToCart"
          />
          <ProductCard
            :product="{ id: 2, name: 'Resistance Bands', price: 19.99, category: 'Accessories', image: '/images/bands.jpg', onSale: true, originalPrice: 24.99 }"
            @add-to-cart="addToCart"
          />
          <ProductCard
            :product="{ id: 3, name: 'Gym T-Shirt', price: 24.99, category: 'Clothes', image: '/images/tshirt.jpg' }"
            @add-to-cart="addToCart"
          />
        </div>
        <router-link to="/shop/all" class="btn btn-primary btn-shop-all">Shop All Products</router-link>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2>Why Choose PowerFit?</h2>
        <div class="features-grid">
          <div class="feature-card" data-aos="zoom-in" data-aos-delay="100">
            <i class="fas fa-dumbbell"></i>
            <h3>Modern Equipment</h3>
            <p>State-of-the-art equipment from leading brands.</p>
          </div>
          <div class="feature-card" data-aos="zoom-in" data-aos-delay="200">
            <i class="fas fa-users"></i>
            <h3>Expert Trainers</h3>
            <p>Certified professionals for personalized plans.</p>
          </div>
          <div class="feature-card" data-aos="zoom-in" data-aos-delay="300">
            <i class="fas fa-store"></i>
            <h3>Premium Shop</h3>
            <p>High-quality supplements and apparel.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
      <div class="container">
        <h2>What Our Members Say</h2>
        <div class="testimonial-slider">
          <div class="testimonial" v-for="(testimonial, index) in testimonials" :key="index" :class="{ active: currentTestimonial === index }">
            <p>{{ testimonial.text }}</p>
            <div class="author">
              <i class="fas fa-user"></i>
              <span>{{ testimonial.author }}</span>
            </div>
          </div>
        </div>
        <div class="slider-nav">
          <button
            v-for="(testimonial, index) in testimonials"
            :key="index"
            :class="{ active: currentTestimonial === index }"
            @click="currentTestimonial = index"
            :aria-label="`Go to testimonial ${index + 1}`"
          ></button>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <h2>Ready to Start Your Fitness Journey?</h2>
        <p>Sign up today and get your first month free!</p>
        <router-link to="/membership" class="btn btn-primary">Get Started</router-link>
      </div>
    </section>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'HomeView',
  components: {
    ProductCard,
  },
  data() {
    return {
      currentTestimonial: 0,
      testimonials: [
        {
          text: "PowerFit Gym changed my life! The trainers are amazing and the community is so supportive.",
          author: "Sarah J.",
        },
        {
          text: "Best gym in town! The equipment is top-notch and the supplement shop has everything I need.",
          author: "Mike T.",
        },
      ],
    };
  },
  mounted() {
    this.startTestimonialSlider();
  },
  beforeUnmount() {
    clearInterval(this.sliderInterval);
  },
  methods: {
    addToCart(product) {
      console.log("Adding to cart:", product);
      alert(`${product.name} added to cart!`);
    },
    startTestimonialSlider() {
      this.sliderInterval = setInterval(() => {
        this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
      }, 5000);
    },
  },
};
</script>

<style scoped>
.home {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #f8fafc;
}

/* General Styles */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1, h2, h3 {
  color: #1a1a1a;
  margin-bottom: 1rem;
}

h1 { font-size: 3.5rem; font-weight: 800; }
h2 { font-size: 2.5rem; font-weight: 700; text-align: center; }
h3 { font-size: 1.5rem; font-weight: 600; }

.btn {
  display: inline-block;
  padding: 0.9rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  text-align: center;
  transition: all 0.4s ease;
}

.btn-primary {
  background: linear-gradient(to right, #667eea, #764ba2);
  color: #ffffff;
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(to right, #5b67d8, #6b3e99);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background: #ffffff;
  color: #3b82f6;
  border: 2px solid #3b82f6;
}

.btn-secondary:hover {
  background: #f1f5f9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Hero Section */
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('') center/cover no-repeat;
  color: #ffffff;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(255,255,255,0.1)" fill-opacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,170.7C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  background-size: cover;
  opacity: 0.2;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero h1 {
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.hero p {
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: #f1f5f9;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

/* Facility Highlights */
.facility-highlights {
  padding: 5rem 0;
  background: #ffffff;
}

.premium-list {
  display: grid;
  gap: 1.5rem;
}

.premium-list li {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.4s ease;
}

.premium-list li:hover {
  transform: translateX(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.premium-list i {
  font-size: 2rem;
  color: #3b82f6;
  background: linear-gradient(to right, #e0f2fe, #dbeafe);
  padding: 1.5rem;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease;
}

.premium-list li:hover i {
  transform: scale(1.1);
}

.premium-list h3 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.premium-list p {
  font-size: 1rem;
  color: #6b7280;
}

/* Facility Features */
.facility-features {
  padding: 5rem 0;
  background: #f8fafc;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  position: relative;
  padding: 2.5rem;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.4s ease;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.feature-number {
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 5rem;
  font-weight: 800;
  color: rgba(102, 126, 234, 0.1);
  z-index: 0;
  transition: color 0.4s ease;
}

.feature-card:hover .feature-number {
  color: rgba(102, 126, 234, 0.2);
}

.feature-card h3 {
  font-size: 1.4rem;
  position: relative;
  z-index: 1;
}

.feature-card p {
  font-size: 1rem;
  color: #6b7280;
  position: relative;
  z-index: 1;
}

/* Shop Preview */
.shop-preview {
  padding: 5rem 0;
  background: #ffffff;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.btn-shop-all {
  display: block;
  margin: 2rem auto 0;
  max-width: 300px;
}

/* Features Section */
.features {
  padding: 5rem 0;
  background: #f8fafc;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.features .feature-card {
  text-align: center;
  padding: 2rem;
}

.features .feature-card i {
  font-size: 3rem;
  color: #3b82f6;
  margin-bottom: 1rem;
  transition: transform 0.4s ease;
}

.features .feature-card:hover i {
  transform: scale(1.2);
}

.features .feature-card h3 {
  font-size: 1.4rem;
}

.features .feature-card p {
  font-size: 1rem;
  color: #6b7280;
}

/* Testimonials Section */
.testimonials {
  padding: 5rem 0;
  background: linear-gradient(to right, #e0f2fe, #dbeafe);
}

.testimonial-slider {
  position: relative;
  overflow: hidden;
  padding: 1rem 0;
}

.testimonial {
  background: #ffffff;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  max-width: 600px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.testimonial.active {
  opacity: 1;
  transform: translateY(0);
}

.testimonial p {
  font-size: 1.1rem;
  font-style: italic;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author i {
  font-size: 1.5rem;
  color: #3b82f6;
}

.author span {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.slider-nav {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
}

.slider-nav button {
  width: 12px;
  height: 12px;
  background: #6b7280;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.slider-nav button.active {
  background: #3b82f6;
  transform: scale(1.2);
}

/* CTA Section */
.cta {
  padding: 5rem 0;
  background: linear-gradient(to right, #667eea, #764ba2);
  color: #ffffff;
  text-align: center;
}

.cta h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta p {
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: #f1f5f9;
}

.cta .btn-primary {
  padding: 1rem 2.5rem;
}

/* Responsive Design */
@media (max-width: 992px) {
  .hero h1 {
    font-size: 3rem;
  }

  .hero p {
    font-size: 1.1rem;
  }

  .premium-list li {
    grid-template-columns: 60px 1fr;
    padding: 1.5rem;
  }

  .premium-list i {
    width: 60px;
    height: 60px;
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .hero {
    height: 80vh;
  }

  .hero h1 {
    font-size: 2.5rem;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 1rem;
  }

  .facility-highlights {
    padding: 3rem 0;
  }

  .premium-list li {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .premium-list i {
    margin: 0 auto 1rem;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .product-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  h1 { font-size: 2rem; }
  h2 { font-size: 2rem; }
  .container {
    padding: 1.5rem 1rem;
  }

  .hero {
    height: 70vh;
  }
}

/* Accessibility */
.btn:focus,
.slider-nav button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
</style>