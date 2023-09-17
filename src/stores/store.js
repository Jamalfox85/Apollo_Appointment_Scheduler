import { supabase } from "../lib/supabaseClient";
import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    count: 0,
    authUserId: null,
    sessionData: {},
    userData: {},
    serviceData: {},
  }),
  getters: {
    getSession(state) {
      return state.sessionData;
    },
    getUserData(state) {
      return state.userData;
    },
    getServiceData(state) {
      return state.serviceData;
    },
  },
  actions: {
    /* Set Data */
    async setSession() {
      const { data: session, error: authError } = await supabase.auth.getSession();
      this.sessionData = session.session;
      this.authUserId = session.session.user.id;
    },
    async setUserData() {
      const { data: users, error } = await supabase.from("users").select("*").eq("user_id", this.authUserId);
      this.userData = users[0];
    },
    async setServiceData() {
      const { data: services, error } = await supabase.from("services").select("*").eq("user_id", this.authUserId);
      this.serviceData = services;
    },

    /* Add Data */
    async addService(serviceData) {
      serviceData.user_id = this.authUserId;
      serviceData.business_name = this.userData.business_name;
      const { data, error } = await supabase.from("services").insert([serviceData]).select();
    },

    /* Update Data */
    async updateActiveState(service) {
      const { data, error } = await supabase.from("services").update({ active: service.active }).eq("id", service.id).select();
    },
    async updateService(service, serviceId) {
      const { data, error } = await supabase.from("services").update(service).eq("id", serviceId).select();
    },

    /* Delete Data */
    async deleteService(serviceId) {
      const { error } = await supabase.from("services").delete().eq("id", serviceId);
    },
  },
});
