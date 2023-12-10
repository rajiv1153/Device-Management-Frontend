<template>
  <v-main class="blue lighten-5">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12"> <DeviceComponent /> </v-col>
        <v-col v-if="this.$store.state.deviceReport" cols="12"> <ReportComponent /> </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import DeviceComponent from "@/components/device/Device.vue";
import ReportComponent from "@/components/report/Reports.vue";

export default {
  name: "DashBoard",
  components: { DeviceComponent, ReportComponent },
  data: () => ({
    user: {},
  }),
  created() {
    if (
      this.$store.state.token == "" ||
      this.$store.state.token == null
    ) {
      this.$router.push("/");
    } else {
      this.getUser();
    }
  },
  methods: {
    getUser() {
      this.$http
        .get("/user", {
          headers: { Authorization: "Bearer " + this.$store.state.token },
        })
        .then((r) => {
          this.user = r.data;
          return r;
        })
        .catch((error) => {
          return error;
        });
    },
  },
  
};
</script>
