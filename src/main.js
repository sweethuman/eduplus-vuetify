import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "./css/nprogress.css";
import "./css/gradients.css";
import "./css/utility.css";
import store from "./store";
import "./plugins";
import VueWait from "vue-wait";
import titleMixin from "./mixins/titleMixin";
import "./firebase";

Vue.config.productionTip = false;
Vue.mixin(titleMixin);
new Vue({
  router,
  store,
  render: h => h(App),
  wait: new VueWait({
    useVuex: true,
  }),
}).$mount("#app");
