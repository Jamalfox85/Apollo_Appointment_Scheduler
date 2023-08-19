<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import { supabase } from "./lib/supabaseClient";
import { ModalsContainer } from "vue-final-modal";

import Sidebar from "./components/layout/Sidebar.vue";

const userIsAuthenticated = ref(false);

async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (data.session) {
    userIsAuthenticated.value = true;
  }
}

onMounted(() => {
  getSession();
});
</script>

<template>
  <div class="app_wrapper">
    <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>

    </div>
  </header> -->
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
