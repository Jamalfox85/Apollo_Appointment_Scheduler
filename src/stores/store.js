import { supabase } from "../lib/supabaseClient";
import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    count: 0,
    authUserId: null,
    sessionData: {},
    userData: {},
    serviceData: [],
    eventData: [],
    clientData: [],
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
    getEventData(state) {
      return state.eventData;
    },
    getClientData(state) {
      return state.clientData;
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
    async setEventData() {
      const { data: events, error } = await supabase.from("events").select("");
      this.eventData = events;
    },
    async setClientData() {
      const { data: clients, error } = await supabase.from("clients").select("*").eq("business_id", this.authUserId);
      this.clientData = clients;
    },

    /* Add Data */
    async addService(serviceData) {
      serviceData.user_id = this.authUserId;
      serviceData.business_name = this.userData.business_name;
      const { data, error } = await supabase.from("services").insert([serviceData]).select();
    },
    async addEvent(eventData) {
      eventData.user_id = this.authUserId;
      const { data, error } = await supabase.from("events").insert([eventData]).select();
    },

    /* Update Data */
    async updateActiveState(service) {
      const { data, error } = await supabase.from("services").update({ active: service.active }).eq("id", service.id).select();
    },
    async updateService(service, serviceId) {
      const { data, error } = await supabase.from("services").update(service).eq("id", serviceId).select();
    },
    async updateEvent(event, eventId) {
      const { data, error } = await supabase.from("events").update(event).eq("id", eventId).select();
    },

    /* Delete Data */
    async deleteService(serviceId) {
      const { error } = await supabase.from("services").delete().eq("id", serviceId);
    },
    async deleteEvent(eventId) {
      const { error } = await supabase.from("events").delete().eq("id", eventId);
    },
  },
});
