<template>
  <main class="dashboard_wrapper">
    <div class="dashboard-row">
      <quick-stats />
    </div>
    <div class="dashboard-row">
      <Services class="services" />
      <Schedule class="schedule" />
    </div>
    <div class="dashboard-row">
      <Clients class="clients" />
      <img class="dashboard-graphic" src="../assets/images/well-done.png" />
    </div>
  </main>
</template>

<script>
import { supabase } from "../lib/supabaseClient";
import QuickStats from "../components/dashboard/QuickStats.vue";
import Services from "../components/dashboard/Services.vue";
import Forecast from "../components/dashboard/Forecast.vue";
import Clients from "../components/dashboard/Clients.vue";
import Schedule from "../components/dashboard/Schedule.vue";

export default {
  components: { QuickStats, Services, Forecast, Clients, Schedule },
  data() {
    return {};
  },
  methods: {
    async logOut() {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="scss">
.dashboard_wrapper {
  min-height: 100vh;
  width: 100%;
  padding: 0.5em;
  & > * {
    margin: 0.5em;
  }
  .dashboard-row {
    display: flex;
    margin-bottom: 1em;
    height: fit-content;
    width: 100%;
    & > * {
      width: 100%;
      padding: 0.5em;
    }
    .clients {
      flex-grow: 1;
    }
    .dashboard-graphic {
      width: 30%;
    }
  }
}

@media screen and (max-width: 1100px) {
  .dashboard_wrapper {
    flex-direction: column;
    .dashboard-left {
      width: 100%;
      margin-bottom: 0.5em;
    }
  }
}
</style>
