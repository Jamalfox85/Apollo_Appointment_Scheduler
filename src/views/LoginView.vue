<template lang="">
  <div class="login_wrapper">
    <div class="login-sidepanel">
      <p class="logo">Apollo</p>
      <div class="main-text">
        <h1>We handle the bookings...</h1>
        <h2>...so you can focus on your clients.</h2>
      </div>
      <div class="reviews"></div>
    </div>
    <div class="form-panel">
      <h1>Log In Here</h1>
      <form class="login-form" aria-label="Log In to Apollo Appointment Scheduler" @submit.prevent="logIn">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" v-model="email" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" v-model="password" required />
        </div>

        <button class="submit-bttn" type="submit">Log In</button>
      </form>
    </div>
  </div>
</template>
<script>
import { supabase } from "../lib/supabaseClient";

export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async logIn() {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password,
      });
      if (data.session) {
        this.$router.push("/dashboard");
      }
    },
  },
};
</script>
<style lang="scss">
.login_wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  .login-sidepanel {
    background-color: #ab81cd;
    margin: 1em;
    padding: 2em;
    border-radius: 1em;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    max-width: 35%;
    flex-grow: 1;
    .logo {
      position: absolute;
      top: 0;
      left: 0;
      margin: 1em;
      font-size: 24px;
    }
    .main-text {
      display: flex;
      flex-direction: column;
      margin-top: 25%;
      h1 {
        font-size: 48px;
        margin-bottom: 8px;
      }
      h2 {
        font-size: 24px;
        display: inline-block;
        align-self: flex-end;
      }
    }
    .reviews {
      background-color: #654597;
      border-radius: 0.5em;
      height: 200px;
      width: 85%;
      position: absolute;
      bottom: 10%;
    }
  }
  .form-panel {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4em;
    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      .form-group {
        font-size: 18px;
        margin-top: 1em;
        label {
          display: block;
        }
      }
      .submit-bttn {
        margin-top: 2em;
        width: fit-content;
        padding: 0.5em 1em;
        background-color: #ab81cd;
        outline: none;
        border: none;
        border-radius: 8px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        &:hover {
          background-color: #9f66cd;
          transition: 0.1s ease-in;
        }
      }
    }
  }
}
</style>
