<template>
  <main class="cx_dashboard_wrapper">
    <div class="cx_dashboard-left">
      <Events />
    </div>
    <div class="cx_dashboard-right"></div>
  </main>
</template>

<script>
import { supabase } from "../lib/supabaseClient";

import Events from "../components/dashboard/Events.vue";

export default {
  components: { Events },
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
.cx_dashboard_wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  overflow-y: scroll;
  & > * {
    height: 100%;
    margin: 0.5em;
  }
  .cx_dashboard-left {
    // flex-grow: 1;
    width: 100%;
  }
  .cx_dashboard-right {
    // width: 70%;
  }
}
</style>
