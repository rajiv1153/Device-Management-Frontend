<template>
  <v-app>
    <Drawer v-if="checkDisplay()" />
    <NavBar />
    <ViewComponent />
  </v-app>
</template>

<script>
import Drawer from "@/components/Drawer.vue";
import NavBar from "@/components/Navbar.vue";
import ViewComponent from "./View.vue";
export default {
  name: "App",
  components: { Drawer, NavBar, ViewComponent },
  data: () => ({
    //
  }),
  methods: {
    checkDisplay() {
      if (this.$route.path == "/" || this.$route.path == "/register") {
        return false;
      }
      return true;
    },
  },
};
</script>
