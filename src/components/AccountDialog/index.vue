<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
    :fullscreen="!this.$vuetify.breakpoint.mdAndUp"
    :transition="this.$vuetify.breakpoint.mdAndUp ? 'dialog-transition' : 'dialog-bottom-transition'"
  >
    <template #activator="{ on }">
      <v-btn class="orange-gradient" flat large v-on="on">
        <v-icon left>mdi-login-variant</v-icon>
        Login
      </v-btn>
    </template>
    <component :is="activeComponent" @close-dialog="dialog = false" />
  </v-dialog>
</template>
<script>
export default {
  name: "AccountDialog",
  components: {
    LogIn: () =>
      import(
        /* webpackChunkName: 'login' */
        "./components/LogIn"
      ),
    MyProfile: () =>
      import(
        /* webpackChunkName: 'myProfile' */
        "./components/MyProfile"
      ),
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    activeComponent() {
      return this.$store.state.userManagement.loggedIn ? "MyProfile" : "LogIn";
    },
  },
};
</script>
