<template>
  <v-card>
    <v-toolbar dark color="primary" :card="$vuetify.breakpoint.lgAndUp">
      <v-toolbar-side-icon @click="$emit('close-dialog')"><v-icon>mdi-close</v-icon></v-toolbar-side-icon>
      <v-toolbar-title>Profilul Meu</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon color="error" @click="logout">
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
        <v-btn icon @click="$emit('close-dialog')"><v-icon>mdi-content-save</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-alert
      :value="$store.state.userManagement.currentUser.learningStyle == null"
      type="warning"
      class="mt-0 large-child-icon"
      icon="mdi-alert-decagram-outline"
    >
      <v-layout align-center justify-center :column="!$vuetify.breakpoint.lgAndUp">
        <v-flex grow class="text-xs-center">
          <span class="title">
            Chestionarul pentru stabilirea stilului de invatare nu a fost completat. Completeaza-l acum!
          </span>
        </v-flex>
        <v-flex shrink>
          <v-btn to="/learningTest" class="sublimelight-gradient-reversed" dark @click="$emit('close-dialog')">
            MERGI LA CHESTIONAR!
          </v-btn>
        </v-flex>
      </v-layout>
    </v-alert>
    <v-layout fill-height :column="!$vuetify.breakpoint.lgAndUp">
      <v-flex xs12 md4 my-3>
        <profile-picture></profile-picture>
      </v-flex>
      <v-flex shrink mx-1>
        <v-divider :vertical="$vuetify.breakpoint.lgAndUp" :style="{ borderTopWidth: hrBorderTopWidth }"></v-divider>
      </v-flex>
      <v-flex xs12 lg8 grow>
        <account-details :scroll-parent="$parent"></account-details>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import ProfilePicture from "./modules/ProfilePicture";
import AccountDetails from "./modules/AccountDetails";

export default {
  name: "MyProfile",
  components: {
    ProfilePicture,
    AccountDetails,
  },
  computed: {
    hrBorderTopWidth() {
      return this.$vuetify.breakpoint.mdAndDown ? "3px" : "0";
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("userManagement/logOut");
    },
  },
};
</script>

<style>
.large-child-icon i {
  font-size: 36px !important;
}
</style>
