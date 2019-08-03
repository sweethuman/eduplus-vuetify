<template>
  <v-layout align-center justify-center>
    <v-flex shrink>
      <v-btn
        :large="$vuetify.breakpoint.mdAndUp"
        round
        :class="previousButtonClass"
        :dark="!previousDisabled"
        :to="previousButtonLink"
        :disabled="previousDisabled"
      >
        <v-icon :left="!$vuetify.breakpoint.xsOnly">mdi-chevron-left</v-icon>
        {{ returnEmptyStringOnlyOnXS("Inapoi") }}
      </v-btn>
    </v-flex>
    <v-flex shrink>
      <v-btn :large="$vuetify.breakpoint.mdAndUp" round color="#ff4e50" dark :to="allButtonLink">
        <v-icon :left="!$vuetify.breakpoint.xsOnly">mdi-format-list-checkbox</v-icon>
        {{ returnEmptyStringOnlyOnXS("Toate") }}
      </v-btn>
    </v-flex>
    <v-flex shrink>
      <v-btn
        :large="$vuetify.breakpoint.mdAndUp"
        round
        :class="nextButtonClass"
        :dark="!nextDisabled"
        :to="nextButtonLink"
        :disabled="nextDisabled"
      >
        {{ returnEmptyStringOnlyOnXS("Inainte") }}
        <v-icon :right="!$vuetify.breakpoint.xsOnly">mdi-chevron-right</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "NavigationButtons",
  computed: {
    defaultLink() {
      return "/lesson/" + this.$route.params.discipline + "/" + this.$route.params.chapter + "/";
    },
    previousButtonLink() {
      let discipline = this.$route.params.discipline;
      let chapter = this.$route.params.chapter;
      let previousIndex = this.$store.state.disciplines.currentLessonIndex - 1;
      previousIndex = previousIndex < 0 ? 0 : previousIndex;
      return (
        this.defaultLink +
        this.$store.state.disciplines.lessons[discipline][chapter][previousIndex].id +
        (this.$store.getters["userManagement/loggedIn"] &&
        this.$store.state.userManagement.currentUser.learningStyle != null
          ? "?style=" + this.$store.state.userManagement.currentUser.learningStyle
          : "")
      );
    },
    nextButtonLink() {
      let discipline = this.$route.params.discipline;
      let chapter = this.$route.params.chapter;
      let nextIndex = this.$store.state.disciplines.currentLessonIndex + 1;
      nextIndex = nextIndex >= this.$store.state.disciplines.lessons[discipline][chapter].length ? 0 : nextIndex;
      return (
        this.defaultLink +
        this.$store.state.disciplines.lessons[discipline][chapter][nextIndex].id +
        (this.$store.getters["userManagement/loggedIn"] &&
        this.$store.state.userManagement.currentUser.learningStyle != null
          ? "?style=" + this.$store.state.userManagement.currentUser.learningStyle
          : "")
      );
    },
    allButtonLink() {
      return "/chapters/" + this.$route.params.discipline + "/";
    },
    previousDisabled() {
      return this.$store.state.disciplines.currentLessonIndex === 0;
    },
    nextDisabled() {
      let discipline = this.$route.params.discipline;
      let chapter = this.$route.params.chapter;
      return (
        this.$store.state.disciplines.currentLessonIndex ===
        this.$store.state.disciplines.lessons[discipline][chapter].length - 1
      );
    },
    previousButtonClass() {
      return {
        "orange-gradient": !this.previousDisabled,
        "disabled-button": this.previousDisabled,
      };
    },
    nextButtonClass() {
      return {
        "orange-gradient-reversed": !this.nextDisabled,
        "disabled-button": this.nextDisabled,
      };
    },
  },
  methods: {
    returnEmptyStringOnlyOnXS(text) {
      if (this.$vuetify.breakpoint.xsOnly) {
        return "";
      }
      return text;
    },
  },
};
</script>

<style scoped>
.disabled-button {
  background: #e0e0e0;
}
</style>
