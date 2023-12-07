<template>
  <v-main class="blue lighten-5">
    <v-container>
      <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-card width="400" class="mx-auto" style="padding: 16px">
          <v-form fast-fail @submit.prevent="register">
            <p
              v-if="Object.keys(validationErrors).length != 0"
              class="text-center"
            >
              <v-alert
                v-for="error in validationErrors"
                :key="error"
                dense
                outlined
                type="error"
              >
                <p>{{ error[0] }}</p>
              </v-alert>
            </p>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              type="password"
              label="password"
              required
            ></v-text-field>
            <v-text-field
              v-model="repassword"
              :rules="repasswordRules"
              type="password"
              label="Confirm Password"
            ></v-text-field>
            <span v-if="!arePasswordsMatching">Passwords do not match</span>
            <v-btn
              :disabled="!arePasswordsMatching"
              type="submit"
              color="primary"
              block
              class="mt-2"
              >Register</v-btn
            >
          </v-form>
          <div class="mt-2">
            <p class="text-body-2">
              Already have an account? <a @click="loginRedirect">Sign In</a>
            </p>
          </div>
        </v-card>
      </div>
    </v-container>
  </v-main>
</template>
<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      repassword: "",
      validationErrors: {},
      emailRules: [(v) => !!v || "Email is required"],
      passwordRules: [(v) => !!v || "Password is required"],
      repasswordRules: [(v) => !!v || "Confirm Password is required"],
      nameRules: [(v) => !!v || "Name is required"],
    };
  },
  created() {
    if (
      this.$store.state.token != "" &&
      this.$store.state.token != null
    ) {
      this.$router.push("/dashboard");
    }
  },
  computed: {
    arePasswordsMatching() {
      return this.password === this.repassword;
    },
  },
  methods: {
    register() {
      const credentials = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      this.$http
        .post("/auth/register", credentials)
        .then((r) => {
          this.$store.commit("SET_TOKEN", r.data.token);
          this.$store.dispatch("triggerSnackbar", { message: r.data.message });
          this.$router.push("/dashboard");
          return r;
        })
        .catch((error) => {
          if (error.response.data.message != undefined) {
            if (error.response.data.message != undefined) {
              this.$store.dispatch("triggerSnackbar", {
                message: error.response.data.message,
              });
            }
            if (error.response.data.errors) {
              this.validationErrors = error.response.data.errors;
            }
          }
          return error;
        });
    },
    loginRedirect() {
      this.$router.push("/");
    },
  },
};
</script>
