<template>
  <div>
    <v-dialog v-model="deviceFormVisible" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          <span v-if="this.$store.state.device.id">Edit Device</span>
          <span v-else>Add Device</span>
        </v-card-title>
        <v-card-text>
          <v-card-text>
            <template>
              <v-form ref="reportRef" @submit.prevent="addorUpdateDevice">
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
                  v-model="name"
                  label="Name"
                  :rules="nameRules"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="serial_number"
                  label="Serial Number"
                  :rules="serialNumberRules"
                  type="number"
                  required
                ></v-text-field>

                <v-checkbox v-model="enabled" label="Enabled"></v-checkbox>

                <v-textarea v-model="description" color="teal">
                  <template v-slot:label>
                    <div>
                      <small>Description</small>
                    </div>
                  </template>
                </v-textarea>
                <v-btn :disabled="!isFormValid" color="primary" type="submit">
                  <span v-if="this.$store.state.device.id">Update</span>
                  <span v-else>Add</span>
                </v-btn>
              </v-form>
            </template>
          </v-card-text>

          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-btn class="red lighten-2" @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deviceFormVisible: false,
      nameRules: [(v) => !!v || "Name is required"],
      serialNumberRules: [(v) => !!v || "Serial Number is required"],
      validationErrors: {},
    };
  },
  computed: {
    isFormValid() {
      return this.name != "" && this.serial_number != "";
    },
    name: {
      get() {
        return this.$store.state.device.name;
      },
      set(val) {
        this.$store.commit("setDeviceName", val);
      },
    },
    serial_number: {
      get() {
        return this.$store.state.device.serial_number;
      },
      set(val) {
        this.$store.commit("setDeviceSerialNumber", val);
      },
    },
    enabled: {
      get() {
        return this.$store.state.device.enabled;
      },
      set(val) {
        this.$store.commit("setDeviceEnabled", val);
      },
    },
    description: {
      get() {
        return this.$store.state.device.description;
      },
      set(val) {
        this.$store.commit("setDeviceDescription", val);
      },
    },
  },
  methods: {
    openDialog() {
      this.deviceFormVisible = true;
    },
    closeDialog() {
      this.deviceFormVisible = false;
    },
    resetForm() {
      this.firstName = '';
      this.lastName = '';
    },
    addorUpdateDevice() {
      this.deviceFormVisible = false;
      if (this.$store.state.device.id) {
        const input = this.$store.state.device;
        this.$http
          .put("/devices/" + this.$store.state.device.id, input, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          })
          .then((r) => {
            this.$store.dispatch("triggerSnackbar", {
              message: "Device Updated Successfully!",
            });
            this.$store.dispatch("fetchDataFromDevicesApi");
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
            this.resetForm();
            return error;
          });
      } else {
        const input = this.$store.state.device;
        this.$http
          .post("/devices", input, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          })
          .then((r) => {
            this.$store.dispatch("fetchDataFromDevicesApi");
            this.$store.dispatch("triggerSnackbar", {
              message: "Device Added Successfully!",
            });
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
      }
    },
  },
};
</script>
