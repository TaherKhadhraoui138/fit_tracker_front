<template>
    <div class="home">
        <section class="hero">
            <div class="container">
                <div class="hero-content">
                    <h1>Transform Your Body. Transform Your Life.</h1>
                    <p>Join PowerFit Gym today and get access to world-class facilities, expert trainers, and a
                        supportive community.</p>
                    <div class="hero-buttons">
                        <router-link to="/membership" class="btn-primary">Join Now </router-link>
                        <router-link to="/about" class="btn-secondary">Learn More</router-link>
                    </div>
                </div>
            </div>
        </section>


        <div class="facility-highlights">
            <h3>World-Class Training Environment</h3>
            <ul class="premium-list">
                <li>
                    <i class="fas fa-dumbbell"></i>
                    <div>
                        <h4>10,000+ sq/ft Training Space</h4>
                        <p>Spacious workout zones with dedicated areas for functional training, free weights, and cardio
                        </p>
                    </div>
                </li>
                <li>
                    <i class="fas fa-fan"></i>
                    <div>
                        <h4>Climate-Controlled Environment</h4>
                        <p>Advanced air filtration system with optimal temperature control year-round</p>
                    </div>
                </li>
                <li>
                    <i class="fas fa-shield-alt"></i>
                    <div>
                        <h4>Hospital-Grade Sanitation</h4>
                        <p>24/7 cleaning staff and self-sanitizing equipment surfaces</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="facility-features">
            <div class="feature-card">
                <div class="feature-number">01</div>
                <h4>Luxury Locker Rooms</h4>
                <p>Private showers, premium toiletries, and secured digital lockers</p>
            </div>
            <div class="feature-card">
                <div class="feature-number">02</div>
                <h4>Recovery Zone</h4>
                <p>Cryotherapy chambers, massage chairs, and hydrotherapy pools</p>
            </div>
            <div class="feature-card">
                <div class="feature-number">03</div>
                <h4>Smart Gym Technology</h4>
                <p>Equipment with integrated touchscreens and performance tracking</p>
            </div>
        </div>

        <section class="shop-preview">
            <div class="container">
                <h2>Featured Products</h2>
                <div class="product-grid">

                    <ProductCard
                        :product="{ id: 1, name: 'Gold Standard Whey', price: 49.99, category: 'Supplements' }" @add-to-cart="addToCart" />

                    <ProductCard
                        :product="{ id: 2, name: 'Resistance Bands', price: 19.99, category: 'Accessories' }" @add-to-cart="addToCart" />

                    <ProductCard :product="{ id: 3, name: 'Gym T-Shirt', price: 24.99, category: 'Clothes' }" @add-to-cart="addToCart" />

                </div>
            </div>
        </section>
        <section class="features">
            <div class="container">
                <h2>Why Choose PowerFit?</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <i class="fas fa-dumbbell"></i>
                        <h3>Modern Equipment</h3>
                        <p>State-of-the-art equipment from leading brands to help you achieve your fitness goals.</p>
                    </div>
                    <div class="feature-card">
                        <i class="fas fa-users"></i>
                        <h3>Expert Trainers</h3>
                        <p>Certified professionals to guide you through personalized workout plans and nutrition advice.
                        </p>
                    </div>
                    <div class="feature-card">
                        <i class="fas fa-store"></i>
                        <h3>Premium Shop</h3>
                        <p>High-quality supplements, apparel, and accessories to support your fitness journey.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="testimonials">
            <div class="container">
                <h2>What Our Members Say</h2>
                <div class="testimonial-slider">
                    <div class="testimonial">
                        <p>"PowerFit Gym changed my life! The trainers are amazing and the community is so supportive."
                        </p>
                        <div class="author">
                            <i class="fas fa-user"></i>
                            <span>Sarah J.</span>
                        </div>
                    </div>
                    <div class="testimonial">
                        <p>"Best gym in town! The equipment is top-notch and the supplement shop has everything I need."
                        </p>
                        <div class="author">
                            <i class="fas fa-user"></i>
                            <span>Mike T.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <!-- <section class="cta">
        <div class="container">
            <h2>Ready to Start Your Fitness Journey?</h2>
            <p>Sign up today and get your first month free!</p>
            <router-link to="/membership" class="btn-primary">Get Started</router-link>
        </div>
    </section> -->
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
export default {
    name: 'HomeView',
    components: {
        ProductCard,
    },
};
</script>


<style scoped>
.container {
    width: 90%;
    max-width: 1200px;
    margin: auto;
    padding: 40px 20px;
}

h1,
h2,
h3 {
    color: #1e1e1e;
    margin-bottom: 1rem;
}

a {
    text-decoration: none;
    color: inherit;
}

img {
    max-width: 100%;
    display: block;
}

/* Buttons */
.btn-primary,
.btn-secondary,
.btn-small {
    display: inline-block;
    padding: 12px 24px;
    border-radius: 5px;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
    text-align: center;
}

.btn-primary {
    background-color: var(--primary-color);
    color: white;
}

.btn-primary:hover {
    background-color: var(--primary-hover-color);
}

.btn-secondary {
    background-color: var(--primary-color);
    color: white;
    margin-left: 15px;

}

.btn-secondary:hover {
    background-color: var(--primary-hover-color);
    color: white;
}

.btn-small {
    font-size: 0.85rem;
    padding: 8px 16px;
    background-color: var(--primary-color);
    color: white;
}

.btn-small:hover {
    background-color: var(--primary-hover- color);
}

/* Hero Section */
.hero {
    position: relative;
    color: white;
    padding: 100px 0;
    text-align: center;
    margin-top: 50px;
       height: 100vh;
}

.hero-content {
    max-width: 700px;
    margin: auto;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #000000;
    font-weight: 300;
}

.hero-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
}

/* Features Section */
.features {
    background-color: #fff;
    padding: 80px 0;
}

.features h2 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 2.5rem;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
}

.feature-card {
    background: #f1faee;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    transition: transform 0.3s;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

}

.feature-card:hover {
    transform: scale(1.05);
}

.feature-card i {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 15px;
}

/* Shop Preview */
.shop-preview {
    padding: 80px 0;
}

.shop-preview h2 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 2.5rem;
}


.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2.5rem;
    padding: 2rem 0;
}

.product-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;
    position: relative;
}

.product-card:hover {
    transform: translateY(-5px);
}

.product-badge {
    position: absolute;
    top: 15px;
    left: 15px;
    background: var(--secondary-color);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-weight: bold;
    z-index: 2;
}

.product-image {
    position: relative;
    overflow: hidden;
    height: 350px;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.product-image:hover img {
    transform: scale(1.05);
}

.quick-view {
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 2rem;
    border: none;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
}

.product-card:hover .quick-view {
    bottom: 20px;
}

.product-details {
    padding: 1.5rem;
}

.price-container {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin: 1rem 0;
}

.current-price {
    font-size: 1.4rem;
    color: var(--primary-color);
    font-weight: bold;
}

.original-price {
    color: #888;
    text-decoration: line-through;
}

.product-actions {
    margin-top: 1rem;
}

.add-to-cart {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 25px;
    background: var(--primary-color);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    transition: all 0.3s ease;
}

.add-to-cart:hover {
    background: #ff3333;
    letter-spacing: 1px;
}

/* Testimonials */
.testimonials {
    background-color: #f1faee;
    padding: 80px 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.testimonials h2 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 2.5rem;
}

.testimonial-slider {
    display: flex;
    gap: 30px;
    overflow-x: auto;
    padding-bottom: 20px;
}

.testimonial {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    flex: 1 0 90%;
    max-width: 500px;
}

.testimonial p {
    font-style: italic;
    margin-bottom: 20px;
}

.author {
    display: flex;
    align-items: center;
    gap: 10px;
}

.author i {
    font-size: 1.5rem;
    color: grey;
}

.author span {
    font-weight: bold;
}

/* Call to Action */
.cta {
    text-align: center;
    background-color: #1d3557;
    color: white;
    padding: 80px 20px;
}

.cta h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.cta p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
}

/* Responsive Fix for Mobile */
@media (max-width: 768px) {
    .hero h1 {
        font-size: 2.2rem;
    }

    .testimonial-slider {
        flex-direction: column;
    }
}

.facility-highlights {
    background: rgba(255, 255, 255, 0.95);
    padding: 4rem;
    border-radius: 20px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 2;
}

.premium-list li {
    display: grid;
    grid-template-columns: 60px 1fr;
    gap: 2rem;
    padding: 2rem;
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    margin-bottom: 1.5rem;
    border-radius: 15px;
    transition: transform 0.3s ease;
}

.premium-list li:hover {
    transform: translateX(10px);
}

.premium-list i {
    font-size: 1.8rem;
    color: var(--primary-color);
    background: rgba(255, 77, 77, 0.1);
    padding: 1rem;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.facility-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
    margin-top: 4rem;
    margin-left: 20px;
    margin-right: 20px;
}

.feature-card {
    position: relative;
    padding: 2.5rem;
    background: white;
    border-radius: 15px;
    overflow: hidden;
}

.feature-number {
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 6rem;
    color: rgba(255, 77, 77, 0.1);
    font-weight: 700;
    z-index: 1;
}
</style>