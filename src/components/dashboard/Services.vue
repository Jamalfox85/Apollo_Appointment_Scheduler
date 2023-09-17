<template lang="">
  <div class="services_wrapper">
    <div class="block-header">
      <h1>Services</h1>
      <div style="display: flex; justify-content: flex-end">
        <n-button size="small" color="#222a68" @click="showAddDrawer = true"> + </n-button>
      </div>
    </div>
    <div class="block-body">
      <n-card class="service-card" v-for="service in getServiceData" :title="service.title">
        <n-switch class="toggle-service" v-model:value="service.active" @update:value="onActiveStateChange(service)" />
        <n-button class="update-service" size="small" color="#222a68" @click="onServiceClick(service)"> Update </n-button>
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
import { useStore } from "../../stores/store";
import AddService from "../modals/AddService.vue";
import UpdateService from "../modals/UpdateService.vue";
import { NButton, NCard, NSwitch } from "naive-ui";

export default {
  components: { NButton, AddService, UpdateService, NCard, NSwitch },
  data() {
    return {
      showAddDrawer: false,
      showUpdateDrawer: false,
      activeService: null,
    };
  },
  methods: {
    onServiceClick(service) {
      this.activeService = service;
      this.showUpdateDrawer = true;
    },
    onActiveStateChange(service) {
      this.store.updateActiveState(service);
    },
  },
  computed: {
    getServiceData() {
      let services = this.store.getServiceData;
      return services;
    },
  },
  setup() {
    const store = useStore();
    return { store };
  },
};
</script>
<style lang="scss">
.services_wrapper {
  width: 100%;
  height: 300px;
  padding: 0.5em;
  .block-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1em;
  }
  .block-body {
    display: flex;
    overflow-x: auto;
    .service-card {
      box-shadow: 0.3px 0.5px 0.7px hsl(286deg 21% 68% / 0.28), 0.8px 1.6px 2px -0.8px hsl(286deg 21% 68% / 0.28), 2.1px 4.1px 5.2px -1.7px hsl(286deg 21% 68% / 0.28), 5px 10px 12.6px -2.5px hsl(286deg 21% 68% / 0.28);
      margin: 1em;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      min-width: 375px;
      position: relative;
      .toggle-service {
        position: absolute;
        top: 1em;
        right: 1em;
      }
      .update-service {
        position: absolute;
        bottom: 1em;
        right: 1em;
      }
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
    &::-webkit-scrollbar {
      height: 6px;
      cursor: pointer;
    }
    &::-webkit-scrollbar-track {
      background: rgb(211, 210, 210);
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: #222a68;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #3e4bb4;
      cursor: pointer;
    }
  }
}
.close-bttn {
  margin: 1em;
}
</style>
