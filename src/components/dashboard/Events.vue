<template lang="">
  <div class="events_wrapper">
    <div class="block-header">
      <h1>Upcoming Events</h1>
    </div>
    <div class="block-body">
      <n-card class="event-card" v-for="event in events" :title="event.title">
        <n-dropdown trigger="click" :options="options" @select="onEventClick(event)">
          <n-button class="event-options">
            <EllipsisHorizontal style="width: 2em" />
          </n-button>
        </n-dropdown>
        <div class="service-info">
          <b>Date: </b>
          <p>{{ formatDateTime(event.start) }}</p>
        </div>
      </n-card>
    </div>
    <update-event :show="showUpdateEventModal" @closeModal="showUpdateEventModal = false" :event="activeEvent" />
  </div>
</template>
<script>
import { EllipsisHorizontal } from "@vicons/ionicons5";
import { NButton, NCard, NDropdown } from "naive-ui";
import { supabase } from "../../lib/supabaseClient";
import moment from "moment";
import UpdateEvent from "../modals/UpdateEvent.vue";

export default {
  components: { NButton, NCard, NDropdown, EllipsisHorizontal, UpdateEvent },
  data() {
    return {
      events: [],
      activeEvent: null,
      showUpdateEventModal: false,
      options: [
        {
          label: "Cancel Appointment",
          key: "cancel",
        },
      ],
    };
  },
  methods: {
    formatDateTime(dateTime) {
      return moment(dateTime).format("dddd, MMMM Do YYYY, h:mm:ss a");
    },
    onEventClick(event) {
      this.activeEvent = event;
      this.showUpdateEventModal = true;
    },
  },
  async mounted() {
    let { data, error } = await supabase.from("events").select("*");
    console.log("EVENTS: ", data);
    this.events = data;
  },
};
</script>
<style lang="scss">
.events_wrapper {
  width: 100%;
  height: 450px;
  padding: 0.5em;
  .block-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1em;
  }

  .event-card {
    box-shadow: 0.3px 0.5px 0.7px hsl(286deg 21% 68% / 0.28), 0.8px 1.6px 2px -0.8px hsl(286deg 21% 68% / 0.28), 2.1px 4.1px 5.2px -1.7px hsl(286deg 21% 68% / 0.28), 5px 10px 12.6px -2.5px hsl(286deg 21% 68% / 0.28);
    margin: 1em;
    .event-options {
      position: absolute;
      top: 1em;
      right: 1em;
    }
  }
  .service-info {
    display: flex;
    b {
      margin-right: 0.5em;
    }
  }
}
.close-bttn {
  margin: 1em;
}
</style>
