<template>
    <UserCart   
      :cart="cart"
      @update-cart="updateCart"
      @remove-from-cart="removeFromCart"
      @clear-cart="clearCart"
    />
</template>

<script>
import UserCart from "@/components/user/userCart.vue"; // Corrected path

export default {
    name: "CartView",
    components: {
        UserCart,
    },
    data() {
        return {
            cart: [], // Initialize cart
        };
    },
    methods: {
        updateCart(updatedItem) {
            const index = this.cart.findIndex(item => item.id === updatedItem.id);
            if (index !== -1) {
                this.cart.splice(index, 1, updatedItem);
            }
        },
        removeFromCart(itemId) {
            this.cart = this.cart.filter(item => item.id !== itemId);
        },
        clearCart() {
            this.cart = [];
        },
    },
};
</script>