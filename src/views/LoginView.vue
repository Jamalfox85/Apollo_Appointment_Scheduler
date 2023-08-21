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
      <n-tabs class="card-tabs" default-value="signup" size="large" animated pane-wrapper-style="margin: 0 -4px" pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
        <n-tab-pane name="login" tab="Log In">
          <n-form :model="model" size="medium" label-placement="top">
            <n-form-item label="Email" path="email">
              <n-input v-model:value="model.email" placeholder="Email" />
            </n-form-item>
            <n-form-item label="Password" path="password">
              <n-input v-model:value="model.password" placeholder="Password" />
            </n-form-item>
          </n-form>
          <n-button color="#654597" @click="logIn">Log In</n-button>
        </n-tab-pane>
        <n-tab-pane name="signup" tab="Sign Up">
          <n-form :model="model" size="medium" label-placement="top">
            <n-form-item label="First Name" path="options/first_name">
              <n-input v-model:value="model.options.first_name" placeholder="First Name" />
            </n-form-item>
            <n-form-item label="Last Name" path="options/last_name">
              <n-input v-model:value="model.options.last_name" placeholder="Last Name" />
            </n-form-item>
            <n-form-item label="Account Type" path="options/account_type">
              <n-radio-group v-model:value="model.options.account_type" name="left-size" style="margin-bottom: 12px">
                <n-radio-button :value="1"> Customer </n-radio-button>
                <n-radio-button :value="2"> Business </n-radio-button>
              </n-radio-group>
            </n-form-item>
            <n-form-item v-if="model.options.account_type === 2" label="Business Name" path="options/business_name">
              <n-input v-model:value="model.options.business_name" placeholder="Business Name" />
            </n-form-item>
            <n-form-item label="Email" path="email">
              <n-input v-model:value="model.email" placeholder="Email" />
            </n-form-item>
            <n-form-item label="Password" path="password">
              <n-input v-model:value="model.password" placeholder="Password" />
            </n-form-item>
          </n-form>
          <n-button color="#654597" @click="signUp">Sign Up</n-button>
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>
<script>
import { supabase } from "../lib/supabaseClient";
import { NForm, NFormItem, NInput, NButton, NTabs, NTabPane, NRadioGroup, NRadioButton } from "naive-ui";
export default {
  components: { NForm, NFormItem, NInput, NButton, NTabs, NTabPane, NRadioGroup, NRadioButton },
  data() {
    return {
      model: {
        email: null,
        password: null,
        options: {
          first_name: null,
          last_name: null,
          business_name: null,
          account_type: null,
        },
      },
    };
  },
  methods: {
    async logIn() {
      let credentials = this.model;
      const { data, error } = await supabase.auth.signInWithPassword(credentials);
      if (data.session) {
        this.$router.push("/dashboard");
      }
    },
    async signUp() {
      let credentials = this.model;
      const { data, error } = await supabase.auth.signUp(credentials);

      let newUserData = {
        user_id: data.user.id,
        first_name: this.model.options.first_name,
        last_name: this.model.options.last_name,
        business_name: this.model.options.business_name,
        account_type: this.model.options.account_type,
      };
      const { data: userData, error: userError } = await supabase.from("users").insert([newUserData]).select();

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
    .header {
      margin-bottom: 1em;
    }
    .dont-have-account {
      margin-top: 1em;
      .sign-up-link {
        text-decoration: underline;
        color: #ab81cd;
        cursor: pointer;
        &:hover {
          color: #9961c7;
        }
      }
    }
  }
}
</style>
