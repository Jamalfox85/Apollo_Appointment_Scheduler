<template lang="">
  <div class="quickstats_wrapper">
    <n-card class="stat-card" title="Total Bookings">
      <font-awesome-icon class="stat-card-icon" :icon="['fas', 'chart-simple']" />
      40
    </n-card>
    <n-card class="stat-card" title="Upcoming Bookings">
      <font-awesome-icon class="stat-card-icon" :icon="['far', 'calendar-days']" />
      4
    </n-card>
    <n-card class="stat-card" title="Revenue To Date">
      <font-awesome-icon class="stat-card-icon" :icon="['fas', 'money-bill-wave']" />
      $4,000
    </n-card>
    <n-card class="stat-card" title="Total Clients">
      <font-awesome-icon class="stat-card-icon" :icon="['fas', 'users']" />
      14
    </n-card>
  </div>
</template>
<script>
import { NCard } from "naive-ui";
export default {
  components: { NCard },
};
</script>
<style lang="scss">
.quickstats_wrapper {
  display: flex;
  .stat-card {
    box-shadow: 0.3px 0.5px 0.7px hsl(286deg 21% 68% / 0.28), 0.8px 1.6px 2px -0.8px hsl(286deg 21% 68% / 0.28), 2.1px 4.1px 5.2px -1.7px hsl(286deg 21% 68% / 0.28), 5px 10px 12.6px -2.5px hsl(286deg 21% 68% / 0.28);
    margin: 0 0.5em;
    position: relative;
    border-radius: 12px;
    &:hover {
      // transition: 0.1s ease;
      background-color: var(--primary);
      color: var(--white);
      box-shadow: 1.3px 1.5px 1.7px hsl(286deg 21% 68% /1.28), 1.8px 1.6px 2px 1.8px hsl(286deg 21% 68% /1.28), 2.1px 4.1px 5.2px -1.7px hsl(286deg 21% 68% /1.28), 5px 10px 12.6px -2.5px hsl(286deg 21% 68% /1.28);
      cursor: pointer;
      bottom: 4px;
      .stat-card-icon,
      .n-card-header__main {
        color: var(--white);
      }
    }
    .stat-card-icon {
      position: absolute;
      top: 1em;
      right: 1em;
      font-size: 2em;
      color: var(--primary);
    }
  }
}
</style>
