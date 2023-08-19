<template>
  <vue-final-modal v-if="show" v-model="pointlessVModel" class="vfm_wrapper" :click-to-close="false">
    <div class="modal_wrapper">
      <div class="modal-header">
        <h2 class="modal-title">Update Event</h2>
        <div style="display: flex; justify-content: flex-end">
          <n-button type="error" @click="closeModal"> X </n-button>
        </div>
      </div>
      <div class="modal-body">
        <n-form
          :model="model"
          label-placement="left"
          require-mark-placement="right-hanging"
          :size="size"
          label-width="auto"
          :style="{
            maxWidth: '640px',
          }"
        >
          <!-- <n-form-item label="Title" path="title">
            <n-input v-model:value="model.title" placeholder="Hair Appointment With Stacia." />
          </n-form-item>
          <n-form-item label="Time" path="start">
            <n-date-picker v-model:formatted-value="model.start" type="datetime" value-format="yyyy-MM-dd HH:mm" />
          </n-form-item>
          <n-form-item label="Select A Service" path="services">
            <n-select v-model:value="model.services" placeholder="Select" :options="serviceOptions" multiple />
          </n-form-item>
          <n-form-item label="Select A Client" path="client">
            <n-select v-model:value="model.client" placeholder="Select" :options="clientOptions" multiple />
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
          </n-form-item> -->
          <p>ID: {{ event.id }}</p>
          <div style="display: flex; justify-content: flex-end">
            <n-button type="error" @click="deleteEvent"> Delete </n-button>
          </div>
          <!-- <div style="display: flex; justify-content: flex-end">
            <n-button type="primary" @click="updateEvent"> Submit </n-button>
          </div> -->
        </n-form>
      </div>
    </div>
  </vue-final-modal>
</template>

<script lang="ts">
import { VueFinalModal } from "vue-final-modal";
import { NConfigProvider, NInput, NDatePicker, NSpace, NForm, NFormItem, NSelect, NSwitch, NButton } from "naive-ui";
import { supabase } from "../../lib/supabaseClient";
import moment from "moment";

export default {
  components: { VueFinalModal, NInput, NForm, NFormItem, NDatePicker, NSelect, NSwitch, NButton },
  props: ["show", "event"],
  data() {
    return {
      title: "test",
      pointlessVModel: true,
      size: "medium",
      model: {
        user_id: "17ab1f39-8889-44a2-b9b7-2f44040c53ed",
        title: null,
        start: null,
        services: null,
        client: null,
        paid: false,
        notes: null,
      },
      serviceOptions: ["groode", "veli good", "emazing", "lidiculous"].map((v) => ({
        label: v,
        value: v,
      })),
      clientOptions: ["groode", "veli good", "emazing", "lidiculous"].map((v) => ({
        label: v,
        value: v,
      })),
    };
  },
  methods: {
    async deleteEvent() {
      const { error } = await supabase.from("events").delete().eq("id", this.event.id);
      this.closeModal();
    },
    async updateEvent() {
      let eventData = this.model;

      const start = new Date(eventData.start);
      const end = this.addMinutes(new Date(start), 30);

      let startDateTime = moment(start).format("YYYY-MM-DD HH:mm");
      let endDateTime = moment(end).format("YYYY-MM-DD HH:mm");

      eventData.start = startDateTime;
      eventData.end = endDateTime;

      const { data, error } = await supabase.from("events").insert([eventData]).select();
      if (data) {
        this.closeModal();
      } else {
        console.log("ERROR: ", error);
      }
    },
    addMinutes(date, minutes) {
      date.setMinutes(date.getMinutes() + minutes);
      return date;
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style lang="scss">
.vfm_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  .modal_wrapper {
    width: 700px;
    background-color: #fff;
    border-radius: 12px;
    padding: 1em;
    .modal-header {
      padding: 0.5em;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .modal-body {
    }
  }
}
</style>
