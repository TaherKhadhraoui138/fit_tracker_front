<template>
  <div class="container py-5">
    <header class="admin-header mb-5">
      <div>
        <h1 class="display-4 fw-bold text-dark">Admin Dashboard</h1>
        <p class="text-secondary fs-5">Manage Profiles, Users, and Products seamlessly</p>
      </div>
    </header>

    <div class="row g-4">
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column justify-content-between">
            <div class="d-flex align-items-center mb-4">
              <i class="bi bi-person-circle fs-1 text-primary me-3"></i>
              <h5 class="mb-0 fw-semibold">Profile</h5>
            </div>
            <p class="text-secondary flex-grow-1">Manage user profiles and access levels.</p>
            <router-link to="/admin/profile" class="btn btn-primary mt-3">Manage Profile</router-link>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column justify-content-between">
            <div class="d-flex align-items-center mb-4">
              <i class="bi bi-people fs-1 text-success me-3"></i>
              <h5 class="mb-0 fw-semibold">Users</h5>
            </div>
            <p class="text-secondary flex-grow-1">View, edit, and delete users.</p>
            <router-link to="/admin/users" class="btn btn-success mt-3">Manage Users</router-link>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column justify-content-between">
            <div class="d-flex align-items-center mb-4">
              <i class="bi bi-box-seam fs-1 text-warning me-3"></i>
              <h5 class="mb-0 fw-semibold">Products</h5>
            </div>
            <p class="text-secondary flex-grow-1">Manage product inventory and details.</p>
            <router-link to="/admin/products" class="btn btn-warning mt-3">Manage Products</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",
  methods: {
    manageProfiles() {
      console.log("Navigating to Profiles Management");
      // Placeholder: Add navigation logic, e.g., this.$router.push('/admin/profiles')
    },
    manageUsers() {
      console.log("Navigating to Users Management");
      // Placeholder: Add navigation logic, e.g., this.$router.push('/admin/users')
    },
    manageProducts() {
      console.log("Navigating to Products Management");
      // Placeholder: Add navigation logic, e.g., this.$router.push('/admin/products')
    }
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
  margin-top: var(--Header-height,100px);
}

.admin-header {
  margin-bottom: 2.5rem;
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
  padding: 1.5rem;
}

.card h5 {
  font-size: 1.25rem;
  color: #2d3748;
}

.card p {
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.5;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
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

.btn-success {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff;
}

.btn-success:hover {
  background: linear-gradient(135deg, #059669, #047857);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-success:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
}

.btn-warning {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #ffffff;
}

.btn-warning:hover {
  background: linear-gradient(135deg, #d97706, #b45309);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-warning:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.3);
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

  .card {
    margin-bottom: 1rem;
  }

  .card-body {
    padding: 1.25rem;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 576px) {
  .admin-header {
    text-align: center;
  }

  .card h5 {
    font-size: 1.1rem;
  }

  .card p {
    font-size: 0.9rem;
  }
}
</style>