<template lang="">
  <div class="sidebar_wrapper">
    <div class="logo">
      <p>Apollo</p>
      <n-tag v-if="userData?.account_type === 2" :bordered="false" type="warning"> Business </n-tag>
      <n-tag v-else :bordered="false" type="success"> Customer </n-tag>
    </div>
    <nav class="nav-links">
      <RouterLink to="/dashboard" class="nav-link">
        <img src="../../assets/icons/dashboard-icon.svg" class="sidebar-icon" />
        Dashboard
      </RouterLink>
      <!-- Change This To Be Custoemr Only -- userData?.account_type === 1 -->
      <RouterLink to="/discover" class="nav-link" v-if="userData?.account_type === 1">
        <Search style="width: 1em; margin-right: 0.5em" />
        Discover
      </RouterLink>
      <RouterLink to="/calendar" class="nav-link" v-if="userData?.account_type === 2">
        <img src="../../assets/icons/calendar-icon.svg" class="sidebar-icon" />
        Calendar
      </RouterLink>
      <RouterLink to="/clients" class="nav-link" v-if="userData?.account_type === 2">
        <img src="../../assets/icons/clients-icon.svg" class="sidebar-icon" />
        Clients
      </RouterLink>
      <!-- <RouterLink to="/settings" class="nav-link">
        <img src="../../assets/icons/settings-icon.svg" class="sidebar-icon" />
        Settings
      </RouterLink> -->
    </nav>
    <div class="footer">
      <button @click="logOut" class="nav-link" role="button" aria-label="Log Out">
        <img src="../../assets/icons/logout-icon.svg" class="sidebar-icon" />
        Log Out
      </button>
    </div>
  </div>
</template>
<script>
import { supabase } from "../../lib/supabaseClient";
import { Search } from "@vicons/ionicons5";
import { NTag } from "naive-ui";
export default {
  components: { NTag, Search },
  data() {
    return {
      userData: {},
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
  async mounted() {
    const { data: authData, error: authError } = await supabase.auth.getSession();
    let authUserId = authData.session.user.id;
    let { data, error } = await supabase.from("users").select("*").eq("user_id", authUserId);
    this.userData = data[0];
  },
};
</script>
<style lang="scss">
.sidebar_wrapper {
  height: 100%;
  width: 275px;
  background-color: #222a68;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 0.5em;
  .logo {
    width: 100%;
    height: 90px;
    margin-bottom: 2em;
    margin-left: 2em;
    display: flex;
    align-items: center;
    p {
      font-size: 24px;
      color: #f8f4f9;
      margin-right: 1em;
    }
  }
  .nav-links,
  .footer {
    width: 100%;
    .nav-link {
      display: block;
      font-size: 18px;
      margin-bottom: 0.75em;
      display: flex;
      align-items: center;
      cursor: pointer;
      text-decoration: none;
      padding: 0.5em;
      border-radius: 4px;
      color: #f8f4f9;
      background-color: none;
      .sidebar-icon {
        width: 1em;
        margin-right: 0.5em;
      }
      &.router-link-active {
        background-color: #945fbf;
        transition: 0.15s ease-in;
      }
    }
  }
  .footer {
    width: 100%;
    height: 120px;
    margin-top: auto;
    button {
      background-color: transparent;
      outline: none;
      border: none;
    }
  }
}
</style>
