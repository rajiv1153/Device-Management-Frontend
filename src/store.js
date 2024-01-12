import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import api from "./services/api";
import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.localStorage,
    }),
  ],
  state: {
    token: '',
    drawer: true,
    devices: {},
    device: {
      name: "",
      serial_number: "",
      enabled: false,
      description: "",
    },
    snackbar: {
      show: false,
      message: "",
    },
    deviceReport: "",
  },
  getters:{
    getToken(state){
      return state.token
    }
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    },
    setDevices(state, data) {
      state.devices = data;
    },
    setDevice(state, data) {
      state.device.id = data.id;
      state.device.name = data.name;
      state.device.serial_number = data.serial_number;
      state.device.enabled = data.enabled;
      state.device.description = data.description;
    },
    initDevice(state) {
      state.device = {
        name: "",
        serial_number: "",
        enabled: false,
        description: "",
      };
    },
    setDeviceName(state, data) {
      state.device.name = data;
    },
    setDeviceSerialNumber(state, data) {
      state.device.serial_number = data;
    },
    setDeviceEnabled(state, data) {
      state.device.enabled = data;
    },
    setDeviceDescription(state, data) {
      state.device.description = data;
    },
    showSnackbar(state, payload) {
      state.snackbar.show = true;
      state.snackbar.message = payload.message;
    },
    hideSnackbar(state) {
      state.snackbar.show = false;
      state.snackbar.message = "";
    },
    setdeviceReport(state, data) {
      state.deviceReport = data;
    },
  },
  actions: {
    async fetchDataFromDevicesApi({ state,commit }) {
      try {
        let response = await api.get("/devices", {
          headers: { Authorization: "Bearer " + state.token },
        });
        commit("setDevices", response.data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    },
    async commmitDevice({ commit }, deviceitem) {
      commit("setDevice", deviceitem);
    },
    triggerSnackbar({ commit }, payload) {
      commit("showSnackbar", { message: payload.message });
      setTimeout(() => {
        commit("hideSnackbar");
      }, 3000);
    },
    async fetchDataReport({ commit }, id) {
      try {
        let response = await api.get("/device-report/"+id);
        commit("setdeviceReport", response.data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    },
    async resetReport({ commit },) {
      commit("setdeviceReport", '');
    }
  },
});
