<template lang="">
  <n-drawer v-model:show="drawerState" :width="502" placement="left">
    <div style="display: flex; justify-content: flex-end">
      <n-button class="close-bttn" type="error" @click="closeDrawer()"> x </n-button>
    </div>
    <n-drawer-content title="New Client">
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
        <n-form-item label="First Name">
          <n-input v-model:value="model.first_name" placeholder="Alan" path="first_name" />
        </n-form-item>
        <n-form-item label="Last Name" path="last_name">
          <n-input v-model:value="model.last_name" placeholder="Watts" />
        </n-form-item>
        <n-form-item label="Phone" path="phone">
          <n-input v-model:value="model.phone" placeholder="(444) 444-4444" />
        </n-form-item>
        <n-form-item label="Email" path="email">
          <n-input v-model:value="model.email" placeholder="email@email.com" />
        </n-form-item>
      </n-form>
      <n-button @click="addNewClient" type="primary"> Submit </n-button>
    </n-drawer-content>
  </n-drawer>
</template>
<script>
import { useStore } from "../../stores/store";
import { NInput, NForm, NFormItem, NButton, NDrawerContent, NDrawer, NInputNumber } from "naive-ui";
export default {
  components: { NDrawerContent, NDrawer, NForm, NFormItem, NButton, NInput, NInputNumber },
  props: ["show"],
  data() {
    return {
      model: {
        first_name: null,
        last_name: null,
        phone: null,
        email: null,
      },
    };
  },
  computed: {
    drawerState() {
      return this.show;
    },
  },
  methods: {
    addNewClient() {
      this.store.addClient(this.model);
      this.closeDrawer();
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
