<template>
  <v-app>
    <v-toolbar app scroll-off-screen class="orange-gradient elevation-12" dark>
      <v-toolbar-side-icon href="/" fab>
        <img src="./assets/home-small.png" alt="logo" style="height:26px" />
      </v-toolbar-side-icon>
      <v-toolbar-items>
        <v-btn to="/" flat>
          <v-icon left>{{ iconPath("/", "mdi-home") }}</v-icon
          >Home
        </v-btn>
        <v-btn flat @click="snackbar = true">
          <v-icon left>mdi-book-outline</v-icon>Lessons
        </v-btn>
        <v-btn flat @click="snackbar = true">
          <v-icon left>mdi-trophy-variant-outline</v-icon>Badges
        </v-btn>
        <v-btn to="/about" flat>
          <v-icon left>{{ iconPath("/about", "mdi-information") }}</v-icon
          >About
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <AccountDialog />
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
    <v-footer dark height="auto" absolute app>
      <v-card class="flex peach-gradient-reversed" flat tile>
        <v-card-actions class="justify-center">
          <span class="subheading">
            &copy;2019 — <strong>EDU+</strong> by Avram Gheorghe and Vlad
            Schiller
          </span>
        </v-card-actions>
      </v-card>
    </v-footer>
    <v-snackbar v-model="snackbar" color="error" :timeout="5000">
      <span class="font-weight-bold"> PAGE NOT AVAILABLE!</span>
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import AccountDialog from "./components/AccountDialog";

export default {
  name: "App",
  components: { AccountDialog },
  data() {
    return {
      snackbar: false,
      dialog: false
    };
  },
  methods: {
    iconPath: function(path, baseIconName) {
      return path === this.$route.path
        ? baseIconName
        : baseIconName + "-outline";
    }
  }
};
</script>
