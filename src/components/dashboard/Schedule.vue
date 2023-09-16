<template lang="">
  <div class="schedule_wrapper">
    <div class="block-header">
      <h1>Schedule</h1>
      <div style="display: flex; justify-content: flex-end">
        <n-button class="add-event-bttn" color="#222a68" @click="showAddEventModal = true"> + </n-button>
      </div>
    </div>
    <VueCal class="vue-cal" active-view="day" :events="events" :time-from="8 * 60" :time-to="20 * 60" :time-step="15" hide-weekends :twelveHour="true" :disable-views="['years', 'year', 'month', 'week']" :todayButton="false" :snapToTime="15" :disable-days="unavailableDays" :hide-weekdays="hiddenWeekdays" :on-event-click="onEventClick" :timeFormat="'hh'">
      <template #time-cell="{ hours, minutes }" #twelve-hour="true" :timeFormat="'hh'">
        <div :class="{ 'vuecal__time-cell-line': true, hours: !minutes }">
          <strong v-if="!minutes" style="font-size: 15px">{{ hours }}</strong>
          <span v-else style="font-size: 11px">{{ minutes }}</span>
        </div>
      </template>
    </VueCal>
    <add-event :show="showAddEventModal" @closeModal="showAddEventModal = false" />
    <update-event :show="showUpdateEventModal" @closeModal="showUpdateEventModal = false" :event="activeEvent" />
  </div>
</template>
<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { supabase } from "../../lib/supabaseClient";
import { NButton } from "naive-ui";
import AddEvent from "../modals/AddEvent.vue";
import UpdateEvent from "../modals/UpdateEvent.vue";

export default {
  components: { VueCal, AddEvent, UpdateEvent, NButton },
  data() {
    return {
      events: [],
      unavailableDays: [],
      hiddenWeekdays: [],
      showAddEventModal: false,
      showUpdateEventModal: false,
      activeEvent: null,
    };
  },
  methods: {
    onEventClick(e) {
      this.activeEvent = e;
      this.showUpdateEventModal = true;
    },
  },
  async mounted() {
    let { data, error } = await supabase.from("events").select("");
    console.log("EVENTS: ", data);
    this.events = data;
  },
};
</script>
<style lang="scss">
.schedule_wrapper {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  .add-event-bttn {
    margin-bottom: 0.5em;
    position: absolute;
    right: 0.5em;
    top: 0.5em;
  }
}
.vue-cal {
  border: solid 2px red;
  flex-grow: 1;
}
.vuecal__no-event {
  display: none;
}
</style>
