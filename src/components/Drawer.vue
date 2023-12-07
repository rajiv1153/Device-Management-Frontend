<template>
  <v-navigation-drawer color="#D2E0FB" v-if="drawer" app clipped elevation="3">
    <v-list>
      <v-list-item v-for="item in items" :key="item">
        <router-link :to="item.to" class="ml-5">
          <v-icon>{{ item.icon }}</v-icon>
          <v-list-item-action
            ><span color="">{{ item.title }}</span></v-list-item-action
          >
        </router-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Drawer-component",
  data() {
    return {
      items: [
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          to: "/dashboard",
        },
      ],
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },
  },
};
</script>
