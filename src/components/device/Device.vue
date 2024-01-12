<template>
  <div>
    <DeviceForm ref="formref" :device="device" />
    <v-card class="blue lighten-4">
      <v-card-title class="green lighten-3">
        <v-row>
          <v-col><v-icon>mdi-monitor-cellphone</v-icon>Devices</v-col>
          <v-col class="text-right">
            <v-btn color="green" @click="openDeviceForm()">
              <v-icon>mdi-plus</v-icon> Add Device
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        ref="devicesTable"
        :items="getDevices"
        :items-per-page="5"
        :headers="headers"
        class="elevation-1 cyan lighten-5"
        fixed-header
        :search="search"
        :custom-filter="filter"
        @click:row="initReport"
      >
        <template v-slot:top>
          <v-text-field label="Search" v-model="search" class="mx-4"></v-text-field>
        </template>
        <template v-slot:[`item.enabled`]="{ item }">
          <v-icon v-if="item.enabled">mdi-checkbox-marked-circle</v-icon
          ><v-icon v-else>mdi-checkbox-blank-circle-outline</v-icon>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon v-if="item" @click="openDeviceForm(item)">
            <v-icon> mdi-pencil </v-icon>
          </v-btn>
          <v-btn icon v-if="item" @click="deleteDevice(item.id)">
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import DeviceForm from "./DeviceForm.vue";
export default {
  name: "DeviceComponent",
  components: { DeviceForm },
  data() {
    return {
      height: 0,
      search: "",
      reportFormDialog: false,
      exampleModalShowing: false,
      device: "",
      headers: [
        {
          text: "Name",
          align: "left",
          value: "name",
        },
        {
          text: "serial number",
          align: "left",
          value: "serial_number",
        },
        {
          text: "Enabled",
          align: "left",
          value: "enabled",
        },
        {
          text: "Actions",
          align: "right",
          value: "actions",
        },
      ],
    };
  },
  created() {
    this.$store.dispatch("fetchDataFromDevicesApi");
  },
  computed: {
    getDevices() {
      return this.$store.state.devices;
    },
  },
  methods: {
    initReport(value) {
      this.$store.dispatch("fetchDataReport", value.id);
    },
    deleteDevice(id) {
      confirm("Do you Confirm?");

      this.$http
        .delete("/devices/" + id, {
          headers: { Authorization: "Bearer " + this.$store.state.token },
        })
        .then((r) => {
          this.$store.dispatch("triggerSnackbar", {
            message: "Device Deleted Successfully!",
          });

          this.$store.dispatch("fetchDataFromDevicesApi");
          this.$store.dispatch("resetReport");
          return r;
        })
        .catch((error) => {
          return error;
        });
    },
    openDeviceForm(item) {
      this.$store.commit("initDevice");
      if (item != undefined) {
        this.$store.dispatch("commmitDevice", item);
      }
      this.$refs.formref.openDialog();
    },
  },
};
</script>
