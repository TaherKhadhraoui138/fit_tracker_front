<template>
  <dl class="row g-3">
    <dt class="col-sm-4">Material</dt>
    <dd class="col-sm-8">{{ product.material || 'N/A' }}</dd>
    <dt class="col-sm-4">Brand</dt>
    <dd class="col-sm-8">{{ product.brand || 'N/A' }}</dd>
    <dt class="col-sm-4">Size</dt>
    <dd class="col-sm-8">{{ product.size || 'N/A' }}</dd>
    <dt class="col-sm-4">Weight (kg)</dt>
    <dd class="col-sm-8">{{ product.weight ? product.weight.toFixed(2) : 'N/A' }}</dd>
  </dl>
</template>

<script>
export default {
  name: "AccessoriesDetails",
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
</style>