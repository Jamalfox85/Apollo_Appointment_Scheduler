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
      this.setServiceData;
      this.serviceData.push(data[0]);
    },
    async addEvent(eventData) {
      eventData.user_id = this.authUserId;
      const { data, error } = await supabase.from("events").insert([eventData]).select();
      this.setEventData;
      this.eventData.push(data[0]);
    },
    async addClient(clientData) {
      clientData.business_id = this.authUserId;
      const { data, error } = await supabase.from("clients").insert([clientData]).select();
      this.setClientData;
      this.clientData.push(data[0]);
    },

    /* Update Data */
    async updateActiveState(service) {
      const { data, error } = await supabase.from("services").update({ active: service.active }).eq("id", service.id).select();
      this.setServiceData;
    },
    async updateService(service, serviceId) {
      const { data, error } = await supabase.from("services").update(service).eq("id", serviceId).select();
      this.setServiceData;
    },
    async updateEvent(event, eventId) {
      const { data, error } = await supabase.from("events").update(event).eq("id", eventId).select();
      this.setEventData;
    },

    /* Delete Data */
    async deleteService(serviceId) {
      const { error } = await supabase.from("services").delete().eq("id", serviceId);
      this.setServiceData(
        this.serviceData.filter((service) => {
          service.id !== serviceId;
        })
      );
    },
    async deleteEvent(eventId) {
      const { error } = await supabase.from("events").delete().eq("id", eventId);
      this.setEventData(
        this.eventData.filter((event) => {
          event.id !== eventId;
        })
      );
    },
    async deleteClient(clientId) {
      const { error } = await supabase.from("clients").delete().eq("id", clientId);
      this.setClientData(
        this.clientData.filter((client) => {
          client.id !== clientId;
        })
      );
    },
  },
});
