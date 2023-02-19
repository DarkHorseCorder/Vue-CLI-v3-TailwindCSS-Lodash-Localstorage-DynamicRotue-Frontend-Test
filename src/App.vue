<template>
    <div class="h-screen">
    <Layout>
      <router-view></router-view>
    </Layout>
  </div>
</template>

<script>
    import Layout from "./components/layout/Layout.vue";

    export default {
    name: "App",
    components: {
        Layout,
    },
    };
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;700&display=swap");
</style>
