<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import { supabase } from "./lib/supabaseClient";
import { ModalsContainer } from "vue-final-modal";

import Sidebar from "./components/layout/Sidebar.vue";

import { useStore } from "./stores/store";
const store = useStore();
const userIsAuthenticated = ref(store.getSession ? true : false);

onMounted(async () => {
  await store.setSession();
  await store.setUserData();
  await store.setServiceData();
  await store.setEventData();
  await store.setClientData();
});
</script>

<template>
  <div class="app_wrapper" :is="$route.meta.layout || 'div'">
    <Sidebar v-if="userIsAuthenticated" />
    <RouterView />
    <ModalsContainer />
  </div>
</template>

<style scoped lang="scss">
.app_wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
}
</style>
