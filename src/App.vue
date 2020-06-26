<template>
  <v-app>
    <Toolbar />
    <!-- <v-toolbar dark class="primary" absolute style="top: 65%;left: 50%;">
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">DevMeetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in itemMenu" :key="item.title" :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>-->
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  components: { Toolbar }
};
</script>
 
