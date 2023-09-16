<template lang="">
  <div class="forecast_wrapper">
    <h1>Forecast</h1>
    <n-tabs class="tab-headers" type="line" animated>
      <n-tab-pane class="tab" name="day" tab="Day">
        <h3 class="tab-header">Day</h3>
        <div class="stats">
          <n-statistic label="Bookings"> 2 </n-statistic>
          <n-statistic label="Hours"> 20 </n-statistic>
          <n-statistic label="Revenue"> $200 </n-statistic>
        </div>
      </n-tab-pane>
      <n-tab-pane class="tab" name="week" tab="Week">
        <h3 class="tab-header">Week</h3>
        <div class="stats">
          <n-statistic label="Bookings"> 2 </n-statistic>
          <n-statistic label="Hours"> 20 </n-statistic>
          <n-statistic label="Revenue"> $200 </n-statistic>
        </div>
      </n-tab-pane>
      <n-tab-pane class="tab" name="month" tab="Month">
        <h3 class="tab-header">Month</h3>
        <div class="stats">
          <n-statistic label="Bookings"> 2 </n-statistic>
          <n-statistic label="Hours"> 20 </n-statistic>
          <n-statistic label="Revenue"> $200 </n-statistic>
        </div>
      </n-tab-pane>
      <n-tab-pane class="tab" name="year" tab="Year">
        <h3 class="tab-header">Year</h3>
        <div class="stats">
          <n-statistic label="Bookings"> 2 </n-statistic>
          <n-statistic label="Hours"> 20 </n-statistic>
          <n-statistic label="Revenue"> $200 </n-statistic>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
<script>
import { NTabs, NTabPane, NTree, NStatistic } from "naive-ui";
export default {
  components: { NTabs, NTabPane, NTree, NStatistic },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss">
.forecast_wrapper {
  width: 50%;
  position: relative;
  padding: 1em;
  .tab-headers {
    display: flex;
    .tab-header {
      margin-bottom: 1em;
    }
    .stats {
      display: flex;
      justify-content: space-evenly;
      & > * {
        margin-right: 1em;
      }
    }
  }
}
</style>
