<template>
  <v-layout
    v-if="$store.getters['userManagement/loggedIn'] && $store.state.userManagement.currentUser.professor === true"
    align-center
    justify-center
  >
    <v-flex shrink>
      <v-btn :large="$vuetify.breakpoint.mdAndUp" round class="sublimelight-gradient" dark :to="customLink">
        <v-icon left>mdi-pencil</v-icon>
        Editeaza
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "EditLessonButton",
  computed: {
    customLink() {
      return `/lessonEdit/${this.$route.params.discipline}/${this.$route.params.chapter}/${this.$route.params.lesson}`;
    },
  },
};
</script>

<style scoped></style>
