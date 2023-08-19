<template lang="">
  <n-drawer class="service_drawer_wrapper" v-model:show="drawerState" :width="502" placement="right" :mask-closable="false">
    <div style="display: flex; justify-content: flex-end">
      <n-button class="close-bttn" type="error" @click="closeDrawer()"> x </n-button>
    </div>
    <n-drawer-content title="Update Service">
      <!-- <n-form
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
      </n-form> -->
      <div style="display: flex; justify-content: flex-end">
        <n-button type="error" @click="deleteService"> Delete </n-button>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>
<script>
import { NConfigProvider, NInput, NDatePicker, NSpace, NForm, NFormItem, NSelect, NSwitch, NButton, NDrawerContent, NDrawer } from "naive-ui";
import { supabase } from "../../lib/supabaseClient";
export default {
  components: { NDrawerContent, NDrawer, NForm, NFormItem, NButton, NInput },
  props: ["show", "service"],
  data() {
    return {
      services: [],
      model: {
        user_id: "17ab1f39-8889-44a2-b9b7-2f44040c53ed",
        title: null,
      },
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
      const { data, error } = await supabase.from("services").insert([serviceData]).select();
      this.closeDrawer();
    },
    async deleteService() {
      const { error } = await supabase.from("services").delete().eq("id", this.service.id);
      this.closeDrawer();
    },
    closeDrawer() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss">
.close-bttn {
  margin: 1em;
}
</style>
