import { supabase } from "../lib/supabaseClient";
import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    count: 0,
    authUserId: null,
    sessionData: {},
    userData: {},
  }),
  getters: {
    getSession(state) {
      return state.sessionData;
    },
    getUserData(state) {
      return state.userData;
    },
  },
  actions: {
    async setSession() {
      const { data: session, error: authError } = await supabase.auth.getSession();
      this.sessionData = session.session;
      this.authUserId = session.session.user.id;
    },
    async setUserData() {
      let { data: users, error } = await supabase.from("users").select("*");
      this.userData = users;
      return users;
    },
  },
});
