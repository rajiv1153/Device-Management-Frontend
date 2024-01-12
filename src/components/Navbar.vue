<template>
  <v-app-bar color="#B0D9B1" app fixed clipped-left>
    <v-app-bar-nav-icon
      v-if="checkDisplay()"
      @click="setDrawer(!drawer)"
      id="sidebar__toggler"
    ></v-app-bar-nav-icon>
    <h3 class="white--text">
      <span class="font-italic heading"
        ><span class="font-weight-light">el</span
        ><span class="font-weight-bold">sight</span></span
      >
    </h3>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="checkDisplay()">
      <v-menu
        bottom
        left
        offset-y
        origin="top right"
        transition="scale-transition"
      >
        <template v-slot:activator="{ attrs, on }">
          <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list :tile="false" nav>
          <div>
            <app-bar-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </app-bar-item>
          </div>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "NavBar",

  data() {
    return {};
  },
  computed: {
    ...mapState(["drawer"]),
  },
  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER",
    }),
    logout() {
      this.$http
        .get("/auth/logout", {
          headers: { Authorization: "Bearer " + this.$store.state.token },
        })
        .then((r) => {
          this.$store.commit("SET_TOKEN", "");     
          this.$store.dispatch("triggerSnackbar", { message: r.data.message });     
          this.$router.push("/");
          return r;
        })
        .catch((error) => {
          return error;
        });
    },
    checkDisplay() {
      if (this.$route.path == "/" || this.$route.path == "/register") {
        return false;
      }
      return true;
    },
  },
};
</script>

<style>
.heading * {
  font-size: 30px;
  color: #0b0c74;
}
</style>
