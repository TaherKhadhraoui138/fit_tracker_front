<template>
  <div class="container py-5">
    <header class="admin-header mb-5">
      <div>
        <h1 class="display-5 fw-bold text-dark">User Management</h1>
        <p class="text-secondary fs-5">View, edit, or manage gym memberships and user details</p>
      </div>
    </header>

    <div class="mb-4">
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-search"></i></span>
        <input
          type="text"
          class="form-control"
          placeholder="Search users by name or email..."
          v-model="searchQuery"
          aria-label="Search users"
        />
      </div>
    </div>

    <div class="table-container">
      <table class="table table-striped table-hover align-middle">
        <thead class="table-header">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Membership Type</th>
            <th>Start Date</th>
            <th>Remaining Days</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span class="membership-type" :class="user.membershipType ? user.membershipType.toLowerCase() : ''">
                {{ user.membershipType || 'N/A' }}
              </span>
            </td>
            <td>{{ user.startDate || 'N/A' }}</td>
            <td :class="{ 'expiring-soon': user.remainingDays <= 7 }">
              {{ user.remainingDays !== undefined ? user.remainingDays + ' days' : 'N/A' }}
            </td>
            <td class="action-buttons">
              <button class="btn btn-warning btn-sm me-2" @click.stop="openEditModal(user)">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-danger btn-sm" @click.stop="deleteUser(user)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    

    <!-- Edit User Modal -->
    <div class="modal fade" tabindex="-1" :class="{ show: showEditModal }" :style="{ display: showEditModal ? 'block' : 'none' }" @click.self="showEditModal = false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit User</h5>
            <button type="button" class="btn-close" @click="showEditModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateUser">
              <input type="hidden" v-model="editUser.id" />
              <div class="mb-3">
                <label for="editName" class="form-label">Name</label>
                <input type="text" class="form-control" id="editName" v-model="editUser.name" required />
              </div>
              <div class="mb-3">
                <label for="editEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="editEmail" v-model="editUser.email" required />
              </div>
              <div class="mb-3">
                <label for="editMembershipType" class="form-label">Membership Type</label>
                <select class="form-select" id="editMembershipType" v-model="editUser.membershipType">
                  <option value="" disabled>Select Membership</option>
                  <option v-for="type in membershipTypes" :key="type" :value="type">{{ type }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="editStartDate" class="form-label">Start Date</label>
                <input type="date" class="form-control" id="editStartDate" v-model="editUser.startDate" />
              </div>
              <button type="submit" class="btn btn-primary">Save Changes</button>
              <button type="button" class="btn btn-secondary ms-2" @click="showEditModal = false">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserServices from "@/services/UserServices.js";

export default {
  name: "AdminUsers",
  data() {
    return {
      searchQuery: "",
      users: [],
      loading: false,
      showEditModal: false,
      editUser: {},
      // Remove newUser and showAddModal
    };
  },
  computed: {
    filteredUsers() {
      if (!this.searchQuery) return this.users;
      const query = this.searchQuery.toLowerCase();
      return this.users.filter(
        user =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      try {
        const data = await UserServices.getAllUsers();
        this.users = Array.isArray(data) ? data : data.users || [];
      } catch (error) {
        alert("Failed to load users: " + (error.message || "Unknown error"));
      } finally {
        this.loading = false;
      }
    },
    openEditModal(user) {
      this.editUser = { ...user };
      this.showEditModal = true;
    },
    async updateUser() {
      try {
        // Only send membershipType and startDate if they have values
        const payload = {
          name: this.editUser.name,
          email: this.editUser.email,
        };
        if (this.editUser.membershipType) {
          payload.membershipType = this.editUser.membershipType;
        }
        if (this.editUser.startDate) {
          payload.startDate = this.editUser.startDate;
        }
        const response = await UserServices.updateUser(this.editUser.id, payload);
        const index = this.users.findIndex(u => u.id === this.editUser.id);
        if (index !== -1) {
          this.users.splice(index, 1, { ...this.editUser, ...response.user });
          await this.fetchUsers();
        }
        alert("User updated successfully.");
        this.showEditModal = false;
      } catch (error) {
        alert("Failed to update user: " + (error.message || "Unknown error"));
      }
    },
    async deleteUser(user) {
      if (confirm(`Are you sure you want to delete ${user.name}?`)) {
        try {
          await UserServices.deleteUser(user.id);
          this.users = this.users.filter(u => u.id !== user.id);
          alert("User deleted successfully.");
        } catch (error) {
          alert("Failed to delete user: " + (error.message || "Unknown error"));
        }
      }
    }
    // Remove createUser method
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

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.admin-header h1 {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1a1a1a;
}

.admin-header p {
  font-size: 1.125rem;
  color: #6b7280;
}

.add-user-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.add-user-btn:hover {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.add-user-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.input-group {
  max-width: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.input-group-text {
  background: #ffffff;
  border: none;
  color: #6b7280;
}

.form-control {
  border: none;
  background: #ffffff;
  font-size: 0.95rem;
  padding: 0.75rem;
}

.form-control:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  border: none;
  outline: none;
}

.table-container {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 0;
}

.table-header th {
  background-color: #e2e8f0;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  color: #4a5568;
  letter-spacing: 0.05em;
  padding: 1rem 1.25rem;
}

.table tbody tr {
  background-color: #ffffff;
  transition: background-color 0.2s ease;
}

.table tbody tr:nth-child(even) {
  background-color: #f8fafc;
}

.table tbody tr:hover {
  background-color: #edf2f7;
  cursor: pointer;
}

.table td {
  padding: 1rem 1.25rem;
  font-size: 0.9rem;
  color: #2d3748;
  border-bottom: 1px solid #e2e8f0;
}

.table tr:last-child td {
  border-bottom: none;
}

.membership-type {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  text-align: center;
  min-width: 80px;
}

.membership-type.basic {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #ffffff;
}

.membership-type.premium {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
}

.membership-type.standard {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  color: #ffffff;
}

.expiring-soon {
  color: #dc2626;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-warning {
  background-color: #f59e0b;
  color: #ffffff;
  border: none;
}

.btn-warning:hover {
  background-color: #d97706;
  transform: translateY(-1px);
}

.btn-warning:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.3);
}

.btn-danger {
  background-color: #dc2626;
  color: #ffffff;
  border: none;
}

.btn-danger:hover {
  background-color: #b91c1c;
  transform: translateY(-1px);
}

.btn-danger:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.3);
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1050;
  display: none;
}

.modal.show {
  display: block;
}

.modal-dialog {
  max-width: 500px;
  margin: 1.75rem auto;
}

.modal-content {
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  background: #ffffff;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  transition: color 0.3s ease;
}

.btn-close:hover {
  color: #1a1a1a;
}

.modal-body {
  padding: 1.5rem;
}

.form-label {
  font-weight: 500;
  color: #4a5568;
}

.form-control,
.form-select {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-control:focus,
.form-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  outline: none;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background: #e2e8f0;
  color: #1a1a1a;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #d1d5db;
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 2rem 1rem;
  }

  .admin-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .admin-header h1 {
    font-size: 1.75rem;
  }

  .admin-header p {
    font-size: 1rem;
  }

  .input-group {
    max-width: 100%;
  }

  .table-container {
    overflow-x: auto;
  }

  .table th,
  .table td {
    padding: 0.75rem;
    font-size: 0.85rem;
  }

  .action-buttons {
    flex-direction: column;
    gap: 0.25rem;
  }

  .btn-sm {
    width: 100%;
    text-align: center;
  }

  .modal-dialog {
    margin: 1rem;
  }
}
</style>