<template>
  <v-app>
    <v-toolbar
      app
      scroll-off-screen
      class="orange-gradient-background elevation-12"
      dark
    >
      <v-toolbar-side-icon href="/" fab>
        <img src="./assets/home-small.png" alt="logo" style="height:26px" />
      </v-toolbar-side-icon>
      <v-toolbar-items>
        <v-btn to="/" flat> <v-icon left>mdi-home-outline</v-icon>Home </v-btn>
        <v-btn flat @click="snackbar = true">
          <v-icon left>mdi-book-outline</v-icon>Lessons
        </v-btn>
        <v-btn flat @click="snackbar = true">
          <v-icon left>mdi-trophy-variant-outline</v-icon>Badges
        </v-btn>
        <v-btn to="/about" flat>
          <v-icon left>mdi-information-outline</v-icon>About
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn
        class="orange-gradient-background"
        flat
        large
        @click="snackbar = true"
      >
        <v-icon left>mdi-account-outline</v-icon>Account
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
    <v-footer dark height="auto" absolute app>
      <v-card
        class="flex"
        style="background: linear-gradient(to left, #ffd86f, #fc6262)"
        flat
        tile
      >
        <v-card-actions class="justify-center">
          <span class="subheading">
            &copy;2019 — <strong>EDU+</strong> by Avram Gheorghe and Vlad
            Schiller
          </span>
        </v-card-actions>
      </v-card>
    </v-footer>
    <v-snackbar v-model="snackbar" color="error" timeout="5000">
      <span class="font-weight-bold"> PAGE NOT AVAILABLE!</span>
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      snackbar: false
    };
  }
};
</script>

<style></style>
