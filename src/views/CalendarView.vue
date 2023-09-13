<template lang="">
  <div class="calendar_wrapper">
    <n-button class="add-event-calendar-bttn" color="#222a68" @click="showAddEventModal = true"> + </n-button>
    <VueCal :events="events" :time-from="8 * 60" :time-to="20 * 60" :time-step="15" hide-weekends :time-cell-height="30" events-on-month-view="short" twelve-hour="true" time-format="hh" :on-event-click="onEventClick" :disable-days="unavailableDays" :hide-weekdays="hiddenWeekdays" :disable-views="['years', 'year']">
      <template #time-cell="{ hours, minutes }">
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
import { supabase } from "../lib/supabaseClient";
import { NButton } from "naive-ui";
import AddEvent from "../components/modals/AddEvent.vue";
import UpdateEvent from "../components/modals/UpdateEvent.vue";

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
    this.events = data;
  },
};
</script>
<style lang="scss">
.calendar_wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  overflow-y: scroll;
  position: relative;
}
.add-event-calendar-bttn {
  position: absolute;
  top: 1em;
  right: 1em;
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
.vuecal__no-event {
  display: none;
}
.vuecal__time-cell-line.hours:before {
  border-color: #222a68;
}

.vuecal__now-line {
  color: #654597;
}
.event-background-1 {
  background-color: #ab81cd;
  color: #fff;
  border-radius: 4px;
}
.event-background-2 {
  background-color: #654597;
  color: #fff;
  border-radius: 4px;
}
.event-background-3 {
  background-color: #574ae2;
  color: #fff;
  border-radius: 4px;
}
.event-background-4 {
  background-color: #222a68;
  color: #fff;
  border-radius: 4px;
}
</style>
