<template>
    <section class="login-section min-vh-100 bg-gradient-primary">
        <div class="container h-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card shadow-3d-hover border-0 rounded-4 overflow-hidden">
                        <div class="card-header bg-white text-center pt-5 pb-4 position-relative">
                            <h2 class="fw-bold mb-0">Welcome Back</h2>
                            <p class="text-muted mt-2">Sign in to continue your fitness journey</p>
                        </div>

                        <div class="card-body p-4 p-xl-5">
                            <form @submit.prevent="handleLogin">
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
                                            placeholder="Enter your password" v-model="password" required>
                                        <span
                                            class="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"
                                            @click="showPassword = !showPassword">
                                            <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-between align-items-center mb-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="rememberMe"
                                            v-model="rememberMe">
                                        <label class="form-check-label text-muted" for="rememberMe">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#" class="text-decoration-none text-primary">Forgot Password?</a>
                                </div>

                                <button type="submit" class="btn btn-lg btn-primary w-100 mb-4 py-3 fw-bold shadow-sm"
                                    :disabled="loading">
                                    <span v-if="!loading">Sign In</span>
                                    <div v-else class="spinner-border spinner-border-sm" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </button>

                            
                            </form>
                        </div>

                        <div class="card-footer bg-light text-center py-3">
                            <p class="mb-0">Don't have an account?
                                <router-link to="/register" class="text-decoration-none fw-semibold">Sign up</router-link>
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
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: '',
            rememberMe: false,
            showPassword: false,
            loading: false
        };
    },
    methods: {
        async handleLogin() {
            this.loading = true;
            try {
                await AuthServices.login({
                    email: this.email,
                    password: this.password
                });
                this.$emit('login-success');
                this.$router.push({ name: "home" }); // Change route as needed
            } catch (error) {
                alert('Login failed: ' + (error.response?.data?.message || error.message));
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
.login-section {
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

.position-relative .position-absolute {
    z-index: -1;
    transition: all 0.4s ease;
}

/* Enhanced focus styles */
*:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
}

/* Subtle elevation for cards on hover */
.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

/* Improved button styling if used */
.btn {
    transition: all 0.3s ease;
    padding: 0.5rem 1.25rem;
    font-weight: 600;
    border-radius: 0.5rem;
}

.btn-primary {
    background: linear-gradient(135deg, #4f46e5, #6366f1);
    border: none;
    color: white;
}

.btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(79, 70, 229, 0.3);
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

/* Custom scrollbar (for Webkit browsers) */
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

/* Accessibility improvements */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}

/* Micro-interactions for form elements */
input[type="text"],
input[type="email"],
input[type="password"] {
    transition: all 0.3s ease;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #d1d5db;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}
</style>