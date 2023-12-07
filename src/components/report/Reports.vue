<template>
  <v-card class="green lighten-4">
    <v-card-title class="green lighten-3">
      <v-row>
        <v-col><v-icon>mdi-chart-box-outline</v-icon> Device Report </v-col>
        <v-col><DeviceReportForm /></v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="2" class="black--text"> Device Name: </v-col>
        <v-col cols="10"> {{ deviceName }} </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="black--text"> Device Serial: </v-col>
        <v-col cols="10"> {{ deviceSerial }} </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="black--text"> Enabled: </v-col>
        <v-col cols="10"
          ><v-icon v-if="deviceEnabled">mdi-checkbox-marked-circle</v-icon
          ><v-icon v-else>mdi-checkbox-blank-circle-outline</v-icon></v-col
        >
      </v-row>
      <v-row>
        <v-col cols="2" class="black--text"> Description: </v-col>
        <v-col cols="10"> {{ deviceDescription }} </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="black--text"> Temperature: </v-col>
        <v-col cols="10"> {{ deviceTemperature }} </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="black--text"> Online: </v-col>
        <v-col cols="10"
          ><v-icon v-if="deviceOnline">mdi-checkbox-marked-circle</v-icon
          ><v-icon v-else>mdi-checkbox-blank-circle-outline</v-icon></v-col
        >
      </v-row>
      <v-row>
        <v-col cols="2" class="black--text"> Location: </v-col>
        <v-col cols="10"
          ><span v-if="deviceLatitude"
            >{{ deviceLatitude }} ,{{ deviceLongitude }}
          </span></v-col
        >
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import DeviceReportForm from "./DeviceReportForm.vue";

export default {
  name: "ReportComponent",
  components: { DeviceReportForm },
  props: {
    deviceId: {
      required: true,
    },
  },
  computed: {
    deviceName() {
      return this.$store.state.deviceReport.name;
    },
    deviceSerial() {
      return this.$store.state.deviceReport.serial_number;
    },
    deviceEnabled() {
      return this.$store.state.deviceReport.enabled;
    },
    deviceDescription() {
      return this.$store.state.deviceReport.description;
    },
    deviceOnline() {
      return this.$store.state.deviceReport.latest_report
        ? this.$store.state.deviceReport.latest_report.online
        : false;
    },
    deviceTemperature() {
      return this.$store.state.deviceReport.latest_report
        ? this.$store.state.deviceReport.latest_report.temperature
        : null;
    },
    deviceLatitude() {
      return this.$store.state.deviceReport.latest_report
        ? this.$store.state.deviceReport.latest_report.latitude
        : null;
    },
    deviceLongitude() {
      return this.$store.state.deviceReport.latest_report
        ? this.$store.state.deviceReport.latest_report.longitude
        : null;
    },
  },
  data() {
    return {
      height: 0,
      search: "",
      headers: [
        {
          text: "test",
          align: "left",
          value: "name",
        },
        {
          text: "test",
          align: "left",
          value: "pairing_id",
        },
        {
          text: "test",
          align: "center",
          value: "availability",
        },
        {
          text: "Actions",
          align: "right",
          value: "actions",
        },
      ],
      name: "",
    };
  },
};
</script>
