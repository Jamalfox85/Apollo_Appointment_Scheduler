<template>
  <main class="dashboard_wrapper">
    <div class="dashboard-left">
      <Topbar class="topbar" />
      <Services class="services" />
      <Forecast class="forecast" />
      <Clients class="clients" />
    </div>
    <div class="dashboard-right">
      <Schedule />
    </div>
  </main>
</template>

<script>
import { supabase } from "../lib/supabaseClient";

import Topbar from "../components/dashboard/Topbar.vue";
import Services from "../components/dashboard/Services.vue";
import Forecast from "../components/dashboard/Forecast.vue";
import Clients from "../components/dashboard/Clients.vue";
import Schedule from "../components/dashboard/Schedule.vue";

export default {
  components: { Topbar, Services, Forecast, Clients, Schedule },
  data() {
    return {
      userData: null,
    };
  },
  methods: {
    async logOut() {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        this.$router.push("/login");
      }
    },
  },
  async created() {
    const { data, error } = await supabase.auth.getSession();
    this.userData = data.session.user;
    // console.log("SESSION DATA: ", data);
  },
};
</script>

<style lang="scss">
.dashboard_wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  overflow-y: scroll;
  padding: 0.5em;
  & > * {
    height: 100%;
    margin: 0 0.25em;
  }
  .dashboard-left {
    width: 70%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    & > * {
      h1 {
        font-size: 1.25em;
      }
      background-color: #574ae210;
      border-radius: 8px;
      margin: 4px;
    }
    .topbar {
      width: 100%;
    }
    .services {
      width: 100%;
    }
    .forecast {
      width: 35%;
    }
    .clients {
      width: 62.5%;
    }
  }
  .dashboard-right {
    flex-grow: 1;
    background-color: #574ae210;
    border-radius: 8px;
    & > * {
      h1 {
        font-size: 1.25em;
      }
      margin: 4px;
    }
  }
}
</style>
