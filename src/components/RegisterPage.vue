<template>
    <section class="register-section min-vh-100 bg-gradient-primary">
        <div class="container h-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card shadow-3d-hover border-0 rounded-4 overflow-hidden">
                        <div class="card-header bg-white text-center pt-5 pb-4 position-relative">
                            <h2 class="fw-bold mb-0">Create Your Account</h2>
                            <p class="text-muted mt-2">Join us and start your fitness journey</p>
                        </div>

                        <div class="card-body p-4 p-xl-5">
                            <form @submit.prevent="handleRegister">
                                <div class="mb-4">
                                    <label for="username" class="form-label fw-semibold">Username</label>
                                    <input type="text" class="form-control" id="username"
                                        placeholder="Enter your username" v-model="username" required>
                                </div>

                                <div class="mb-4">
                                    <label for="email" class="form-label fw-semibold">Email Address</label>
                                    <div class="input-group">
                                        <span class="input-group-text bg-light border-end-0">
                                            <i class="bi bi-envelope text-muted"></i>
                                        </span>
                                        <input type="email" class="form-control border-start-0" id="email"
                                            placeholder="Enter your email" v-model="email" required>
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label for="password" class="form-label fw-semibold">Password</label>
                                    <div class="input-group">
                                        <span class="input-group-text bg-light border-end-0">
                                            <i class="bi bi-lock text-muted"></i>
                                        </span>
                                        <input :type="showPassword ? 'text' : 'password'"
                                            class="form-control border-start-0 pe-5" id="password"
                                            placeholder="Create a password" v-model="password" required>
                                        <span
                                            class="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"
                                            @click="showPassword = !showPassword">
                                            <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label for="password" class="form-label fw-semibold">Confirm Password</label>
                                    <div class="input-group">
                                        <span class="input-group-text bg-light border-end-0">
                                            <i class="bi bi-lock text-muted"></i>
                                        </span>
                                        <input :type="showPassword ? 'text' : 'password'"
                                            class="form-control border-start-0 pe-5" id="password"
                                            placeholder="Confirm password" v-model="confirmPassword" required>
                                        <span
                                            class="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"
                                            @click="showPassword = !showPassword">
                                            <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                        </span>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-lg btn-primary w-100 mb-4 py-3 fw-bold shadow-sm"
                                    :disabled="loading">
                                    <span v-if="!loading">Sign Up</span>
                                    <div v-else class="spinner-border spinner-border-sm" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </button>

                            </form>
                        </div>

                        <div class="card-footer bg-light text-center py-3">
                            <p class="mb-0">Already have an account?
                                <router-Link to="/login" class="text-decoration-none fw-semibold">Sign in</router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import AuthServices from "@/services/AuthServices.js";

export default {
    name: 'RegisterPage',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            showPassword: false,
            loading: false
        }
    },
    methods: {
        async handleRegister() {
            this.loading = true;
            try {
                if (this.password !== this.confirmPassword) {
                    alert('Passwords do not match!');
                    return;
                }
                await AuthServices.register({
                    name: this.username,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.confirmPassword
                });
                alert('Registration successful!');
                this.$router.push({ name: "login" }); // Redirect to login page
            } catch (error) {
                alert('Registration failed: ' + (error.response?.data?.message || error.message));
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>

<style scoped>
.register-section {
    position: relative;
    margin-top: var(--Header-height,150px);

    margin-bottom: 50px;
}

.card {
    border-radius: 1rem;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border: 1px solid #3317af;
    background: linear-gradient(145deg, #ffffff, #f6f7ff);
    will-change: transform, box-shadow;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.16);
}

.decorative-line {
    width: 60px;
    height: 4px;
    border-radius: 3px;
    background: linear-gradient(90deg, #4f46e5, #6366f1);
    margin: 0.5rem auto 1.25rem;
    opacity: 0.8;
    transition: width 0.3s ease-in-out;
}

.card:hover .decorative-line {
    width: 80px;
}

.input-group-text {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    background-color: #f3f4f6;
    border-left: none;
    color: #4b5563;
}

.form-control {
    transition: all 0.3s ease;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #d1d5db;
}

.form-control:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}

.form-control:focus+.input-group-text {
    background-color: #e0e0e0;
    transform: scale(1.05);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}

.cursor-pointer {
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
}

.cursor-pointer:hover {
    transform: scale(1.03);
}

.btn-primary {
    background: linear-gradient(135deg, #4f46e5, #6366f1);
    border: none;
    color: white;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(79, 70, 229, 0.3);
}

.spinner-border {
    width: 1.5rem;
    height: 1.5rem;
    animation: spin 0.8s linear infinite;
    border: 2px solid transparent;
    border-top-color: #4f46e5;
    border-right-color: #4f46e5;
    border-radius: 50%;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.card-footer {
    background-color: #f8f9fa;
    border-top: 1px solid #e9ecef;
}

.btn-outline-dark {
    border-color: #dee2e6;
    color: #4b5563;
    transition: all 0.3s ease;
}

.btn-outline-dark:hover {
    background-color: #f8f9fa;
    border-color: #4f46e5;
    color: #4f46e5;
}

.text-muted {
    color: #6b7280 !important;
}

a {
    color: #4f46e5;
    transition: color 0.3s ease;
}

a:hover {
    color: #4338ca;
}

.position-relative hr {
    background-color: #e5e7eb;
    height: 1px;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}

@media (max-width: 768px) {
    .register-section {
        margin-top: 100px;
        margin-bottom: 30px;
    }

    .card {
        margin: 0 1rem;
    }
}
</style>
