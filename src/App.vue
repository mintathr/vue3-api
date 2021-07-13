<template>
  <!-- app.vue ini adalah componen utama yg akan menampung 
  beberapa hal view melalui hal router -->
  <navbar></navbar>
  <router-view></router-view>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>


