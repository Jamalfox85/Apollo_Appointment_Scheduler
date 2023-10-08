<template lang="">
  <div class="upcoming_appts_wrapper">
    <div class="upcoming-appts-header">
      <h2>Upcoming Appointments</h2>
      <n-tag class="upcoming-events-tag" :bordered="false" round :color="{ color: this.$colors.primary, textColor: this.$colors.white }">{{ getEventData.length }}</n-tag>
      <n-button class="new-booking-bttn" :color="this.$colors.secondary" ghost @click="showAddEventDrawer = true"> New Booking </n-button>
    </div>
    <div class="upcoming-appts-group">
      <div v-for="event in getEventData" class="upcoming-appt">
        <div class="event-date">
          <font-awesome-icon class="stat-card-icon" :icon="['far', 'calendar-days']" />
        </div>
        <div class="event-details">
          <b class="event-title">{{ event.title }}</b>
          <p class="event-start">Start: {{ event.start }}</p>
          <n-tag class="event-paid-status" :bordered="false" :color="{ color: event.paid ? this.$colors.primary : this.$colors.tertiary }">{{ event.paid ? "Paid" : "Awaiting Payment" }}</n-tag>
        </div>
        <div class="event-actions">
          <font-awesome-icon
            class="expand-event-icon"
            :icon="['fas', 'up-right-from-square']"
            @click="
              activeEvent = event;
              showUpdateEventDrawer = true;
            "
          />
        </div>
      </div>
    </div>
    <add-event :show="showAddEventDrawer" :placement="'left'" @close="showAddEventDrawer = false" />
    <update-event :show="showUpdateEventDrawer" @close="showUpdateEventDrawer = false" :event="activeEvent" />
  </div>
</template>
<script>
import { useStore } from "../../stores/store";
import { formattingService } from "../../services/formattingService";
import { NButton, NTag } from "naive-ui";
import AddEvent from "../modals/AddEvent.vue";
import UpdateEvent from "../modals/UpdateEvent.vue";

export default {
  components: { AddEvent, UpdateEvent, NButton, NTag },
  data() {
    return {
      events: [],
      showAddEventDrawer: false,
      showUpdateEventDrawer: false,
      activeEvent: null,
    };
  },
  computed: {
    getEventData() {
      let events = this.store.getEventData;
      let filteredEvents = events
        // Sort by Date
        .sort((a, b) => {
          let aDate = new Date(a.start);
          let bDate = new Date(b.start);
          return aDate - bDate;
        })
        // Return only upcoming events
        .filter((item) => {
          if (new Date(item.start) >= new Date()) {
            return true;
          }
        })
        // Return 3 closest events
        .slice(0, 3);
      return filteredEvents;
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
<style lang="scss" scoped>
.upcoming_appts_wrapper {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  .upcoming-appts-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.5em;
    h2 {
      font-size: 1em;
    }
    .upcoming-events-tag {
      margin: 0 auto 0 1em;
    }
    .new-booking-bttn {
      box-shadow: 0.3px 0.5px 0.7px hsl(286deg 21% 68% / 0.28), 0.8px 1.6px 2px -0.8px hsl(286deg 21% 68% / 0.28), 2.1px 4.1px 5.2px -1.7px hsl(286deg 21% 68% / 0.28), 5px 10px 12.6px -2.5px hsl(286deg 21% 68% / 0.28);
      &:hover {
        background-color: var(--primary);
        transition: 0.1s ease-in;
      }
    }
  }
  .upcoming-appts-group {
    max-height: 400px;
    overflow-y: auto;
    padding: 0.5em;

    .upcoming-appt {
      display: flex;
      padding: 0.5em;
      border-radius: 12px;
      margin-bottom: 0.5em;
      box-shadow: 0.3px 0.5px 0.7px hsl(286deg 21% 68% / 0.28), 0.8px 1.6px 2px -0.8px hsl(286deg 21% 68% / 0.28), 2.1px 4.1px 5.2px -1.7px hsl(286deg 21% 68% / 0.28), 5px 10px 12.6px -2.5px hsl(286deg 21% 68% / 0.28);

      .event-date {
        font-size: 2em;
        margin-right: 0.5em;
        color: var(--secondary);
      }
      .event-details {
        .event-title {
          font-size: 16px;
        }
        .event-start {
          font-size: 12px;
        }
        .event-paid-status {
          border-radius: 8px;
          font-size: 12px;
        }
      }
      .event-actions {
        margin-left: auto;
        & > * {
          cursor: pointer;
          &:hover {
            color: var(--primary);
            transition: 0.1s ease-in;
          }
        }
      }
    }
    &::-webkit-scrollbar {
      width: 4px;
      cursor: pointer;
    }
    &::-webkit-scrollbar-track {
      background: rgb(211, 210, 210);
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--secondary);
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: var(--primary);
      cursor: pointer;
    }
  }
}
</style>
