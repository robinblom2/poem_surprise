import { createApp } from "vue";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

library.add(faHeartSolid, faHeartReg);

app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
