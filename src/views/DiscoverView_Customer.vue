<template lang="">
  <div class="discover_wrapper">
    <div class="discover-main">
      <n-card class="service-card" v-for="service in services" :title="service.title">
        <n-button :color="this.$colors.secondary" class="book-appt-bttn" @click="bookEvent(service)"> Book </n-button>
        <div class="service-info">
          <b>Price: </b>
          <p>${{ service.price }}</p>
        </div>
        <div class="service-info">
          <b>Time: </b>
          <p>{{ service.time }} minutes</p>
        </div>
        <div class="service-info">
          <b>Provider: </b>
          <p>{{ service.business_name }}</p>
        </div>
      </n-card>
    </div>
    <add-event-customer :show="showAddEventModal" @closeModal="showAddEventModal = false" :selectedService="activeService" />
  </div>
</template>
<script>
import { supabase } from "../lib/supabaseClient";
import { NButton, NCard, NDropdown } from "naive-ui";
import AddEventCustomer from "../components/modals/AddEvent_Customer.vue";

export default {
  components: { NCard, NButton, AddEventCustomer },
  data() {
    return {
      services: [],
      activeService: null,
      showAddEventModal: false,
    };
  },
  async mounted() {
    let { data, error } = await supabase.from("services").select("*");
    console.log("SERVICES: ", data);
    this.services = data;
  },
  methods: {
    bookEvent(service) {
      this.activeService = service;
      this.showAddEventModal = true;
      console.log("booking service: ", service);
    },
  },
};
</script>
<style lang="scss">
.discover_wrapper {
  height: 100vh;
  width: 100%;
  padding: 1em;
  .discover-main {
    display: flex;
    flex-wrap: wrap;
    .service-card {
      width: 300px;
      margin: 1em;
      position: relative;
      box-shadow: 0.3px 0.5px 0.7px hsl(286deg 21% 68% / 0.28), 0.8px 1.6px 2px -0.8px hsl(286deg 21% 68% / 0.28), 2.1px 4.1px 5.2px -1.7px hsl(286deg 21% 68% / 0.28), 5px 10px 12.6px -2.5px hsl(286deg 21% 68% / 0.28);

      .book-appt-bttn {
        position: absolute;
        right: 0.5em;
        top: 0.5em;
      }
    }
  }
}
</style>
