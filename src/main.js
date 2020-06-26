import Vue from "vue";
import "../node_modules/vuetify/dist/vuetify.min.css";
import * as firebase from "firebase";

import Vuetify from "vuetify";
import App from "./App";
import routes from "./router/index.js";
import { store } from "./store/store.js";

Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  vuetify: new Vuetify(),

  el: "#app",
  store,
  render: (h) => h(App),
  router: routes,
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyAgmbUOCLPBhFgqP1LnAXkObQGzOBtPNDA",
      authDomain: "authpro-48cfb.firebaseapp.com",
      databaseURL: "https://authpro-48cfb.firebaseio.com",
      projectId: "authpro-48cfb",
      storageBucket: "authpro-48cfb.appspot.com",
      messagingSenderId: "768917197094",
      appId: "1:768917197094:web:6f10aef3f99300ff36b1e7",
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("autoLoad", user);
      }
    });
  },
});
