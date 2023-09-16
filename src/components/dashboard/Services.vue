<template lang="">
  <div class="services_wrapper">
    <div class="block-header">
      <h1>Services</h1>
      <div style="display: flex; justify-content: flex-end">
        <n-button color="#222a68" @click="showAddDrawer = true"> + </n-button>
      </div>
    </div>
    <div class="block-body">
      <n-card class="service-card" v-for="service in services" :title="service.title" @click="onServiceClick(service)">
        <div class="service-info">
          <b>Price: </b>
          <p>${{ service.price }}</p>
        </div>
        <div class="service-info">
          <b>Time: </b>
          <p>{{ service.time }} minutes</p>
        </div>
        <div class="service-info">
          <b>Description: </b>
          <p>{{ service.description }}</p>
        </div>
      </n-card>
    </div>
    <add-service :show="showAddDrawer" @close="showAddDrawer = false" />
    <update-service :show="showUpdateDrawer" @close="showUpdateDrawer = false" :service="activeService" />
  </div>
</template>
<script>
import { NInput, NForm, NFormItem, NButton, NDrawerContent, NDrawer, NCard } from "naive-ui";
import { supabase } from "../../lib/supabaseClient";
import AddService from "../modals/AddService.vue";
import UpdateService from "../modals/UpdateService.vue";

export default {
  components: { NDrawerContent, NDrawer, NForm, NFormItem, NButton, NInput, AddService, UpdateService, NCard },
  data() {
    return {
      services: [],
      showAddDrawer: false,
      showUpdateDrawer: false,
      model: {
        title: null,
      },
      activeService: null,
      userData: {},
    };
  },
  methods: {
    onServiceClick(service) {
      this.activeService = service;
      this.showUpdateDrawer = true;
    },
  },
  async mounted() {
    const { data: authData, error: authError } = await supabase.auth.getSession();
    let authUserId = authData.session.user.id;
    let { data: userData, userError } = await supabase.from("users").select("*").eq("user_id", authUserId);
    let { data, error } = await supabase.from("services").select("*").eq("user_id", userData[0].user_id);
    this.services = data;
  },
};
</script>
<style lang="scss">
.services_wrapper {
  width: 100%;
  padding: 0.5em;
  .block-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1em;
  }
  .block-body {
    display: flex;
    // flex-grow: 1;
    flex-wrap: wrap;
    .service-card {
      box-shadow: 0.3px 0.5px 0.7px hsl(286deg 21% 68% / 0.28), 0.8px 1.6px 2px -0.8px hsl(286deg 21% 68% / 0.28), 2.1px 4.1px 5.2px -1.7px hsl(286deg 21% 68% / 0.28), 5px 10px 12.6px -2.5px hsl(286deg 21% 68% / 0.28);
      margin: 1em;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      width: 375px;
      .service-info {
        display: flex;
        flex-wrap: wrap;
        b {
          margin-right: 0.5em;
        }
        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
.close-bttn {
  margin: 1em;
}
</style>
