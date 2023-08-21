<template lang="">
  <n-drawer class="service_drawer_wrapper" v-model:show="drawerState" :width="502" placement="right" :mask-closable="false">
    <div style="display: flex; justify-content: flex-end">
      <n-button class="close-bttn" type="error" @click="closeDrawer()"> x </n-button>
    </div>
    <n-drawer-content title="Add Service">
      <n-form
        :model="model"
        label-placement="left"
        require-mark-placement="right-hanging"
        size="medium"
        label-width="auto"
        :style="{
          maxWidth: '450px',
        }"
      >
        <n-form-item label="Title" path="title">
          <n-input v-model:value="model.title" placeholder="Manicure" />
        </n-form-item>
        <n-form-item label="Price" path="price">
          <n-input-number v-model:value="model.price" :parse="parseCurrency" :format="formatCurrency" />
        </n-form-item>
        <n-form-item label="Time" path="time">
          <n-select v-model:value="model.time" :options="timeOptions" />
        </n-form-item>

        <n-form-item label="Notes" path="notes">
          <n-input
            v-model:value="model.notes"
            placeholder="Notes"
            type="textarea"
            :autosize="{
              minRows: 3,
              maxRows: 5,
            }"
          />
        </n-form-item>
      </n-form>
      <div style="display: flex; justify-content: flex-end">
        <n-button type="primary" @click="submitNewService"> Submit </n-button>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>
<script>
import { NConfigProvider, NInput, NDatePicker, NSpace, NForm, NFormItem, NSelect, NSwitch, NButton, NDrawerContent, NDrawer, NInputNumber } from "naive-ui";
import { supabase } from "../../lib/supabaseClient";
export default {
  components: { NDrawerContent, NDrawer, NForm, NFormItem, NButton, NInput, NInputNumber, NSelect },
  props: ["show"],
  data() {
    return {
      userData: {},
      services: [],
      model: {
        title: null,
        price: 0,
        time: 30,
        notes: null,
      },
      timeOptions: [
        {
          label: "15 minutes",
          value: 15,
        },
        {
          label: "30 minutes",
          value: 30,
        },
        {
          label: "45 minutes",
          value: 45,
        },
        {
          label: "60 minutes",
          value: 60,
        },
      ],
    };
  },
  computed: {
    drawerState() {
      return this.show;
    },
  },
  methods: {
    async submitNewService() {
      let serviceData = this.model;
      serviceData.user_id = this.userData.user_id;
      serviceData.business_name = this.userData.business_name;
      console.log("DATA: ", serviceData);
      const { data, error } = await supabase.from("services").insert([serviceData]).select();
      this.closeDrawer();
    },
    parseCurrency: (input) => {
      const nums = input.replace(/(,|\$|\s)/g, "").trim();
      if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums);
      return nums === "" ? null : Number.NaN;
    },
    formatCurrency: (value) => {
      if (value === null) return "";
      return `$ ${value.toLocaleString("en-US")}`;
    },
    closeDrawer() {
      this.$emit("close");
    },
  },
  async mounted() {
    const { data: authData, error: authError } = await supabase.auth.getSession();
    let authUserId = authData.session.user.id;
    let { data: userData, userError } = await supabase.from("users").select("*").eq("user_id", authUserId);
    this.userData = userData[0];
  },
};
</script>
<style lang="scss">
.close-bttn {
  margin: 1em;
}
</style>
