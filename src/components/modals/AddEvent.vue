<template>
  <vue-final-modal v-model="modalState" class="vfm_wrapper" :click-to-close="false">
    <div class="modal_wrapper">
      <div class="modal-header">
        <h2 class="modal-title">Add Event</h2>
        <div style="display: flex; justify-content: flex-end">
          <n-button type="error" @click="closeModal"> X </n-button>
        </div>
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
            <n-date-picker v-model:formatted-value="model.start" type="datetime" value-format="yyyy-MM-dd hh:mm" />
          </n-form-item>
          <n-form-item label="Select A Service" path="services">
            <n-select v-model:value="model.services" placeholder="Select" :options="serviceOptions" />
          </n-form-item>
          <n-form-item label="Select A Client" path="client">
            <n-select v-model:value="model.client" placeholder="Select" :options="clientOptions" :default-value="activeClientId" />
            <n-button style="margin-left: 1em" color="#222a68" @click="showAddUserDrawer = true">+</n-button>
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
            <n-button type="primary" @click="submitNewEvent"> Submit </n-button>
          </div>
        </n-form>
      </div>
    </div>
    <n-drawer v-model:show="showAddUserDrawer" :width="502" placement="left">
      <n-drawer-content title="New Client">
        <n-form
          :model="newClientModel"
          label-placement="left"
          require-mark-placement="right-hanging"
          size="medium"
          label-width="auto"
          :style="{
            maxWidth: '640px',
          }"
        >
          <n-form-item label="First Name">
            <n-input v-model:value="newClientModel.first_name" placeholder="Alan" path="first_name" />
          </n-form-item>
          <n-form-item label="Last Name" path="last_name">
            <n-input v-model:value="newClientModel.last_name" placeholder="Watts" />
          </n-form-item>
          <n-form-item label="Phone" path="phone">
            <n-input v-model:value="newClientModel.last_name" placeholder="(444) 444-4444" />
          </n-form-item>
          <n-form-item label="Email" path="email">
            <n-input v-model:value="newClientModel.last_name" placeholder="email@email.com" />
          </n-form-item>
        </n-form>
        <n-button @click="addNewClient" type="primary"> Submit </n-button>
      </n-drawer-content>
    </n-drawer>
  </vue-final-modal>
</template>

<script>
import { VueFinalModal } from "vue-final-modal";
import { NConfigProvider, NInput, NDatePicker, NSpace, NForm, NFormItem, NSelect, NSwitch, NButton, NDrawer, NDrawerContent } from "naive-ui";
import { supabase } from "../../lib/supabaseClient";
import moment from "moment";

export default {
  components: { VueFinalModal, NInput, NForm, NFormItem, NDatePicker, NSelect, NSwitch, NButton, NDrawer, NDrawerContent },
  props: ["show", "activeClientId"],
  data() {
    return {
      title: "test",
      model: {
        title: null,
        start: null,
        services: null,
        client: this.activeClientId,
        paid: false,
        notes: null,
      },
      newClientModel: {
        first_name: null,
        last_name: null,
        phone: null,
        email: null,
      },
      clientOptions: [],
      serviceOptions: [],
      showAddUserDrawer: false,
    };
  },
  computed: {
    modalState() {
      return this.show;
    },
  },
  methods: {
    async submitNewEvent() {
      let eventData = this.model;

      const start = new Date(eventData.start);
      const end = this.addMinutes(new Date(start), 30);

      let startDateTime = moment(start).format("YYYY-MM-DD hh:mm");
      let endDateTime = moment(end).format("YYYY-MM-DD hh:mm");

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
    async addNewClient() {
      // const { data, error } = await supabase.from("clients").insert([this.newClientModel]).select();
      // if (data) {
      //   console.log("DATA :", data);
      // }
      console.log("DATA: ", this.newClientModel);
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
  async mounted() {
    let { data: servicesData, error: servicesError } = await supabase.from("services").select("*");
    let serviceArray = servicesData.map((service) => {
      return {
        label: service.title,
        value: service.id,
      };
    });
    let { data: clientsData, error: clientsError } = await supabase.from("clients").select("*");
    let ClientsArray = clientsData.map((client) => {
      return {
        label: client.first_name + " " + client.last_name,
        value: client.id,
      };
    });
    this.serviceOptions = serviceArray;
    this.clientOptions = ClientsArray;
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
