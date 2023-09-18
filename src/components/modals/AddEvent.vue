<template>
  <n-drawer v-model:show="modalState" :width="750" placement="left" :mask-closable="false">
    <div style="display: flex; justify-content: flex-end">
      <n-button class="close-bttn" type="error" @click="closeDrawer()"> x </n-button>
    </div>
    <n-drawer-content class="modal_wrapper">
      <div class="modal-header">
        <h2 class="modal-title">Add Event</h2>
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
          <n-form-item label="Time" path="start">
            <n-date-picker v-model:formatted-value="model.start" type="datetime" value-format="yyyy-MM-dd HH:mm" />
          </n-form-item>
          <n-form-item label="Select A Service" path="services">
            <n-select v-model:value="model.service" placeholder="Select" :options="getServiceData" />
          </n-form-item>
          <n-form-item label="Select A Client" path="client">
            <n-select v-model:value="model.client" placeholder="Select" :options="getClientData" :default-value="activeClientId" />
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
            <n-button color="#222a68" @click="submitNewEvent"> Submit </n-button>
          </div>
        </n-form>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script>
import { useStore } from "../../stores/store";
import { VueFinalModal } from "vue-final-modal";
import { NConfigProvider, NInput, NDatePicker, NSpace, NForm, NFormItem, NSelect, NSwitch, NButton, NDrawer, NDrawerContent } from "naive-ui";
import { supabase } from "../../lib/supabaseClient";
import moment from "moment";

export default {
  components: { VueFinalModal, NInput, NForm, NFormItem, NDatePicker, NSelect, NSwitch, NButton, NDrawer, NDrawerContent },
  props: ["show", "activeClientId"],
  data() {
    return {
      model: {
        title: null,
        start: null,
        service: null,
        client: this.activeClientId,
        paid: false,
        notes: null,
      },
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
    async submitNewEvent() {
      let eventData = this.model;

      const start = new Date(eventData.start);
      const end = this.addMinutes(new Date(start), 30);

      let startDateTime = moment(start).format("YYYY-MM-DD HH:mm");
      let endDateTime = moment(end).format("YYYY-MM-DD HH:mm");

      eventData.start = startDateTime;
      eventData.end = endDateTime;

      this.store.addEvent(eventData);
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

  setup() {
    const store = useStore();
    return { store };
  },
};
</script>

<style lang="scss"></style>
