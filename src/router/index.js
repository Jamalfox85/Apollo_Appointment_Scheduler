import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import SignUpView from "../views/SignUpView.vue";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import DashboardView_Customer from "../views/DashboardView_Customer.vue";
import DiscoverView_Customer from "../views/DiscoverView_Customer.vue";
import ClientsView from "../views/ClientsView.vue";
import Calendarview from "../views/Calendarview.vue";
import SettingsView from "../views/SettingsView.vue";
import { supabase } from "../lib/supabaseClient";

const authUserId = ref();
const accountType = ref(2);

const { data: authData, error: authError } = await supabase.auth.getSession();
if (authData.session) {
  authUserId.value = authData.session.user.id;
  let { data, error } = await supabase.from("users").select("*").eq("user_id", authUserId.value);
  let userData = data[0];
  accountType.value = userData.account_type;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: accountType.value === 2 ? DashboardView : DashboardView_Customer,
    },
    {
      path: "/discover",
      name: "discover",
      component: DiscoverView_Customer,
    },
    {
      path: "/clients",
      name: "clients",
      component: ClientsView,
    },
    {
      path: "/calendar",
      name: "calendar",
      component: Calendarview,
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  const { data, error } = await supabase.auth.getSession();
  if (!data.session && to.name !== "login") {
    return { name: "login" };
  }
});

export default router;
