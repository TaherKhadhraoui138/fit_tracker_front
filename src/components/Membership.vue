<template>
    <!-- Hero Section -->
    <section class="membership-hero bg-dark text-white py-5 position-relative overflow-hidden">
        <div class="container d-flex align-items-center justify-content-center min-vh-60">
            <div class="text-center position-relative z-2">
                <h1 class="display-3 fw-bold mb-4 animate__animated animate__fadeInDown">Elevate Your Fitness Journey</h1>
                <p class="lead fs-4 mb-5 opacity-75 animate__animated animate__fadeIn animate__delay-1s">Tailored memberships for every ambition</p>
                <div class="scroll-indicator animate__animated animate__bounce animate__infinite">
                    <i class="bi bi-arrow-down fs-4"></i>
                </div>
            </div>
        </div>
        <div class="hero-shape"></div>
    </section>

    <!-- Pricing Plans -->
    <section class="membership-plans mt-5 py-6 position-relative">
        <div class="container">
            <div class="row g-4 justify-content-center">
                <!-- Basic Plan -->
                <div class="col-lg-4">
                    <div class="card h-100 border-0 shadow-lg-hover hover-scale">
                        <div class="card-header bg-gradient-primary text-white text-center py-5 position-relative">
                            <div class="decorative-line"></div>
                            <h3 class="card-title mb-0 fs-2">Basic</h3>
                            <div class="price display-2 fw-black my-3">$29<span class="fs-5 fw-normal">/month</span></div>
                        </div>
                        <div class="card-body p-4">
                            <ul class="list-unstyled mb-4">
                                <li class="mb-3 d-flex align-items-center"><i class="bi bi-check2-circle fs-5 text-success me-2"></i>Gym Access</li>
                                <li class="mb-3 d-flex align-items-center"><i class="bi bi-check2-circle fs-5 text-success me-2"></i>Free Wi-Fi</li>
                                <li class="mb-3 d-flex align-items-center"><i class="bi bi-check2-circle fs-5 text-success me-2"></i>Locker Room</li>
                                <li class="mb-3 d-flex align-items-center opacity-50"><i class="bi bi-x-circle fs-5 text-danger me-2"></i>Group Classes</li>
                                <li class="mb-3 d-flex align-items-center opacity-50"><i class="bi bi-x-circle fs-5 text-danger me-2"></i>Personal Trainer</li>
                                <li class="d-flex align-items-center opacity-50"><i class="bi bi-x-circle fs-5 text-danger me-2"></i>Spa Access</li>
                            </ul>
                            <a href="#" class="btn btn-lg btn-gradient-primary w-100 py-3">Start Basic</a>
                        </div>
                    </div>
                </div>

                <!-- Pro Plan -->
                <div class="col-lg-4">
                    <div class="card h-100 border-0 shadow-lg-hover hover-scale active-plan">
                        <span class="popular-badge bg-gradient-primary py-2 px-4">
                            <i class="bi bi-star-fill me-2"></i>Most Popular
                        </span>
                        <div class="card-header bg-gradient-primary text-white text-center py-5 position-relative">
                            <div class="decorative-line"></div>
                            <h3 class="card-title mb-0 fs-2">Pro</h3>
                            <div class="price display-2 fw-black my-3">$49<span class="fs-5 fw-normal">/month</span></div>
                        </div>
                        <div class="card-body p-4">
                            <ul class="list-unstyled mb-4">
                                <li class="mb-3 d-flex align-items-center"><i class="bi bi-check2-circle fs-5 text-success me-2"></i>All Basic Features</li>
                                <li class="mb-3 d-flex align-items-center"><i class="bi bi-check2-circle fs-5 text-success me-2"></i>Group Classes</li>
                                <li class="mb-3 d-flex align-items-center"><i class="bi bi-check2-circle fs-5 text-success me-2"></i>1 PT Session</li>
                                <li class="mb-3 d-flex align-items-center"><i class="bi bi-check2-circle fs-5 text-success me-2"></i>Sauna Access</li>
                                <li class="mb-3 d-flex align-items-center"><i class="bi bi-check2-circle fs-5 text-success me-2"></i>Nutrition Guide</li>
                                <li class="d-flex align-items-center opacity-50"><i class="bi bi-x-circle fs-5 text-danger me-2"></i>Spa Access</li>
                            </ul>
                            <a href="#" class="btn btn-lg btn-gradient-primary w-100 py-3">Choose Pro</a>
                        </div>
                    </div>
                </div>

                <!-- Premium Plan -->
                <div class="col-lg-4">
                    <div class="card h-100 border-0 shadow-lg-hover hover-scale">
                        <div class="card-header bg-gradient-primary text-white text-center py-5 position-relative">
                            <div class="decorative-line"></div>
                            <h3 class="card-title mb-0 fs-2">Premium</h3>
                            <div class="price display-2 fw-black my-3">$79<span class="fs-5 fw-normal">/month</span></div>
                        </div>
                        <div class="card-body p-4">
                            <ul class="list-unstyled mb-4">
                                <li class="mb-3 d-flex align-items-center"><i class="bi bi-check2-circle fs-5 text-success me-2"></i>All Pro Features</li>
                                <li class="mb-3 d-flex align-items-center"><i class="bi bi-check2-circle fs-5 text-success me-2"></i>4 PT Sessions</li>
                                <li class="mb-3 d-flex align-items-center"><i class="bi bi-check2-circle fs-5 text-success me-2"></i>Spa Access</li>
                                <li class="mb-3 d-flex align-items-center"><i class="bi bi-check2-circle fs-5 text-success me-2"></i>VIP Lounge</li>
                                <li class="mb-3 d-flex align-items-center"><i class="bi bi-check2-circle fs-5 text-success me-2"></i>Massage Credit</li>
                                <li class="d-flex align-items-center"><i class="bi bi-check2-circle fs-5 text-success me-2"></i>Priority Booking</li>
                            </ul>
                            <a href="#" class="btn btn-lg btn-gradient-primary w-100 py-3">Go Premium</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Benefits Section -->
    <section class="membership-benefits mt-5 mb-5 py-6 bg-gradient-light">
    <div class="container">
        <h2 class="text-center mb-5 display-4 fw-bold position-relative z-2">Why Choose Us?</h2>
        <div class="row g-4">
            <div class="col-md-6 col-lg-3">
                <div class="card h-100 border-0 shadow-hover bg-transparent">
                    <div class="card-body text-center p-4">
                        <div class="icon-wrapper bg-gradient-primary mb-4">
                            <i class="bi bi-calendar3 fs-2 text-white"></i>
                        </div>
                        <h3 class="h4 fw-bold mb-3">Flexible Hours</h3>
                        <p class="text-muted mb-0">Open 7 days a week with extended hours to fit your schedule.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div class="card h-100 border-0 shadow-hover bg-transparent">
                    <div class="card-body text-center p-4">
                        <div class="icon-wrapper bg-gradient-primary mb-4">
                            <i class="bi bi-people fs-2 text-white"></i>
                        </div>
                        <h3 class="h4 fw-bold mb-3">Supportive Community</h3>
                        <p class="text-muted mb-0">Join like-minded fitness enthusiasts in our motivating environment.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div class="card h-100 border-0 shadow-hover bg-transparent">
                    <div class="card-body text-center p-4">
                        <div class="icon-wrapper bg-gradient-primary mb-4">
                            <i class="bi bi-percent fs-2 text-white"></i>
                        </div>
                        <h3 class="h4 fw-bold mb-3">Exclusive Discounts</h3>
                        <p class="text-muted mb-0">Member-only savings on supplements, gear, and wellness services.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div class="card h-100 border-0 shadow-hover bg-transparent">
                    <div class="card-body text-center p-4">
                        <div class="icon-wrapper bg-gradient-primary mb-4">
                            <i class="bi bi-trophy fs-2 text-white"></i>
                        </div>
                        <h3 class="h4 fw-bold mb-3">Premium Challenges</h3>
                        <p class="text-muted mb-0">Compete in member-exclusive fitness challenges with prizes.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    name: 'MemberShip',
};
</script>

<style scoped>
.membership-hero {
    background: linear-gradient(135deg, rgba(10, 25, 47, 0.95) 0%, rgba(16, 37, 66, 0.95) 100%), 
                 center/cover;
    clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
    margin-top: var(--Header-height,80px);
}

.min-vh-60 {
    min-height: 60vh;
}

.hover-scale {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.3s ease;
}

.hover-scale:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
}

.bg-gradient-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn-gradient-primary {
    background: linear-gradient(to right, #667eea, #764ba2);
    border: none;
    color: white;
    transition: all 0.3s ease;
}

.btn-gradient-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.popular-badge {
    position: absolute;
    top: -15px;
    right: -15px;
    border-radius: 25px;
    font-size: 0.9rem;
    z-index: 2;
    box-shadow: 0 5px 15px rgba(118, 75, 162, 0.3);
    animation: pulse 2s infinite;
}

.icon-wrapper {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.decorative-line {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

@media (max-width: 768px) {
    .membership-hero {
        clip-path: polygon(0 0, 100% 0, 100% 95%, 0 100%);
    }
    
    .display-3 {
        font-size: 2.5rem;
    }
}
</style>