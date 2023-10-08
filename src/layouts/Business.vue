<template lang="">
  <div class="layout_wrapper" :style="themeColors">
    <Sidebar class="sidebar" />
    <div class="layout_main">
      <Topbar />
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Sidebar from "../components/layout/Sidebar.vue";
import Topbar from "../components/layout/Topbar.vue";
export default {
  components: { Sidebar, Topbar },
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
  .layout_main {
    overflow-y: auto;
    width: 100%;
  }
}
</style>
