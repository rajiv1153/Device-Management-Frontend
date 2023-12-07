<template>
  <v-main class="blue lighten-5">
    <v-container>
      <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-card width="400" class="mx-auto" style="padding: 16px">
          <v-form fast-fail @submit.prevent="login">
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
              v-model="email"
              label="Email"
              :rules="emailRules"
            ></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              label="Password"
              :rules="passwordRules"
            ></v-text-field>
            <v-btn type="submit" color="primary" block class="mt-2"
              >Sign in</v-btn
            >
          </v-form>
          <div class="mt-2">
            <p class="text-body-2">
              Don't have an account? <a @click="registerRedirect">Sign Up</a>
            </p>
          </div>
        </v-card>
      </div>
    </v-container>
  </v-main>
</template>
<script>
export default {
  name: "LoginPage",

  data() {
    return {
      email: "",
      password: "",
      validationErrors: {},
      emailRules: [(v) => !!v || "Email is required"],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  created() {
    if (this.$store.state.token!= "" &&
    this.$store.state.token != null
    ) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    login() {
      const credentials = {
        email: this.email,
        password: this.password,
      };
      this.$http
        .post("/auth/login", credentials)
        .then((r) => {
          this.$store.commit("SET_TOKEN", r.data.token);
          this.$store.dispatch("triggerSnackbar", { message: r.data.message });
          this.$router.push("/dashboard");
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
    registerRedirect() {
      this.$router.push("/register");
    },
  },
};
</script>
