<template>
    <BannerDisplay />

    <router-view />

    <FooterDisplay />
</template>

<script>
import BannerDisplay from './components/Header.vue';
import FooterDisplay from './components/Footer.vue';

export default {
    name: 'App',
    components: {
        BannerDisplay,
        FooterDisplay
    }
};
</script>

<style>
/* Global Styles */
:root {
    --primary-hover-color: #3a36e1;
    --primary-color: #007bff;
    --secondary-color: #333;
    --white: #fff;
    padding: auto;
    margin: auto;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

</style>