<template>
  <div class="admin-users">
    <header class="admin-header">
      <h2>User Management</h2>
      <button class="add-user-btn" @click="addUser">Add New User</button>
    </header>

    <div class="table-container">
      <table class="user-table">
        <thead>
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
          <tr v-for="user in users" :key="user.id" @click="selectUser(user)">
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
              <button class="edit-btn" @click.stop="editUser(user)">Edit</button>
              <button class="delete-btn" @click.stop="deleteUser(user)">Delete</button>
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
      users: [
        { id: 1, name: "John Doe", email: "john@example.com", membershipType: "Premium", startDate: "2025-01-01", remainingDays: 15 },
        { id: 2, name: "Jane Smith", email: "jane@example.com", membershipType: "Basic", startDate: "2025-02-15", remainingDays: 5 },
        { id: 3, name: "Mike Johnson", email: "mike@example.com", membershipType: "Standard", startDate: "2025-03-01", remainingDays: 30 }
      ]
    };
  },
  methods: {
    addUser() {
      // Placeholder for add user functionality
      console.log("Add user clicked");
    },
    editUser(user) {
      // Placeholder for edit user functionality
      console.log("Edit user:", user);
    },
    deleteUser(user) {
      // Placeholder for delete user functionality
      console.log("Delete user:", user);
    },
    selectUser(user) {
      // Placeholder for row selection
      console.log("Selected user:", user);
    }
  }
};
</script>

<style scoped>
.admin-users {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.admin-header h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a1a;
}

.add-user-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
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

.table-container {
  overflow-x: auto;
  border-radius: 12px;
  background-color: #f8fafc;
}

.user-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.user-table th,
.user-table td {
  padding: 1rem 1.25rem;
  text-align: left;
  font-size: 0.9rem;
  color: #2d3748;
}

.user-table th {
  background-color: #e2e8f0;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  color: #4a5568;
  letter-spacing: 0.05em;
}

.user-table tbody tr {
  background-color: #ffffff;
  transition: background-color 0.2s ease;
}

.user-table tbody tr:nth-child(even) {
  background-color: #f8fafc;
}

.user-table tbody tr:hover {
  background-color: #edf2f7;
  cursor: pointer;
}

.user-table td {
  border-bottom: 1px solid #e2e8f0;
}

.user-table tr:last-child td {
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
  background-color: #f59e0b;
  color: #ffffff;
}

.membership-type.premium {
  background-color: #3b82f6;
  color: #ffffff;
}

.membership-type.standard {
  background-color: #6b7280;
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

.edit-btn,
.delete-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-btn {
  background-color: #f59e0b;
  color: #ffffff;
}

.edit-btn:hover {
  background-color: #d97706;
  transform: translateY(-1px);
}

.edit-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.3);
}

.delete-btn {
  background-color: #dc2626;
  color: #ffffff;
}

.delete-btn:hover {
  background-color: #b91c1c;
  transform: translateY(-1px);
}

.delete-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .admin-users {
    padding: 1rem;
    margin: 1rem;
  }

  .admin-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .user-table th,
  .user-table td {
    padding: 0.75rem;
    font-size: 0.85rem;
  }

  .action-buttons {
    flex-direction: column;
    gap: 0.25rem;
  }

  .edit-btn,
  .delete-btn {
    width: 100%;
    text-align: center;
  }
}
</style>