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
      <v-dialog v-model="dialog" max-width="500">
        <template #activator="{ on }">
          <v-btn class="orange-gradient-background" flat large v-on="on">
            <v-icon left>mdi-login-variant</v-icon>Login
          </v-btn>
        </template>
        <v-card class="elevation-20">
          <v-toolbar
            dark
            color="primary"
            class="peach-gradient-background-reversed"
          >
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account"
                name="username"
                label="Login"
                type="text"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
                label="Login"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="peach-gradient-background"
              @click="dialog = false"
              large
              >Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
    <v-footer dark height="auto" absolute app>
      <v-card class="flex peach-gradient-background-reversed" flat tile>
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
export default {
  name: "App",
  components: {},
  data() {
    return {
      snackbar: false,
      dialog: false
    };
  }
};
</script>

<style></style>
