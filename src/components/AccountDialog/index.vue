<template>
  <v-dialog
    :key="activeButton"
    v-model="dialog"
    max-width="500"
    :fullscreen="!this.$vuetify.breakpoint.mdAndUp"
    :transition="this.$vuetify.breakpoint.mdAndUp ? 'dialog-transition' : 'dialog-bottom-transition'"
  >
    <template #activator="{ on }">
      <component :is="activeButton" @click="dialog = true" />
    </template>
    <component :is="activeComponent" @close-dialog="dialog = false" />
  </v-dialog>
</template>
<script>
import LoginButton from "./components/buttons/LoginButton";
import MyProfileButton from "./components/buttons/MyProfileButton";
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
    LoginButton,
    MyProfileButton,
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
    activeButton() {
      return this.$store.state.userManagement.loggedIn ? "MyProfileButton" : "LoginButton";
    },
  },
};
</script>
