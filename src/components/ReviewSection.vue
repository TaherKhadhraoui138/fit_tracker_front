<template>
  <section class="review-section">
    <div class="container">
      <h2>Product Reviews</h2>
      <p class="section-subtitle">See what customers are saying about this product!</p>

      <!-- Reviews List -->
      <div v-if="filteredReviews.length > 0" class="reviews-list">
        <div class="review" v-for="(review, index) in filteredReviews" :key="index">
          <div class="review-header">
            <h3>{{ review.title || 'Product Review' }}</h3>
            <div class="rating">
              <i v-for="star in 5" :key="star" class="bi bi-star-fill" :class="{ 'filled': star <= review.rating }"></i>
            </div>
          </div>
          <p class="review-comment">{{ review.comment }}</p>
          <div class="review-footer">
            <div class="review-author">
              <i class="fas fa-user"></i>
              <span>{{ review.author }}</span>
              <span class="review-date">{{ formatDate(review.date) }}</span>
            </div>
            <!-- Edit/Delete Buttons for User's Own Review -->
            <div class="review-actions" v-if="review.author === 'Anonymous' && review.productId === productId">
              <button class="btn btn-warning btn-sm me-2" @click="openEditModal(index)">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-danger btn-sm" @click="deleteReview(index)">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- No Reviews State -->
      <div v-else class="text-center">
        <p>No reviews yet. Be the first to share your thoughts about this product!</p>
      </div>

      <!-- Add Review Button -->
      <div class="text-center mt-4">
        <button class="btn btn-primary" @click="showAddModal = true">
          <i class="bi bi-plus-circle me-2"></i> Add Your Review
        </button>
      </div>

      <!-- Modal Overlay for Add/Edit -->
      <div v-if="showAddModal || showEditModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <h3>{{ showAddModal ? 'Share Your Thoughts' : 'Edit Your Review' }}</h3>
          <form @submit.prevent="showAddModal ? addReview() : updateReview()">
            <div class="form-group">
              <label for="review-title">Title (Optional)</label>
              <input
                v-model="form.title"
                type="text"
                id="review-title"
                placeholder="Enter a title for your review"
                maxlength="100"
              />
            </div>
            <div class="form-group">
              <label for="review-comment">Your Review</label>
              <textarea
                v-model="form.comment"
                id="review-comment"
                placeholder="Write your thoughts about this product..."
                required
                maxlength="1000"
              ></textarea>
            </div>
            <div class="form-group">
              <label>Rating</label>
              <div class="star-rating">
                <i
                  v-for="star in 5"
                  :key="star"
                  class="bi bi-star-fill"
                  :class="{ 'filled': star <= form.rating, 'hover': star <= hoverRating }"
                  @mouseover="hoverRating = star"
                  @mouseleave="hoverRating = 0"
                  @click="form.rating = star"
                ></i>
              </div>
              <p v-if="form.rating" class="rating-text">{{ form.rating }} Star{{ form.rating > 1 ? 's' : '' }}</p>
            </div>
            <div class="modal-buttons">
              <button type="submit" class="btn btn-primary" :disabled="!form.comment || !form.rating">
                {{ showAddModal ? 'Submit Review' : 'Update Review' }}
              </button>
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ReviewSection',
  props: {
    productId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      reviews: [
        {
          title: 'Amazing Product!',
          comment: 'This protein powder tastes great and mixes well.',
          rating: 5,
          author: 'Sarah J.',
          date: '2025-04-15',
          productId: 1,
        },
        {
          title: 'Good Quality',
          comment: 'The resistance bands are durable and easy to use.',
          rating: 4,
          author: 'Mike T.',
          date: '2025-04-10',
          productId: 2,
        },
      ],
      showAddModal: false,
      showEditModal: false,
      editIndex: null,
      form: {
        title: '',
        comment: '',
        rating: 0,
        author: 'Anonymous',
        date: new Date().toISOString().split('T')[0],
      },
      hoverRating: 0,
    };
  },
  computed: {
    filteredReviews() {
      return this.reviews.filter(review => review.productId === this.productId);
    },
  },
  methods: {
    addReview() {
      if (!this.form.rating || !this.form.comment) {
        alert('Please provide a rating and comment.');
        return;
      }

      this.form.productId = this.productId;
      this.reviews.push({ ...this.form });
      this.closeModal();
      alert('Thank you for your review! It has been added locally.');
    },
    openEditModal(index) {
      this.editIndex = this.reviews.findIndex(r => r.productId === this.productId && this.reviews.indexOf(r) === index);
      this.form = { ...this.reviews[this.editIndex] };
      this.showEditModal = true;
    },
    updateReview() {
      if (!this.form.rating || !this.form.comment) {
        alert('Please provide a rating and comment.');
        return;
      }

      this.reviews.splice(this.editIndex, 1, { ...this.form });
      this.closeModal();
      alert('Your review has been updated locally.');
    },
    deleteReview(index) {
      if (confirm('Are you sure you want to delete this review?')) {
        this.reviews.splice(this.reviews.findIndex(r => r.productId === this.productId && this.reviews.indexOf(r) === index), 1);
        alert('Your review has been deleted locally.');
      }
    },
    closeModal() {
      this.showAddModal = false;
      this.showEditModal = false;
      this.editIndex = null;
      this.form = {
        title: '',
        comment: '',
        rating: 0,
        author: 'Anonymous',
        date: new Date().toISOString().split('T')[0],
      };
      this.hoverRating = 0;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
};
</script>

<style scoped>
.review-section {
  padding: 5rem 0;
  background: linear-gradient(to right, #e0f2fe, #dbeafe);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h2 {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.section-subtitle {
  font-size: 1.25rem;
  text-align: center;
  color: #6b7280;
  margin-bottom: 2rem;
}

/* Reviews List */
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.review {
  background: #ffffff;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  max-width: 600px;
  margin: 0 auto;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.review-header h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: #1a1a1a;
}

.rating i {
  font-size: 1.2rem;
  color: #e2e8f0;
}

.rating i.filled {
  color: #f59e0b;
}

.review-comment {
  font-size: 1.1rem;
  font-style: italic;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.review-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.review-author i {
  font-size: 1.5rem;
  color: #3b82f6;
}

.review-author span {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.review-date {
  font-size: 0.9rem;
  color: #6b7280;
}

.review-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-warning {
  background: #f59e0b;
  color: #ffffff;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-warning:hover {
  background: #d97706;
  transform: translateY(-1px);
}

.btn-danger {
  background: #ef4444;
  color: #ffffff;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-danger:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

.btn-sm i {
  font-size: 1rem;
}

/* Add Review Button */
.btn-primary {
  padding: 0.9rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  background: linear-gradient(to right, #667eea, #764ba2);
  color: #ffffff;
  border: none;
  transition: all 0.4s ease;
}

.btn-primary:hover {
  background: linear-gradient(to right, #5b67d8, #6b3e99);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  padding: 2rem;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.modal-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
}

.form-group textarea {
  height: 120px;
  resize: none;
}

.star-rating {
  display: flex;
  gap: 0.5rem;
}

.star-rating i {
  font-size: 1.5rem;
  color: #e2e8f0;
  cursor: pointer;
  transition: color 0.3s ease;
}

.star-rating i.filled,
.star-rating i.hover {
  color: #f59e0b;
}

.rating-text {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #6b7280;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.modal-buttons .btn-primary {
  flex: 1;
  padding: 0.75rem;
}

.modal-buttons .btn-secondary {
  flex: 1;
  padding: 0.75rem;
  background: #e2e8f0;
  color: #2d3748;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.modal-buttons .btn-secondary:hover {
  background: #cbd5e1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .review {
    padding: 1.5rem;
  }

  .review-header h3 {
    font-size: 1.2rem;
  }

  .review-comment {
    font-size: 1rem;
  }

  .modal-content {
    padding: 1.5rem;
  }
}

@media (max-width: 576px) {
  h2 {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .form-group textarea {
    height: 100px;
  }

  .modal-content {
    max-width: 90%;
  }

  .review-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}

/* Accessibility */
.btn-primary:focus,
.btn-secondary:focus,
.btn-warning:focus,
.btn-danger:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
</style>