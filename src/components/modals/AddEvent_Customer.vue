<template>
  <vue-final-modal v-model="modalState" class="vfm_wrapper" :click-to-close="false">
    <div class="modal_wrapper">
      <div class="modal-header">
        <h2 class="modal-title">Book: {{ selectedService.title }}</h2>
        <div style="display: flex; justify-content: flex-end">
          <n-button :color="this.$colors.error" @click="closeModal"> Close </n-button>
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
          <n-form-item label="Time" path="start">
            <n-date-picker v-model:formatted-value="model.start" type="datetime" value-format="yyyy-MM-dd hh:mm" />
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
            <n-button :color="this.$colors.secondary" @click="submitNewEvent"> Submit </n-button>
          </div>
        </n-form>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { VueFinalModal } from "vue-final-modal";
import { NConfigProvider, NInput, NDatePicker, NSpace, NForm, NFormItem, NSelect, NSwitch, NButton } from "naive-ui";
import { supabase } from "../../lib/supabaseClient";
import moment from "moment";

export default {
  components: { VueFinalModal, NInput, NForm, NFormItem, NDatePicker, NSelect, NSwitch, NButton },
  props: ["show", "selectedService"],
  data() {
    return {
      title: "test",
      model: {
        title: null,
        start: null,
        service: null,
        client: null,
        paid: false,
        notes: null,
      },
      clientOptions: ["groode", "veli good", "emazing", "lidiculous"].map((v) => ({
        label: v,
        value: v,
      })),
      serviceOptions: [],
      userData: {},
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
      eventData.title = this.selectedService.title;
      eventData.service = this.selectedService.id;
      eventData.client = this.userData.id;

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
  async mounted() {
    const { data: authData, error: authError } = await supabase.auth.getSession();
    let authUserId = authData.session.user.id;
    let { data: userData, userError } = await supabase.from("users").select("*").eq("user_id", authUserId);
    this.userData = userData[0];
    let { data, error } = await supabase.from("services").select("*");
    let serviceArray = data.map((item) => {
      return {
        label: item.title,
        value: item.id,
      };
    });
    this.serviceOptions = serviceArray;
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
