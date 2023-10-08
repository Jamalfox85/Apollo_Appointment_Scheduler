<template lang="">
  <div class="topbar_wrapper">
    <h1 class="page-title">{{ title }}</h1>
    <p>{{ getUserData.business_name }}</p>
  </div>
</template>
<script>
import { useStore } from "../../stores/store";
export default {
  data() {
    return {
      title: "Dashboard",
    };
  },
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
  watch: {
    $route: {
      handler: function () {
        this.title = this.$router.currentRoute.value.name;
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss">
.topbar_wrapper {
  width: 100%;
  padding: 0.75em 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .page-title {
    font-size: 1.75em;
  }
}
</style>
