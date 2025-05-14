<template>
  <dl class="row g-3">
    <dt class="col-sm-4">Flavor</dt>
    <dd class="col-sm-8">{{ product.flavor || 'N/A' }}</dd>
    <dt class="col-sm-4">Weight (kg)</dt>
    <dd class="col-sm-8">{{ product.weight ? product.weight.toFixed(2) : 'N/A' }}</dd>
    <dt class="col-sm-4">Form</dt>
    <dd class="col-sm-8">
      <span class="badge" :class="getFormBadgeClass(product.form)">{{ product.form || 'N/A' }}</span>
    </dd>
  </dl>
</template>

<script>
export default {
  name: "SupplementsDetails",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getFormBadgeClass(form) {
      switch (form) {
        case "Powder":
          return "badge-powder";
        case "Capsule":
          return "badge-capsule";
        case "Liquid":
          return "badge-liquid";
        default:
          return "badge-secondary";
      }
    },
  },
};
</script>

<style scoped>
.badge {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
}

.badge-powder {
  background-color: #3b82f6;
  color: #ffffff;
}

.badge-capsule {
  background-color: #10b981;
  color: #ffffff;
}

.badge-liquid {
  background-color: #f59e0b;
  color: #ffffff;
}

.badge-secondary {
  background-color: #6b7280;
  color: #ffffff;
}

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