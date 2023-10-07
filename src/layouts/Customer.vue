<template lang="">
  <div class="layout_wrapper">
    <CxSidebar />
    <router-view></router-view>
  </div>
</template>
<script setup>
import CxSidebar from "../components/layout/Cx-Sidebar.vue";
</script>
<style lang="scss">
.layout_wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
}
</style>
