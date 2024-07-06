import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import "./index.css";
import "vue-loading-overlay/dist/css/index.css";

createApp(App).use(VueQueryPlugin).mount("#app");
