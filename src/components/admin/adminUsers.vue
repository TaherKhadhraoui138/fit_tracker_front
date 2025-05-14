<template>
  <div class="container py-5">
    <header class="admin-header mb-5">
      <div>
        <h1 class="display-5 fw-bold text-dark">User Management</h1>
        <p class="text-secondary fs-5">View, edit, or manage gym memberships and user details</p>
      </div>
      <button class="btn btn-primary add-user-btn" @click="addUser">
        <i class="bi bi-plus-circle me-2"></i> Add New User
      </button>
    </header>

    <div class="mb-4">
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-search"></i></span>
        <input
          type="text"
          class="form-control"
          placeholder="Search users by name or email..."
          v-model="searchQuery"
          @input="filterUsers"
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
          <tr v-for="user in filteredUsers" :key="user.id" @click="selectUser(user)">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span class="membership-type" :class="user.membershipType.toLowerCase()">
                {{ user.membershipType }}
              </span>
            </td>
            <td>{{ user.startDate }}</td>
            <td :class="{ 'expiring-soon': user.remainingDays <= 7 }">
              {{ user.remainingDays }} days
            </td>
            <td class="action-buttons">
              <button class="btn btn-warning btn-sm me-2" @click.stop="editUser(user)">
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
  </div>
</template>

<script>
export default {
  name: "AdminUsers",
  data() {
    return {
      searchQuery: "",
      users: [
        { id: 1, name: "John Doe", email: "john@example.com", membershipType: "Premium", startDate: "2025-01-01", remainingDays: 15 },
        { id: 2, name: "Jane Smith", email: "jane@example.com", membershipType: "Basic", startDate: "2025-02-15", remainingDays: 5 },
        { id: 3, name: "Mike Johnson", email: "mike@example.com", membershipType: "Standard", startDate: "2025-03-01", remainingDays: 30 }
      ]
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
  methods: {
    addUser() {
      console.log("Add user clicked");
      // Future: Open modal for adding user
    },
    editUser(user) {
      console.log("Edit user:", user);
      // Future: Open modal with user details
    },
    deleteUser(user) {
      console.log("Delete user:", user);
      // Future: Confirm deletion
    },
    selectUser(user) {
      console.log("Selected user:", user);
      // Future: Highlight row or show details
    },
    filterUsers() {
      console.log("Filtering users with query:", this.searchQuery);
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
}
</style>