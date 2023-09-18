<template lang="">
  <div class="schedule_wrapper">
    <div class="block-header">
      <h1>Schedule</h1>
      <div style="display: flex; justify-content: flex-end">
        <n-button class="add-event-bttn" size="small" color="#222a68" @click="showAddEventDrawer = true"> + </n-button>
      </div>
    </div>
    <VueCal class="vue-cal" active-view="day" :events="getEventData" :time-from="8 * 60" :time-to="20 * 60" :time-step="15" hide-weekends :twelve-hour="true" :disable-views="['years', 'year', 'month', 'week']" :todayButton="false" :snapToTime="15" :disable-days="unavailableDays" :hide-weekdays="hiddenWeekdays" :on-event-click="onEventClick" @cell-dblclick="showAddEventDrawer = true">
      <template #time-cell="{ hours, minutes }" #twelve-hour="true">
        <div :class="{ 'vuecal__time-cell-line': true, hours: !minutes }">
          <strong v-if="!minutes" style="font-size: 15px">{{ formatTime(hours) }}</strong>
          <span v-else style="font-size: 11px">{{ minutes }}</span>
        </div>
      </template>
    </VueCal>
    <add-event :show="showAddEventDrawer" @close="showAddEventDrawer = false" />
    <update-event :show="showUpdateEventDrawer" @close="showUpdateEventDrawer = false" :event="activeEvent" />
  </div>
</template>
<script>
import { useStore } from "../../stores/store";
import { formattingService } from "../../services/formattingService";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
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
      showAddEventDrawer: false,
      showUpdateEventDrawer: false,
      activeEvent: null,
    };
  },
  computed: {
    getEventData() {
      let events = this.store.getEventData;
      return events;
    },
  },
  methods: {
    onEventClick(e) {
      this.activeEvent = e;
      this.showUpdateEventDrawer = true;
    },
    formatTime(hour) {
      return formattingService.formatTime(hour);
    },
  },
  setup() {
    const store = useStore();
    return { store };
  },
};
</script>
<style lang="scss">
.schedule_wrapper {
  width: 100%;
  height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  .block-header {
    margin: 4px;
  }
  .add-event-bttn {
    margin-bottom: 0.5em;
    position: absolute;
    right: 1em;
    top: 0.75em;
  }
}
.vue-cal {
  flex-grow: 1;
  margin-top: 12px;
}
.vuecal__time-cell {
  display: flex;
  justify-content: center;
  .vuecal__time-cell-line {
    color: #222a68;
  }
}
.vuecal__event {
  border: solid 2px #222a68;
  background-color: #945fbf20 !important;
  color: #222a68 !important;
  .vuecal__event-title {
    font-weight: bold;
  }
  .vuecal__event-time {
    font-size: 0.8em;
  }
}
.vuecal__no-event {
  display: none;
}
</style>
