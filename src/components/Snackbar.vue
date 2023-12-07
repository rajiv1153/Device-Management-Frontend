<template>
  <div>
    <v-snackbar v-model="snackbar.show">
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: "snackBar",
  data: () => ({}),
  computed: {
    snackbar() {
      return this.$store.state.snackbar;
    },
  },
};
</script>
