<template lang="">
  <div class="layout_wrapper" :style="themeColors">
    <Sidebar />
    <router-view></router-view>
  </div>
</template>
<script>
import Sidebar from "../components/layout/Sidebar.vue";
export default {
  components: { Sidebar },
  computed: {
    themeColors() {
      return {
        "--white": this.$colors.white,
        "--black": this.$colors.black,
        "--primary": this.$colors.primary,
        "--secondary": this.$colors.secondary,
        "--tertiary": this.$colors.tertiary,
        "--error": this.$colors.error,
      };
    },
  },
};
</script>
<style lang="scss">
.layout_wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
}
</style>
