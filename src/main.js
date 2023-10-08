import "./assets/main.css";
import "vue-final-modal/style.css";

import { createApp } from "vue";
import { createVfm } from "vue-final-modal";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { defaultThemeColors } from "./configs/colors";
import App from "./App.vue";
import router from "./router";

library.add(fab);
library.add(fas);
library.add(far);

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);
const pinia = createPinia();
const vfm = createVfm();

app.use(router);
app.use(pinia);
app.use(vfm);

app.config.globalProperties.$colors = defaultThemeColors;

app.mount("#app");
