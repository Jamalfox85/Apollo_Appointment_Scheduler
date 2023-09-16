<template lang="">
  <div class="clients_wrapper">
    <h1>Settings</h1>
    <!-- <n-form :model="model" size="medium" label-placement="top"> -->
    <h2>Account</h2>
    <n-form-item label="Name">
      <n-input v-model:value="name" type="text" />
    </n-form-item>
    <n-form-item label="Email">
      <n-input v-model:value="email" type="text" />
    </n-form-item>
    <n-form-item label="Phone">
      <n-input v-model:value="phone" type="text" />
    </n-form-item>
    <n-form-item label="Password">
      <n-button v-if="!changePassword" color="#654597" @click="changePassword = true">Change Password</n-button>
      <div v-else>
        <n-input v-model:value="password" type="password" />
        <n-button color="#654597" @click="changePassword = false">Cancel</n-button>
      </div>
    </n-form-item>
    <div class="business-section">
      <h2>Business</h2>
      <n-form-item label="Business Name">
        <n-input v-model:value="business_name" type="text" />
      </n-form-item>
    </div>
    <div class="availability-section">
      <h2>Availability</h2>
      <div class="day-buttons">
        <n-button class="day-button" v-for="(day, index) in availability.days" :color="'#654597'" :ghost="!day.open ? true : false" @click="toggleAvailability(index)">{{ index }}</n-button>
      </div>
      <n-input pair separator="-" v-model:value="availability.hours" clearable />
    </div>
    <n-button class="day-button" :color="'#654597'">Save Changes</n-button>

    <!-- </n-form> -->
  </div>
</template>
<script>
import { supabase } from "../lib/supabaseClient";
import { NForm, NFormItem, NInput, NButton, NTabs, NTabPane, NRadioGroup, NRadioButton } from "naive-ui";

export default {
  components: { NForm, NFormItem, NInput, NButton, NTabs, NTabPane, NRadioGroup, NRadioButton },
  data() {
    return {
      name: "Test",
      email: "testing@email.com",
      phone: "222-222-2222",
      changePassword: false,
      password: "jfkajfklsafjkls",
      business_name: "Business Name",
      placeholder: ["From", "To"],
      availability: {
        days: {
          monday: {
            open: true,
          },
          tuesday: {
            open: false,
          },
          wednesday: {
            open: false,
          },
          thursday: {
            open: true,
          },
          friday: {
            open: true,
          },
          saturday: {
            open: true,
          },
          sunday: {
            open: true,
          },
        },
        hours: ["8:30", "5:00"],
      },
    };
  },
  methods: {
    toggleAvailability(index) {
      this.availability[index].open = !this.availability[index].open;
    },
  },
};
</script>
<style lang="scss">
.clients_wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  overflow-y: scroll;
  .availability-section {
    margin-bottom: 1em;
    .day-buttons {
      margin-bottom: 1em;
      .day-button {
        margin-right: 0.5em;
      }
    }
  }
}
</style>
