import { createApp } from "vue";
import App from "./App.vue";
import VueApexCharts from "vue3-apexcharts";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"

import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.bundle.js"

const app = createApp(App);
app.use(VueApexCharts);

app.mount("#app");



