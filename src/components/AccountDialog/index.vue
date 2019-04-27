<template>
  <v-dialog
    key="AccountDialog"
    v-model="dialog"
    :max-width="$store.state.userManagement.loggedIn ? '70%' : '500'"
    :fullscreen="!this.$vuetify.breakpoint.mdAndUp"
    :transition="this.$vuetify.breakpoint.mdAndUp ? 'dialog-transition' : 'dialog-bottom-transition'"
    lazy
  >
    <template #activator="{ on }">
      <v-flex shrink>
        <component :is="activeButton" @click="dialog = true" />
      </v-flex>
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
