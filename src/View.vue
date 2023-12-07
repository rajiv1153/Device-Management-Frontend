<template>
  <div>
    <Snackbar />
    <router-view />
  </div>
</template>

<script>
import Snackbar from "@/components/Snackbar.vue";
export default {
  name: "ViewComponent",
  components: { Snackbar },

  data: () => ({
    //
  }),
};
</script>
