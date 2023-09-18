<template>
  <n-drawer v-model:show="modalState" :width="500" placement="left" :mask-closable="false">
    <div style="display: flex; justify-content: flex-end">
      <n-button class="close-bttn" type="error" @click="closeDrawer()"> x </n-button>
    </div>
    <n-drawer-content class="modal_wrapper">
      <div class="modal-header">
        <h2 class="modal-title">Update Event</h2>
      </div>
      <div class="modal-body">
        <n-form
          :model="model"
          label-placement="left"
          require-mark-placement="right-hanging"
          size="medium"
          label-width="auto"
          :style="{
            maxWidth: '640px',
          }"
        >
          <n-form-item label="Title" path="title">
            <n-input v-model:value="model.title" placeholder="Hair Appointment With Stacia." />
          </n-form-item>
          <n-form-item label="Select A Service" path="services">
            <n-select v-model:value="model.service" placeholder="Select" :options="getServiceData" />
          </n-form-item>
          <n-form-item label="Select A Client" path="client">
            <n-select v-model:value="model.client" placeholder="Select" :options="getClientData" />
          </n-form-item>
          <n-form-item label="Paid?" path="paid">
            <n-switch v-model:value="model.paid" />
          </n-form-item>
          <n-form-item label="Notes" path="notes">
            <n-input
              v-model:value="model.notes"
              placeholder="Event Notes"
              type="textarea"
              :autosize="{
                minRows: 3,
                maxRows: 5,
              }"
            />
          </n-form-item>
          <div style="display: flex; justify-content: flex-end">
            <n-button color="#222a68" @click="updateEvent"> Update </n-button>
            <n-button type="error" @click="deleteEvent"> Delete </n-button>
          </div>
        </n-form>
      </div>
    </n-drawer-content>
  </n-drawer>
  <delete-event :show="showDeleteEventDrawer" @close="showDeleteEventDrawer = false" :event="event" />
</template>

<script lang="ts">
import { useStore } from "../../stores/store";
import { VueFinalModal } from "vue-final-modal";
import { NInput, NDatePicker, NForm, NFormItem, NSelect, NSwitch, NButton, NDrawer, NDrawerContent } from "naive-ui";
import DeleteEvent from "./DeleteEvent.vue";
export default {
  components: { VueFinalModal, NInput, NForm, NFormItem, NDatePicker, NSelect, NSwitch, NButton, NDrawer, NDrawerContent, DeleteEvent },
  props: ["show", "event"],
  data() {
    return {
      model: {
        title: null,
        service: null,
        client: null,
        paid: false,
        notes: null,
      },
      showDeleteEventDrawer: false,
    };
  },
  computed: {
    getServiceData() {
      let services = this.store.getServiceData;
      return services.map((service) => {
        return {
          label: service.title,
          value: service.id,
        };
      });
    },
    getClientData() {
      let clients = this.store.getClientData;
      return clients.map((client) => {
        return {
          label: client.first_name + " " + client.last_name,
          value: client.id,
        };
      });
    },
    modalState() {
      return this.show;
    },
  },
  methods: {
    async deleteEvent() {
      this.showDeleteEventDrawer = true;
      this.closeDrawer();
    },
    async updateEvent() {
      let eventData = this.model;
      this.store.updateEvent(eventData, this.event.id);
      this.closeDrawer();
    },
    addMinutes(date, minutes) {
      date.setMinutes(date.getMinutes() + minutes);
      return date;
    },
    closeDrawer() {
      this.$emit("close");
    },
  },
  watch: {
    event: function () {
      this.model.title = this.event.title;
      this.model.service = this.event.service;
      this.model.client = this.event.client;
      this.model.paid = this.event.paid;
      this.model.notes = this.event.notes;
    },
  },
  setup() {
    const store = useStore();
    return { store };
  },
};
</script>

<style lang="scss">
.n-button {
  margin-right: 1em;
}
</style>
