import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import SignUpView from "../views/SignUpView.vue";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import DashboardView_Customer from "../views/DashboardView_Customer.vue";
import DiscoverView_Customer from "../views/DiscoverView_Customer.vue";
import ClientsView from "../views/ClientsView.vue";
import CalendarView from "../views/CalendarView.vue";
import SettingsView from "../views/SettingsView.vue";
import { supabase } from "../lib/supabaseClient";

import BusinessLayout from "../layouts/Business.vue";
import CustomerLayout from "../layouts/Customer.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // All Users
    {
      path: "/signup",
      name: "Sign Up",
      component: SignUpView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    // Business Routes
    {
      path: "/",
      name: "layout",
      component: BusinessLayout,
      children: [
        {
          path: "/dashboard",
          name: "Dashboard",
          component: DashboardView,
        },
        {
          path: "/discover",
          name: "Discover",
          component: DiscoverView_Customer,
        },
        {
          path: "/clients",
          name: "Clients",
          component: ClientsView,
        },
        {
          path: "/calendar",
          name: "Calendar",
          component: CalendarView,
        },
        {
          path: "/settings",
          name: "Settings",
          component: SettingsView,
        },
      ],
    },
    // Customer Routes
    // {
    //   path: "/cx",
    //   name: "layout",
    //   component: CustomerLayout,
    //   children: [
    //     {
    //       path: "/discover",
    //       name: "discover",
    //       component: DiscoverView_Customer,
    //     },
    //   ],
    // },
  ],
});

router.beforeEach(async (to, from) => {
  const { data, error } = await supabase.auth.getSession();
  if (!data.session && to.name !== "Login") {
    return { name: "Login" };
  }
});

export default router;
