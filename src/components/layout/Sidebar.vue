<template lang="">
  <div class="sidebar_wrapper">
    <div class="logo">
      <p>Apollo</p>
      <n-tag :bordered="false" :color="{ color: this.$colors.tertiary }"> Business </n-tag>
    </div>
    <n-button class="quick-action-booking-button" :color="this.$colors.primary" ghost @click="showAddEventDrawer = true">Add Booking</n-button>
    <nav class="nav-links">
      <RouterLink to="/dashboard" class="nav-link">
        <font-awesome-icon class="sidebar-icon" :icon="['fas', 'table-columns']" />
        Dashboard
      </RouterLink>
      <RouterLink to="/discover" class="nav-link">
        <font-awesome-icon class="sidebar-icon" :icon="['fas', 'magnifying-glass']" />
        Discover
      </RouterLink>
      <RouterLink to="/calendar" class="nav-link">
        <font-awesome-icon class="sidebar-icon" :icon="['fas', 'calendar']" />
        Calendar
      </RouterLink>
      <RouterLink to="/clients" class="nav-link">
        <font-awesome-icon class="sidebar-icon" :icon="['fas', 'users']" />
        Clients
      </RouterLink>
      <RouterLink to="/settings" class="nav-link">
        <font-awesome-icon class="sidebar-icon" :icon="['fas', 'gear']" />
        Settings
      </RouterLink>
    </nav>
    <div class="footer">
      <button @click="logOut" class="nav-link" role="button" aria-label="Log Out">
        <font-awesome-icon class="sidebar-icon" :icon="['fas', 'right-from-bracket']" />
        Log Out
      </button>
    </div>
    <add-event :show="showAddEventDrawer" :placement="'right'" @close="showAddEventDrawer = false" />
  </div>
</template>
<script>
import { supabase } from "../../lib/supabaseClient";
import { Search } from "@vicons/ionicons5";
import { NButton, NTag } from "naive-ui";
import AddEvent from "../modals/AddEvent.vue";

export default {
  components: { NButton, NTag, Search, AddEvent },
  data() {
    return {
      userData: {},
      showAddEventDrawer: false,
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
  min-width: 250px;
  background-color: var(--secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 0.5em;
  .logo {
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      font-size: 24px;
      color: var(--white);
      margin-right: 1em;
    }
  }
  .quick-action-booking-button {
    margin: 1em 0;
    padding: 1.25em;
    width: 75%;
    &:hover {
      background-color: var(--primary);
      color: var(--secondary);
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
      color: var(--white);
      background-color: none;
      .sidebar-icon {
        width: 1em;
        margin-right: 0.5em;
      }
      &.router-link-active,
      &:hover {
        background-color: var(--primary);
        color: var(--black);
        transition: 0.25s ease-in;
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
