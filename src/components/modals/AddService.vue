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
        <n-form-item label="Active" path="active">
          <n-switch v-model:value="model.active" />
        </n-form-item>
        <n-form-item label="Title" path="title">
          <n-input v-model:value="model.title" placeholder="Manicure" />
        </n-form-item>
        <n-form-item label="Price" path="price">
          <n-input-number v-model:value="model.price" :parse="parseCurrency" :format="formatCurrency" />
        </n-form-item>
        <n-form-item label="Time" path="time">
          <n-select v-model:value="model.time" :options="timeOptions" />
        </n-form-item>

        <n-form-item label="Description" path="description">
          <n-input
            v-model:value="model.description"
            placeholder="Description"
            type="textarea"
            :autosize="{
              minRows: 3,
              maxRows: 5,
            }"
          />
        </n-form-item>
      </n-form>
      <div style="display: flex; justify-content: flex-end">
        <n-button color="#222a68" @click="submitNewService"> Submit </n-button>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>
<script>
import { useStore } from "../../stores/store";
import { formattingService } from "../../services/formattingService";
import { NInput, NForm, NFormItem, NSelect, NSwitch, NButton, NDrawerContent, NDrawer, NInputNumber } from "naive-ui";
export default {
  components: { NDrawerContent, NDrawer, NForm, NFormItem, NButton, NInput, NInputNumber, NSelect, NSwitch },
  props: ["show"],
  data() {
    return {
      model: {
        active: false,
        title: null,
        price: 0,
        time: 30,
        description: null,
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
      this.store.addService(serviceData);
      this.closeDrawer();
    },
    parseCurrency: (input) => {
      return formattingService.parseCurrency(input);
    },
    formatCurrency: (value) => {
      return formattingService.formatCurrency(value);
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
<style lang="scss">
.close-bttn {
  margin: 1em;
}
</style>
