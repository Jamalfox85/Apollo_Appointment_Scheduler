<template lang="">
  <div class="schedule_wrapper">
    <n-button class="add-event-bttn" color="#222a68" @click="showAddEventModal = true"> + </n-button>
    <VueCal class="vue-cal" active-view="day" :events="events" :disable-views="['years', 'year', 'month', 'week']" :todayButton="true" :snapToTime="15" :disable-days="unavailableDays" :hide-weekdays="hiddenWeekdays" :on-event-click="onEventClick" />
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
import { VueFinalModal } from "vue-final-modal";

export default {
  components: { VueCal, AddEvent, UpdateEvent, VueFinalModal, NButton },
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
  height: 100%;
  position: relative;
  .add-event-bttn {
    margin-bottom: 0.5em;
    position: absolute;
    right: 0.5em;
    top: 0.5em;
  }
}
</style>
