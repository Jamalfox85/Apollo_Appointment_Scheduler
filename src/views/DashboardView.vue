<template>
  <main class="dashboard_wrapper">
    <!-- <h1>Account Page</h1>
    <div v-if="userData">
      <p>First Name: {{ userData.user_metadata.first_name }}</p>
      <p>Last Name: {{ userData.user_metadata.last_name }}</p>
      <p>Email: {{ userData.email }}</p>
    </div>
    <button @click="logOut">Log Out</button> -->
    <div class="dashboard-left">
      <Topbar />
      <Services />
      <Forecast />
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
import Schedule from "../components/dashboard/Schedule.vue";

export default {
  components: { Topbar, Services, Forecast, Schedule },
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
    console.log("SESSION DATA: ", data);
  },
};
</script>

<style lang="scss">
.dashboard_wrapper {
  height: 100vh;
  width: 100%;
  border: solid 2px red;
  display: flex;
  overflow-y: scroll;
  & > * {
    height: 100%;
  }
  .dashboard-left {
    border: solid 4px purple;
    width: 70%;
  }
  .dashboard-right {
    border: solid 4px green;
    flex-grow: 1;
  }
}
</style>
