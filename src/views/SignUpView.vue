<template lang="">
  <div>
    <h1>Sign Up Here</h1>
    <form aria-label="Sign Up for Apollo Appointment Scheduler" @submit.prevent="signUp">
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" name="first name" v-model="firstName" required />

      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" name="last name" v-model="lastName" required />

      <label for="businessName">Business Name</label>
      <input type="text" id="businessName" name="business name" v-model="businessName" />

      <label for="email">Email</label>
      <input type="email" id="email" name="email" v-model="email" required />

      <label for="password">Password</label>
      <input type="password" id="password" name="password" v-model="password" required />
      <!-- Add password rules and error display states -->

      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>
<script>
import { supabase } from "../lib/supabaseClient";
export default {
  data() {
    return {
      firstName: null,
      lastName: null,
      businessName: null,
      email: null,
      password: null,
    };
  },
  methods: {
    async signUp() {
      const { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
        options: {
          data: {
            first_name: this.firstName,
            last_name: this.lastName,
            business_name: this.businessName,
          },
        },
      });
      if (data.session) {
        this.$router.push("/dashboard");
      }
    },
  },
};
</script>
<style lang=""></style>
