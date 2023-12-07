import VueRouter from "vue-router";
import DashBoard from "../components/Dashboard.vue";
import LoginPage from "../components/auth/LoginPage.vue";
import RegisterPage from "../components/auth/RegisterPage.vue";

let router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashBoard,
    },
  ],
});

export default router;
