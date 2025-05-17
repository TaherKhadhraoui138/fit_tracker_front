<template>
  <div v-if="isLoading" class="text-center py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else>
    <div class="container py-5">
      <header class="admin-header mb-5">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <h1 class="display-4 fw-bold text-dark">Admin Profile</h1>
            <p class="text-secondary fs-5">View and manage your profile details</p>
          </div>
          <button class="btn btn-secondary" @click="goBack">
            <i class="bi bi-arrow-left me-2"></i> Back to Dashboard
          </button>
        </div>
      </header>

      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title fw-semibold mb-4">Profile Details</h3>

              <!-- Read-only View -->
              <div v-if="!isEditing" class="profile-details">
                <dl class="row g-3">
                  <dt class="col-sm-4">Full Name</dt>
                  <dd class="col-sm-8">{{ profile.name || 'N/A' }}</dd>
                  <dt class="col-sm-4">Email Address</dt>
                  <dd class="col-sm-8">{{ profile.email || 'N/A' }}</dd>
                </dl>
                <div class="d-flex gap-2 mt-4">
                  <button class="btn btn-primary" @click="startEditing">Edit Profile</button>
                  <button class="btn btn-danger" @click="showDeleteModal = true">Delete Profile</button>
                </div>
              </div>

              <!-- Edit Form -->
              <form v-else @submit.prevent="saveProfile">
                <div class="mb-4">
                  <label for="name" class="form-label fw-semibold">Full Name</label>
                  <input type="text" id="name" class="form-control" v-model.trim="form.name"
                    :class="{ 'is-invalid': errors.name }" required aria-describedby="nameError" />
                  <div v-if="errors.name" id="nameError" class="invalid-feedback">
                    {{ errors.name }}
                  </div>
                </div>

                <div class="mb-4">
                  <label for="email" class="form-label fw-semibold">Email Address</label>
                  <input type="email" id="email" class="form-control" v-model.trim="form.email"
                    :class="{ 'is-invalid': errors.email }" required aria-describedby="emailError" />
                  <div v-if="errors.email" id="emailError" class="invalid-feedback">
                    {{ errors.email }}
                  </div>
                </div>

                <div class="mb-4">
                  <label for="password" class="form-label fw-semibold">New Password</label>
                  <input type="password" id="password" class="form-control" v-model="form.password"
                    :class="{ 'is-invalid': errors.password }" aria-describedby="passwordError" />
                  <div v-if="errors.password" id="passwordError" class="invalid-feedback">
                    {{ errors.password }}
                  </div>
                </div>

                <div class="mb-4">
                  <label for="confirmPassword" class="form-label fw-semibold">Confirm Password</label>
                  <input type="password" id="confirmPassword" class="form-control" v-model="form.confirmPassword"
                    :class="{ 'is-invalid': errors.confirmPassword }" aria-describedby="confirmPasswordError" />
                  <div v-if="errors.confirmPassword" id="confirmPasswordError" class="invalid-feedback">
                    {{ errors.confirmPassword }}
                  </div>
                </div>

                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary">Save Changes</button>
                  <button type="button" class="btn btn-outline-secondary" @click="cancelEditing">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true"
        role="dialog">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title fw-semibold">Confirm Delete</h5>
              <button type="button" class="btn-close" @click="showDeleteModal = false" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class="text-secondary">Are you sure you want to delete your profile? This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" @click="showDeleteModal = false">Cancel</button>
              <button type="button" class="btn btn-danger" @click="deleteProfile">Delete Profile</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showDeleteModal" class="modal-backdrop fade show"></div>
    </div>
  </div>



</template>

<script>
import UserServices from "@/services/UserServices.js";
import AuthServices from "@/services/AuthServices.js";

export default {
  name: 'AdminProfile',
  data() {
    return {
      profile: {
        name: '',
        email: ''
      },
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      errors: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      isEditing: false,
      showDeleteModal: false,
      isLoading: false
    };
  },
  async created() {
    try {
      const user = AuthServices.getUser();
      if (!user) throw new Error("User not logged in");

      const data = await UserServices.getProfile();
      this.profile = {
        name: data.name || data.full_name,
        email: data.email
      };
      this.form = { ...this.profile, password: '', confirmPassword: '' };
    } catch (error) {
      alert('Failed to load profile: ' + error.message);
    }
  },
  methods: {
    startEditing() {
      this.form = { ...this.profile, password: '', confirmPassword: '' };
      this.isEditing = true;
    },
    cancelEditing() {
      this.isEditing = false;
      this.errors = { name: '', email: '', password: '', confirmPassword: '' };
    },
    validateForm() {
      this.errors = { name: '', email: '', password: '', confirmPassword: '' };
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
          const payload = {
            name: this.form.name,
            email: this.form.email,
            password: this.form.password,
            password_confirmation: this.form.confirmPassword // Match the confirmed rule
          };

          const response = await UserServices.updateProfile(payload);

          // Update local state with API response
          this.profile = {
            name: response.name,
            email: response.email
          };

          // Reset form
          this.isEditing = false;
          this.form.password = '';
          this.form.confirmPassword = '';

          alert('Profile updated successfully!');
        } catch (error) {
          alert('Failed to save profile: ' + error.message);
        }
      }
    },
    async deleteProfile() {
      try {
        await UserServices.deleteUser(this.profile.id);
        alert('Profile deleted successfully!');
        this.showDeleteModal = false;
        this.$router.push('/login');
      } catch (error) {
        alert('Failed to delete profile: ' + error.message);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  }
};
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 1rem;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  margin-top: var(--Header-height, 100px);
}

.admin-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
}

.admin-header p {
  font-size: 1.125rem;
  color: #6b7280;
}

.card {
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-body {
  padding: 2rem;
}

.card-title {
  font-size: 1.5rem;
  color: #2d3748;
}

.profile-details dt {
  font-weight: 600;
  color: #4a5568;
  font-size: 0.95rem;
}

.profile-details dd {
  color: #2d3748;
  font-size: 0.95rem;
  margin-bottom: 0;
}

.form-label {
  font-size: 0.95rem;
  color: #4a5568;
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
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  outline: none;
}

.form-control.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  font-size: 0.85rem;
  color: #dc3545;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.btn-danger {
  background: linear-gradient(135deg, #dc3545, #b02a37);
  color: #ffffff;
  border: none;
}

.btn-danger:hover {
  background: linear-gradient(135deg, #b02a37, #851c2a);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-danger:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.3);
}

.btn-secondary {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  color: #ffffff;
  border: none;
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #4b5563, #374151);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
  background: #f8fafc;
  color: #4b5563;
  transform: translateY(-2px);
}

.btn-outline-secondary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.3);
}

.modal-content {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  border-bottom: none;
  padding: 1.5rem;
}

.modal-title {
  font-size: 1.25rem;
  color: #2d3748;
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

  .admin-header h1 {
    font-size: 2rem;
  }

  .admin-header p {
    font-size: 1rem;
  }

  .card-body {
    padding: 1.5rem;
  }

  .card-title {
    font-size: 1.25rem;
  }

  .profile-details dt,
  .profile-details dd,
  .form-label,
  .form-control {
    font-size: 0.9rem;
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
  .admin-header {
    text-align: center;
  }

  .admin-header .d-flex {
    flex-direction: column;
    align-items: center;
  }

  .profile-details dt {
    margin-bottom: 0.5rem;
  }

  .profile-details dd {
    margin-bottom: 1rem;
  }
}
</style>