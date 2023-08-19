<template lang="">
  <div class="services_wrapper">
    <div class="block-header">
      <h1>Services</h1>
      <div style="display: flex; justify-content: flex-end">
        <n-button color="#222a68" @click="showAddDrawer = true"> + </n-button>
      </div>
    </div>
    <div class="block-body">
      <div v-for="service in services" @click="onServiceClick(service)">
        {{ service.title }} <br />
        $ {{ service.price }} <br />
        {{ service.time }} minutes
      </div>
    </div>
    <add-service :show="showAddDrawer" @close="showAddDrawer = false" />
    <update-service :show="showUpdateDrawer" @close="showUpdateDrawer = false" :service="activeService" />
  </div>
</template>
<script>
import { NInput, NForm, NFormItem, NButton, NDrawerContent, NDrawer } from "naive-ui";
import { supabase } from "../../lib/supabaseClient";
import AddService from "../modals/AddService.vue";
import UpdateService from "../modals/UpdateService.vue";

export default {
  components: { NDrawerContent, NDrawer, NForm, NFormItem, NButton, NInput, AddService, UpdateService },
  data() {
    return {
      services: [],
      showAddDrawer: false,
      showUpdateDrawer: false,
      model: {
        user_id: "17ab1f39-8889-44a2-b9b7-2f44040c53ed",
        title: null,
      },
      activeService: null,
    };
  },
  methods: {
    async submitNewService() {
      let serviceData = this.model;
      const { data, error } = await supabase.from("services").insert([serviceData]).select();
      this.showDrawer = false;
    },
    onServiceClick(service) {
      this.activeService = service;
      this.showUpdateDrawer = true;
    },
  },
  async mounted() {
    let { data, error } = await supabase.from("services").select("*");
    console.log("SERVICES: ", data);
    this.services = data;
  },
};
</script>
<style lang="scss">
.services_wrapper {
  width: 100%;
  height: 450px;
  border: solid 4px orange;
  padding: 0.5em;
  .block-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.close-bttn {
  margin: 1em;
}
</style>
