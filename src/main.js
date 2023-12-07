import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from "vue-router";
import routes from "./routes/router";
import store from './store'
import api from "./services/api"
Vue.prototype.$http = api
Vue.config.productionTip = false
Vue.use(VueRouter);

new Vue({
  vuetify,
  store,
  router: routes,
  render: h => h(App)
}).$mount('#app')
