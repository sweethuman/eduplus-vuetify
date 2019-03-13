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
        <v-btn flat> <v-icon left>mdi-book-outline</v-icon>Lessons </v-btn>
        <v-btn flat>
          <v-icon left>mdi-trophy-variant-outline</v-icon>Badges
        </v-btn>
        <v-btn to="/about" flat>
          <v-icon left>mdi-information-outline</v-icon>About
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn class="orange-gradient-background" flat large>
        <v-icon left>mdi-account-outline</v-icon>Account
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      //
    };
  }
};
</script>

<style></style>
