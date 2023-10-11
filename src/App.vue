<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import { supabase } from "./lib/supabaseClient";
import { ModalsContainer } from "vue-final-modal";
import { useStore } from "./stores/store";
import { createDiscreteApi } from "naive-ui";

const store = useStore();
const userIsAuthenticated = ref(false);

const { message } = createDiscreteApi(["message"]);
window.$message = message;

onMounted(async () => {
  await store.setSession();
  await store.setUserData();
  await store.setServiceData();
  await store.setEventData();
  await store.setClientData();
  let authenticated = store.getSession;
  if (authenticated) {
    userIsAuthenticated.value = true;
  }
  // console.log("authenticated: a", authenticated);
});
</script>

<template>
  <div class="app_wrapper" :is="$route.meta.layout || 'div'">
    <!-- <Sidebar v-if="userIsAuthenticated" /> -->
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
