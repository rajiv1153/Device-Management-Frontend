<template>
  <div class="text-right">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on"
          ><v-icon>mdi-chart-box-plus-outline</v-icon> New report For
          {{ getDevicesReport.name }}
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> Add Report </v-card-title>
        <v-card-text>
          <template>
            <v-form v-model="valid" @submit.prevent="addReport">
              <p
                v-if="Object.keys(validationErrors).length != 0"
                class="text-center"
              >
                <v-alert
                  :key="index"
                  v-for="(error, index) in validationErrors"
                  dense
                  outlined
                  type="error"
                >
                  {{ error[0] }}
                </v-alert>
              </p>
              <v-text-field
                v-model="temperature"
                label="Temperature"
              ></v-text-field>
              <v-checkbox v-model="online" label="Online"></v-checkbox>
              <v-text-field
                v-model="latitude"
                label="Latitude"
                required
              ></v-text-field>
              <v-text-field
                v-model="longitude"
                label="Longitude"
                required
              ></v-text-field>
              <v-btn color="primary" type="submit">
                <span>Add Report</span>
              </v-btn>
            </v-form>
          </template>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false">X</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DeviceReportForm",
  data() {
    return {
      dialog: false,
      temperature: null,
      online: false,
      latitude: "",
      longitude: "",
      validationErrors: {},
    };
  },
  computed: {
    getDevicesReport() {
      return this.$store.state.deviceReport;
    },
  },
  methods: {
    addReport() {
      this.dialog = false;
      const input = {
        temperature: this.temperature,
        online: this.online,
        latitude: this.latitude,
        longitude: this.longitude,
        device_id: this.$store.state.deviceReport.id,
        report_time: this.getNowTime(),
      };
      this.$http
        .post("/device-report", input, {
          headers: {
            Authorization: "Bearer " + this.$store.state.toke,
          },
        })
        .then((r) => {
          this.$store.dispatch("triggerSnackbar", {
            message: "Report Updated Successfully!",
          });
          this.initData();
          this.$store.dispatch("fetchDataReport",this.$store.state.deviceReport.id);
          return r;
        })
        .catch((error) => {
          if (error.response.data.message != undefined) {
            this.$store.dispatch("triggerSnackbar", {
              message: error.response.data.message,
            });
          }
          if (error.response.data.errors) {
            this.validationErrors = error.response.data.errors;
          }
          return error;
        });
    },
    getNowTime() {
      var now = new Date();
      return [
        now.getFullYear(),
        "-",
        now.getMonth() + 1,
        "-",
        now.getDate(),
        " ",
        now.getHours(),
        ":",
        now.getMinutes(),
        ":",
        now.getSeconds(),
      ].join("");
    },
    initData() {
      this.temperature = null;
      this.online = false;
      this.latitude = null;
      this.longitude = null;
    },
  },
};
</script>
