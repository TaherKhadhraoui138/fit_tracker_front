<template>
  <div class="container py-5">
    <header class="user-header mb-5">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div>
          <h1 class="display-4 fw-bold text-dark">Your Profile</h1>
          <p class="text-gray fs-5">Manage your account and subscription details</p>
        </div>
        <button class="btn btn-secondary" @click="goBack">
          <i class="bi bi-house-door-fill me-2"></i> Back to Home
        </button>
      </div>
    </header>

    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card h-100">
          <div class="card-body">
            <!-- Read-only View -->
            <div v-if="!isEditing" class="profile-details">
              <div class="text-center mb-4">
                <img :src="profile.avatar || 'https://via.placeholder.com/120'" alt="User avatar" class="avatar" />
                <h3 class="card-title fw-bold mt-3">{{ profile.name || 'N/A' }}</h3>
                
              </div>
              <dl class="row g-3">
                <dt class="col-sm-4 fw-semibold text-primary">Email</dt>
                <dd class="col-sm-8">{{ profile.email || 'N/A' }}</dd>

                <dt class="col-sm-4 fw-semibold text-primary">Joined</dt>
                <dd class="col-sm-8">{{ profile.createdat ? new Date(profile.createdat).toLocaleDateString() : 'N/A' }}</dd> <!-- Display join date -->
              </dl>

              <!-- Subscription Details -->
              <div class="subscription-details mt-5">
                <h4 class="fw-semibold mb-3 text-dark">Subscription Details</h4>
                <div class="card bg-light p-3">
                  <dl class="row g-3 mb-0">
                    <dt class="col-sm-4 fw-semibold text-primary">Plan</dt>
                    <dd class="col-sm-8">{{ subscription.plan || 'None' }}</dd>
                    <dt class="col-sm-4 fw-semibold text-primary">Days Remaining</dt>
                    <dd class="col-sm-8">{{ subscription.daysRemaining || 'N/A' }}</dd>
                  </dl>
                  <div class="d-flex gap-2 mt-3">
                    <button class="btn btn-primary" @click="$router.push('/upgrade')">
                      <i class="bi bi-arrow-up-circle me-2"></i> Upgrade Plan
                    </button>
                    <button class="btn btn-outline-danger" @click="showCancelSubscriptionModal = true"
                      :disabled="subscription.plan === 'None'">
                      <i class="bi bi-x-circle me-2"></i> Cancel Subscription
                    </button>
                  </div>
                </div>
              </div>

              <div class="d-flex gap-2 mt-5 justify-content-center">
                <button class="btn btn-primary" @click="startEditing">
                  <i class="bi bi-pencil-fill me-2"></i> Edit Profile
                </button>
                <button class="btn btn-danger" @click="showDeleteModal = true">
                  <i class="bi bi-trash-fill me-2"></i> Delete Account
                </button>
              </div>
            </div>

            <!-- Edit Form -->
            <form v-else @submit.prevent="saveProfile">
              <div class="mb-4 text-center">
                <label for="avatar" class="form-label fw-semibold text-primary">Avatar</label>
                <img :src="form.avatar || 'https://via.placeholder.com/120'" alt="Avatar preview" class="avatar mb-2" />
                <input type="file" id="avatar" class="form-control" accept="image/*" @change="handleAvatarUpload"
                  aria-describedby="avatarHelp" />
                <div id="avatarHelp" class="form-text">Upload a new profile picture (optional, max 2MB).</div>
                <div v-if="errors.avatar" class="invalid-feedback d-block">{{ errors.avatar }}</div>
              </div>

              <div class="mb-4">
                <label for="name" class="form-label fw-semibold text-primary">Full Name</label>
                <input type="text" id="name" class="form-control" v-model.trim="form.name"
                  :class="{ 'is-invalid': errors.name }" required aria-describedby="nameError" />
                <div v-if="errors.name" id="nameError" class="invalid-feedback">
                  {{ errors.name }}
                </div>
              </div>

              <div class="mb-4">
                <label for="email" class="form-label fw-semibold text-primary">Email Address</label>
                <input type="email" id="email" class="form-control" v-model.trim="form.email"
                  :class="{ 'is-invalid': errors.email }" required aria-describedby="emailError" />
                <div v-if="errors.email" id="emailError" class="invalid-feedback">
                  {{ errors.email }}
                </div>
              </div>

              

              <div class="mb-4">
                <label for="password" class="form-label fw-semibold text-primary">New Password</label>
                <input type="password" id="password" class="form-control" v-model="form.password"
                  :class="{ 'is-invalid': errors.password }" aria-describedby="passwordError" />
                <div v-if="errors.password" id="passwordError" class="invalid-feedback">
                  {{ errors.password }}
                </div>
              </div>

              <div class="mb-4">
                <label for="confirmPassword" class="form-label fw-semibold text-primary">Confirm Password</label>
                <input type="password" id="confirmPassword" class="form-control" v-model="form.confirmPassword"
                  :class="{ 'is-invalid': errors.confirmPassword }" aria-describedby="confirmPasswordError" />
                <div v-if="errors.confirmPassword" id="confirmPasswordError" class="invalid-feedback">
                  {{ errors.confirmPassword }}
                </div>
              </div>

              <div class="d-flex gap-2 justify-content-center">
                <button type="submit" class="btn btn-primary">Save Changes</button>
                <button type="button" class="btn btn-outline-secondary" @click="cancelEditing">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Account Modal -->
    <div v-if="showDeleteModal" class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true"
      role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold text-primary">Confirm Account Deletion</h5>
            <button type="button" class="btn-close" @click="showDeleteModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="text-gray">Are you sure you want to delete your account? This action is permanent and cannot be
              undone.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" @click="showDeleteModal = false">Cancel</button>
            <button type="button" class="btn btn-danger" @click="deleteProfile">Delete Account</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cancel Subscription Modal -->
    <div v-if="showCancelSubscriptionModal" class="modal fade show" tabindex="-1" style="display: block;"
      aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold text-primary">Confirm Subscription Cancellation</h5>
            <button type="button" class="btn-close" @click="showCancelSubscriptionModal = false"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="text-gray">Are you sure you want to cancel your {{ subscription.plan }} subscription? You will
              lose access to premium features.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary"
              @click="showCancelSubscriptionModal = false">Cancel</button>
            <button type="button" class="btn btn-danger" @click="cancelSubscription">Cancel Subscription</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDeleteModal || showCancelSubscriptionModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import UserServices from "@/services/UserServices.js";
import AuthServices from "@/services/AuthServices.js";

export default {
  name: 'UserProfile',
  data() {
    return {
      profile: {
        name: '',
        email: '',
        avatar: '',
        role: '', // Added to store role
        createdAt: '' // Added to store join date
      },
      subscription: {
        plan: 'None',
        daysRemaining: 0
      },
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: ''
      },
      errors: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: ''
      },
      isEditing: false,
      showDeleteModal: false,
      showCancelSubscriptionModal: false
    };
  },
  async created() {
    try {
      // Get initial user data from AuthServices
      const authUser = AuthServices.getUser();
      if (authUser) {
        this.profile = {
          name: authUser.name || authUser.username || 'N/A', // Fallback to username if name is missing
          email: authUser.email || 'N/A',
          role: authUser.role || 'N/A', // Role from AuthServices
          createdAt: authUser.createdAt || '' // Join date from AuthServices
        };
      }

      // Fetch additional profile details from UserServices
      const { data } = await UserServices.getProfile();
      this.profile = {
        ...this.profile,
        avatar: data.avatar || 'https://via.placeholder.com/120'
      };

      // Fetch subscription details (assuming an endpoint exists)
      const subData = await UserServices.getSubscription(); // Assuming this method exists
      this.subscription = {
        plan: subData.plan || 'None',
        daysRemaining: subData.daysRemaining || 0
      };

      // Set form fields for editing
      this.form = { ...this.profile, password: '', confirmPassword: '' };
    } catch (error) {
      alert('Failed to load profile: ' + (error.response?.data?.message || error.message));
    }
  },
  methods: {
    startEditing() {
      this.form = { ...this.profile, password: '', confirmPassword: '' };
      this.isEditing = true;
    },
    cancelEditing() {
      this.isEditing = false;
      this.errors = { name: '', email: '', password: '', confirmPassword: '', avatar: '' };
    },
    handleAvatarUpload(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          this.errors.avatar = 'Image must be less than 2MB.';
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          this.form.avatar = e.target.result;
          this.errors.avatar = '';
        };
        reader.readAsDataURL(file);
      }
    },
    validateForm() {
      this.errors = { name: '', email: '', password: '', confirmPassword: '', avatar: '' };
      let isValid = true;

      if (!this.form.name) {
        this.errors.name = 'Full name is required.';
        isValid = false;
      }

      if (!this.form.email) {
        this.errors.email = 'Email is required.';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.errors.email = 'Please enter a valid email address.';
        isValid = false;
      }

      if (this.form.password && this.form.password.length < 8) {
        this.errors.password = 'Password must be at least 8 characters long.';
        isValid = false;
      }

      if (this.form.password && this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = 'Passwords do not match.';
        isValid = false;
      }

      return isValid;
    },
    async saveProfile() {
      if (this.validateForm()) {
        try {
          const updateData = {
            name: this.form.name,
            email: this.form.email,
            avatar: this.form.avatar
          };
          if (this.form.password) {
            updateData.password = this.form.password;
            updateData.password_confirmation = this.form.confirmPassword;
          }
          await UserServices.updateProfile(updateData);
          this.profile = { ...this.profile, ...updateData };
          this.isEditing = false;
          alert('Profile saved successfully!');
          this.form.password = '';
          this.form.confirmPassword = '';
        } catch (error) {
          alert('Failed to save profile: ' + (error.response?.data?.message || error.message));
        }
      }
    },
    async deleteProfile() {
      try {
        await UserServices.deleteUser(this.profile.id || this.getCurrentUser().id); // Use user ID
        alert('Account deleted successfully!');
        this.showDeleteModal = false;
        AuthServices.logout(); // Log out after deletion
        this.$router.push('/login');
      } catch (error) {
        alert('Failed to delete account: ' + (error.response?.data?.message || error.message));
      }
    },
    async cancelSubscription() {
      try {
        await UserServices.cancelSubscription(); // Assuming this method exists
        this.subscription = { plan: 'None', daysRemaining: 0 };
        this.showCancelSubscriptionModal = false;
        alert('Subscription cancelled successfully!');
      } catch (error) {
        alert('Failed to cancel subscription: ' + (error.response?.data?.message || error.message));
      }
    },
    goBack() {
      this.$router.push('/');
    },
    getCurrentUser() {
      return AuthServices.getUser();
    }
  }
};
</script>

<style scoped>
/* Existing styles remain unchanged */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 1rem;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  margin-top: var(--Header-height, 100px);
}

.user-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
}

.user-header p {
  font-size: 1.125rem;
  color: #6b7280;
}

.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
}

.card-body {
  padding: 2rem;
}

.card-title {
  font-size: 1.5rem;
  color: #1a1a1a;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid #3b82f6;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-details dt {
  font-weight: 600;
  color: #3b82f6;
  font-size: 0.95rem;
}

.profile-details dd {
  color: #1f2937;
  font-size: 0.95rem;
  margin-bottom: 0;
}

.subscription-details h4 {
  font-size: 1.25rem;
  color: #1a1a1a;
}

.bg-light {
  background-color: #f1f5f9 !important;
  border-radius: 8px;
}

.form-label {
  font-size: 0.95rem;
  color: #3b82f6;
}

.form-control {
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  padding: 0.75rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  outline: none;
}

.form-control.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  font-size: 0.85rem;
  color: #dc3545;
}

.form-text {
  font-size: 0.85rem;
  color: #6b7280;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.btn-danger {
  background: linear-gradient(135deg, #dc3545, #b91c1c);
  color: #ffffff;
  border: none;
}

.btn-danger:hover {
  background: linear-gradient(135deg, #b91c1c, #991b1b);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.btn-danger:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.3);
}

.btn-secondary {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  color: #ffffff;
  border: none;
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #4b5563, #374151);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);
}

.btn-secondary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.3);
}

.btn-outline-secondary {
  border: 1px solid #6b7280;
  color: #6b7280;
  background: none;
}

.btn-outline-secondary:hover {
  background: #f1f5f9;
  color: #374151;
  transform: translateY(-2px);
}

.btn-outline-secondary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.3);
}

.btn-outline-danger {
  border: 1px solid #dc3545;
  color: #dc3545;
  background: none;
}

.btn-outline-danger:hover {
  background: #fef2f2;
  color: #b91c1c;
  transform: translateY(-2px);
}

.btn-outline-danger:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.3);
}

.btn-outline-danger:disabled {
  border-color: #e5e7eb;
  color: #d1d5db;
  cursor: not-allowed;
}

.modal-content {
  border-radius: 12px;
  border: 1px solid #3b82f6;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.modal-header {
  border-bottom: none;
  padding: 1.5rem;
}

.modal-title {
  font-size: 1.25rem;
  color: #3b82f6;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  border-top: none;
  padding: 1.5rem;
}

.btn-close {
  filter: invert(0.5);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 2rem 1rem;
  }

  .user-header h1 {
    font-size: 2rem;
  }

  .user-header p {
    font-size: 1rem;
  }

  .card-body {
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.25rem;
  }

  .avatar {
    width: 100px;
    height: 100px;
  }

  .profile-details dt,
  .profile-details dd,
  .subscription-details dt,
  .subscription-details dd,
  .form-label,
  .form-control {
    font-size: 0.9rem;
  }

  .subscription-details h4 {
    font-size: 1.1rem;
  }

  .btn {
    width: 100%;
    text-align: center;
  }

  .modal-dialog {
    margin: 1rem;
  }
}

@media (max-width: 576px) {
  .user-header {
    text-align: center;
  }

  .user-header .d-flex {
    flex-direction: column;
    align-items: center;
  }

  .profile-details dt,
  .subscription-details dt {
    margin-bottom: 0.5rem;
  }

  .profile-details dd,
  .subscription-details dd {
    margin-bottom: 1rem;
  }

  .avatar {
    width: 80px;
    height: 80px;
  }
}
</style>