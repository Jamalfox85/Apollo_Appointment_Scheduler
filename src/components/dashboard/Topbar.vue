<template lang="">
  <div class="dashboard_topbar_wrapper">
    <h1 class="primary-dashboard-title">{{ getUserData.business_name }}</h1>
  </div>
</template>
<script>
import { useStore } from "../../stores/store";
export default {
  computed: {
    getUserData() {
      let userData = this.store.getUserData;
      return userData;
    },
  },
  setup() {
    let store = useStore();
    return { store };
  },
};
</script>
<style lang="scss">
.dashboard_topbar_wrapper {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  .primary-dashboard-title {
    font-size: 2em !important;
  }
}
</style>
