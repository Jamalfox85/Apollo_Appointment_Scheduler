<template lang="">
  <div class="services_wrapper">
    <div class="services-header">
      <h2>Most Popular Services</h2>
      <n-tag class="popular-services-tag" :bordered="false" round :color="{ color: this.$colors.primary, textColor: this.$colors.white }">{{ getServiceData.length }}</n-tag>
      <n-button class="new-service-bttn" :color="this.$colors.secondary" ghost @click="showAddDrawer = true"> New Service </n-button>
    </div>
    <div class="block-body">
      <n-card class="service-card" v-for="service in getServiceData" :title="service.title" @click="onServiceClick(service)">
        <n-switch class="toggle-service" v-model:value="service.active" @update:value="onActiveStateChange(service)" :checked="false" />
        <font-awesome-icon class="update-service" :icon="['fas', 'up-right-from-square']" @click="onServiceClick(service)" />
        <div class="service-info">
          <b>Lifetime Revenue: </b>
          <p>${{ service.price }}</p>
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
import { NButton, NCard, NSwitch, NTag } from "naive-ui";

export default {
  components: { NButton, AddService, UpdateService, NCard, NSwitch, NTag },
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
      let sortedServices = services.sort((a, b) => {
        return b.price - a.price;
      });
      let topServices = sortedServices.slice(0, 4);
      return topServices;
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
  // height: 300px;
  .services-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.5em;
    h2 {
      font-size: 1em;
    }
    .popular-services-tag {
      margin: 0 auto 0 1em;
    }
    .new-service-bttn {
      margin-left: auto;
      box-shadow: 0.3px 0.5px 0.7px hsl(286deg 21% 68% / 0.28), 0.8px 1.6px 2px -0.8px hsl(286deg 21% 68% / 0.28), 2.1px 4.1px 5.2px -1.7px hsl(286deg 21% 68% / 0.28), 5px 10px 12.6px -2.5px hsl(286deg 21% 68% / 0.28);
      &:hover {
        background-color: var(--primary);
        transition: 0.1s ease-in;
      }
    }
  }
  .block-body {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .service-card {
      box-shadow: 0.3px 0.5px 0.7px hsl(286deg 21% 68% / 0.28), 0.8px 1.6px 2px -0.8px hsl(286deg 21% 68% / 0.28), 2.1px 4.1px 5.2px -1.7px hsl(286deg 21% 68% / 0.28), 5px 10px 12.6px -2.5px hsl(286deg 21% 68% / 0.28);
      margin: 1em;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      width: 40%;
      position: relative;
      &:hover {
        // transition: 0.1s ease;
        background-color: var(--primary);
        color: var(--white);
        box-shadow: 1.3px 1.5px 1.7px hsl(286deg 21% 68% /1.28), 1.8px 1.6px 2px 1.8px hsl(286deg 21% 68% /1.28), 2.1px 4.1px 5.2px -1.7px hsl(286deg 21% 68% /1.28), 5px 10px 12.6px -2.5px hsl(286deg 21% 68% /1.28);
        cursor: pointer;
        bottom: 4px;
        .stat-card-icon,
        .n-card-header__main {
          color: var(--white);
        }
      }
      .toggle-service {
        position: absolute;
        top: 1em;
        right: 1em;
        &.n-switch.n-switch--active .n-switch__rail {
          background-color: var(--primary);
        }
      }
      .update-service {
        position: absolute;
        bottom: 1em;
        right: 1em;
        &:hover {
          color: var(--secondary);
          transition: 0.1s ease-in;
        }
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
          font-size: 2em;
          color: var(--secondary);
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

@media screen and (max-width: 750px) {
  .service-card {
    width: 100% !important;
    margin: 0.5em !important;
  }
}
</style>
