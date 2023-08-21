<template lang="">
  <div class="search_wrapper">
    <div class="block-header">
      <h1>Search</h1>
    </div>
    <div class="block-main">
      <n-input-group>
        <n-input :style="{ width: '75%' }" />
        <n-button type="primary"> Search </n-button>
      </n-input-group>
    </div>
  </div>
</template>
<script>
import { NInput, NInputGroup, NButton } from "naive-ui";
export default {
  components: { NInput, NInputGroup, NButton },
  data() {
    return {
      searchInput: "",
    };
  },
};
</script>
<style lang="scss">
.search_wrapper {
  margin-bottom: 2em;
  .block-header {
    margin-bottom: 1em;
  }
  .block-main {
    .n-input-group {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
