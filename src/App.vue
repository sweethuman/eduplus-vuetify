<template>
  <v-app>
    <v-navigation-drawer fixed v-model="drawer" app temporary v-if="this.$vuetify.breakpoint.smAndDown">
      <v-list>
        <v-list-tile to="/" ripple>
          <v-list-tile-action>
            <v-icon>{{ iconPath("/", "mdi-home") }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="snackbar = true" ripple>
          <v-list-tile-action>
            <v-icon>mdi-book-outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Lessons</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="snackbar = true" ripple>
          <v-list-tile-action>
            <v-icon>mdi-trophy-variant-outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Badges</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/about" ripple>
          <v-list-tile-action>
            <v-icon>{{ iconPath("/about", "mdi-information") }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app scroll-off-screen :scroll-threshold="200" class="orange-gradient elevation-12" dark>
      <v-toolbar-side-icon
        @click.stop="drawer = !drawer"
        v-if="this.$vuetify.breakpoint.smAndDown"
      ></v-toolbar-side-icon>
      <v-toolbar-side-icon href="/" fab>
        <img src="./assets/home-small.png" alt="logo" style="height:44px" />
      </v-toolbar-side-icon>
      <v-toolbar-items v-if="this.$vuetify.breakpoint.mdAndUp">
        <v-btn to="/" flat>
          <v-icon left>{{ iconPath("/", "mdi-home") }}</v-icon
          >Home
        </v-btn>
        <v-btn flat @click="snackbar = true"> <v-icon left>mdi-book-outline</v-icon>Lessons </v-btn>
        <v-btn flat @click="snackbar = true"> <v-icon left>mdi-trophy-variant-outline</v-icon>Badges </v-btn>
        <v-btn to="/about" flat>
          <v-icon left>{{ iconPath("/about", "mdi-information") }}</v-icon
          >About
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <account-dialog />
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
    <v-footer dark height="auto" absolute app>
      <v-card class="flex peach-gradient-reversed" flat tile>
        <v-card-actions class="justify-center">
          <span class="subheading"> &copy;2019 — <strong>EDU+</strong> by Avram Gheorghe and Vlad Schiller </span>
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
      drawer: null,
    };
  },
  methods: {
    iconPath: function(path, baseIconName) {
      return path === this.$route.path ? baseIconName : baseIconName + "-outline";
    },
  },
};
</script>
