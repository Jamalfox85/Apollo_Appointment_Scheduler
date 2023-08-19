<template lang="">
  <div class="calendar_wrapper">
    <VueCal />
  </div>
</template>
<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  components: { VueCal },
};
</script>
<style lang="scss">
.calendar_wrapper {
  height: 100vh;
  width: 100%;
  border: solid 4px rgb(119, 0, 255);
  display: flex;
  overflow-y: scroll;
}
.vuecal__title-bar {
  background-color: #ab81cd6a;
  .vuecal__title {
    font-size: 18px;
  }
  .vuecal__today-btn {
    font-size: 12px;
    background-color: #222a68;
    color: #fff;
    border-radius: 4px;
  }
}
.vuecal__now-line {
  color: #654597;
}
.event-background-1 {
  background-color: #ab81cd;
  color: #fff;
  border-radius: 12px;
}
.event-background-2 {
  background-color: #654597;
  color: #fff;
  border-radius: 12px;
}
.event-background-3 {
  background-color: #574ae2;
  color: #fff;
  border-radius: 12px;
}
.event-background-4 {
  background-color: #222a68;
  color: #fff;
  border-radius: 12px;
}
</style>
