import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MembershipView from "@/views/MembershipView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ShopDisplay from "@/components/ShopDisplay.vue";
import ProductDetails from "@/components/ProductDetails.vue";

//User Components
import UserProfile from "@/components/user/userProfile.vue";

// Admin Components
import AdminDashboard from "@/components/admin/adminDashboard.vue";
import AdminProducts from "@/components/admin/adminProducts.vue";
import AdminUsers from "@/components/admin/adminUsers.vue";
import AdminProfile from "@/components/admin/adminProfile.vue";

import CartView from "@/views/CartView.vue";


const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/membership",
    name: "membership",
    component: MembershipView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/shop/:category",
    name: "ShopDisplay",
    component: ShopDisplay,
    props: true,
  },
  {
    path: "/shop/product/:id",
    name: "ProductDetails",
    component: ProductDetails,
    props: (route) => ({
      product: {}, // Fetch product by ID from API or store
      productType: route.query.type,
    }),
  },
  {
    path: "/shop",
    redirect: "/shop/all",
  },
  {
    path: "/admin/dashboard",
    name: "adminDashboard",
    component: AdminDashboard,
  },
  {
    path: "/admin/products",
    name: "adminProducts",
    component: AdminProducts,
  },
  {
    path: "/admin/users",
    name: "adminUsers",
    component: AdminUsers,
  },
  {
    path: "/admin/profile",
    name: "adminProfile",
    component: AdminProfile,
  },
  {
    path: "/user/profile",
    name: "userProfile",
    component: UserProfile,
  },
  {
    path: "/user/cart",
    name: "CartView",
    component: CartView,
      
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;