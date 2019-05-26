<template>
  <v-app :dark="darkTheme">
    <v-navigation-drawer v-if="this.$vuetify.breakpoint.smAndDown" v-model="drawer" fixed app temporary>
      <v-list>
        <v-list-tile to="/" ripple>
          <v-list-tile-action>
            <v-icon>{{ iconPath("/", "mdi-home") }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Acasa</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile ripple to="/disciplines">
          <v-list-tile-action>
            <v-icon>{{ iconPath("/disciplines", "mdi-book") }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Discipline</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile ripple @click="snackbar = true">
          <v-list-tile-action>
            <v-icon>mdi-trophy-variant-outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Ultimele Lectii</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/about" ripple>
          <v-list-tile-action>
            <v-icon>{{ iconPath("/about", "mdi-information") }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Despre</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>mdi-weather-night</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ darkSwitchLabel }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action style="min-width: 0; margin-right: -5%;">
            <v-switch v-model="darkTheme" color="primary"></v-switch>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app scroll-off-screen :scroll-threshold="200" class="orange-gradient elevation-12" dark>
      <v-toolbar-side-icon
        v-if="this.$vuetify.breakpoint.smAndDown"
        @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-side-icon href="/" fab>
        <img src="./assets/home-small.png" alt="logo" style="height:44px" />
      </v-toolbar-side-icon>
      <v-toolbar-items v-if="this.$vuetify.breakpoint.mdAndUp">
        <v-btn to="/" flat>
          <v-icon left>{{ iconPath("/", "mdi-home") }}</v-icon>
          Acasa
        </v-btn>
        <v-btn flat to="/disciplines">
          <v-icon left>{{ iconPath("/disciplines", "mdi-book") }}</v-icon>
          Discipline
        </v-btn>
        <v-btn flat @click="snackbar = true">
          <v-icon left>mdi-trophy-variant-outline</v-icon>
          Ultimele Lectii
        </v-btn>
        <v-btn to="/about" flat>
          <v-icon left>{{ iconPath("/about", "mdi-information") }}</v-icon>
          Despre
        </v-btn>
        <v-btn flat @click="darkTheme = !darkTheme">
          <v-icon left>{{ darkTheme ? "mdi-brightness-3" : "mdi-white-balance-sunny" }}</v-icon>
          {{ darkSwitchLabel }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <account-dialog />
    </v-toolbar>

    <v-content class="mb-4">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-content>
    <v-footer dark absolute app>
      <v-card class="flex peach-gradient-reversed" flat>
        <v-card-actions class="justify-center">
          <span class="subheading">
            Versiunea
            <strong>0.2.3 Alpha</strong>
          </span>
          <span class="mx-2">—</span>
          <span class="subheading">
            &copy;2019 —
            <strong>EDU+</strong>
            de Avram Gheorghe and Vlad Schiller
          </span>
        </v-card-actions>
      </v-card>
    </v-footer>
    <v-snackbar v-model="snackbar" color="error" :timeout="5000">
      <span class="font-weight-bold">Pagina nu este disponibila!</span>
    </v-snackbar>
    <error-snackbar />
    <new-update-dialog />
  </v-app>
</template>

<script>
import AccountDialog from "./components/AccountDialog";
import ErrorSnackbar from "./components/ErrorSnackbar";
import NewUpdateDialog from "./components/NewUpdateDialog";

export default {
  name: "App",
  components: { AccountDialog, ErrorSnackbar, NewUpdateDialog },
  data() {
    return {
      snackbar: false,
      drawer: null,
      darkTheme: false,
    };
  },
  computed: {
    darkSwitchLabel() {
      return this.darkTheme ? "Switch to Light Theme" : "Switch to Dark Theme";
    },
  },
  watch: {
    "$wait.any": function(newValue) {
      // eslint-disable-next-line no-undef
      if (newValue === true) NProgress.start();
      // eslint-disable-next-line no-undef
      else NProgress.done();
    },
  },
  beforeCreate() {
    // eslint-disable-next-line no-undef
    NProgress.configure({ easing: "ease-out", speed: 1000, trickleSpeed: 500 });
  },
  methods: {
    iconPath: function(path, baseIconName) {
      return path === this.$route.path ? baseIconName : baseIconName + "-outline";
    },
  },
};
</script>
