<template lang="">
  <div class="sidebar_wrapper">
    <div class="logo">
      <p>Apollo</p>
    </div>
    <nav class="nav-links">
      <RouterLink to="/dashboard" class="nav-link">
        <img src="../../assets/icons/dashboard-icon.svg" class="sidebar-icon" />
        Dashboard
      </RouterLink>
      <RouterLink to="/calendar" class="nav-link">
        <img src="../../assets/icons/calendar-icon.svg" class="sidebar-icon" />
        Calendar
      </RouterLink>
      <RouterLink to="/clients" class="nav-link">
        <img src="../../assets/icons/clients-icon.svg" class="sidebar-icon" />
        Clients
      </RouterLink>
      <RouterLink to="/settings" class="nav-link">
        <img src="../../assets/icons/settings-icon.svg" class="sidebar-icon" />
        Settings
      </RouterLink>
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

export default {
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
.sidebar_wrapper {
  height: 100%;
  width: 275px;
  background-color: #222a68;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  .logo {
    width: 100%;
    height: 90px;
    margin-bottom: 2em;
    p {
      font-size: 24px;
      color: #f8f4f9;
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
      border-radius: 12px;
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
