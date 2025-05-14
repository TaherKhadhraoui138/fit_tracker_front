<template>
  <dl class="row g-3">
    <dt class="col-sm-4">Size</dt>
    <dd class="col-sm-8">{{ product.size || 'N/A' }}</dd>
    <dt class="col-sm-4">Color</dt>
    <dd class="col-sm-8">
      <span class="badge" :style="{ backgroundColor: product.color || '#6b7280', color: '#ffffff' }">
        {{ product.color || 'N/A' }}
      </span>
    </dd>
    <dt class="col-sm-4">Gender</dt>
    <dd class="col-sm-8">{{ product.gender || 'N/A' }}</dd>
    <dt class="col-sm-4">Material</dt>
    <dd class="col-sm-8">{{ product.material || 'N/A' }}</dd>
  </dl>
</template>

<script>
export default {
  name: "ClothesDetails",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.product-details dt {
  font-weight: 600;
  color: #3b82f6;
  font-size: 0.95rem;
}

.product-details dd {
  color: #1f2937;
  font-size: 0.95rem;
  margin-bottom: 0;
}

.badge {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
}
</style>