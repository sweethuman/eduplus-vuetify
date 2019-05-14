<template>
  <v-container fill-height>
    <component :is="activeComponent" v-bind="componentProps"></component>
  </v-container>
</template>

<script>
export default {
  name: "DisciplinePage",
  components: {
    ChaptersViewer: () => import(/* webpackChunkName: "chaptersViewer" */ "../components/ChaptersViewer"),
    ItemNotFound: () => import(/* webpackChunkName: "itemNotFound" */ "../components/ItemNotFound"),
  },
  //need to react to route change, otherwise new data won't load
  async beforeRouteUpdate(to, from, next) {
    //TODO CHECK IF DISCIPLINE IS IN LESSON STRUCTURE before doing dispatch otherwise you it will return an error and it is not handled
    //TODO high order function here, because sometimes lesson is specified in list but it is not present in files and it fails the import, must handle case
    await this.$store.dispatch("disciplines/setDisciplineLessonStructure", to.params.discipline);
    next();
  },
  computed: {
    isLessonStructure() {
      return this.$store.getters["disciplines/isLessonStructure"](this.$route.params.discipline);
    },
    activeComponent() {
      if (this.isLessonStructure) return "ChaptersViewer";
      return "ItemNotFound";
      /*FIXME
        ItemNotFound is returned when the lesson is not found in the lesson structure, this works,
        because items are loaded first, but it should also be shown if setting the lesson structure fails,
        idk if you should really do this, because lesson is still not loaded if throw error,
        but there might be a case where it is in the structure but no chapters are present, or whateve,
        delete this if you're not sure anymore
       */
    },
    componentProps() {
      if (this.isLessonStructure)
        return {
          data: this.$store.state.disciplines.lessonStructure[this.$route.params.discipline],
          disciplineId: this.$route.params.discipline,
        };
      let disciplineTitle = this.$store.getters["disciplines/getDisciplineTitle"](this.$route.params.discipline);
      disciplineTitle = disciplineTitle == null ? this.$route.params.discipline : disciplineTitle;
      return {
        text: disciplineTitle + " nu a fost gasita.",
      };
    },
  },
  async beforeCreate() {
    await this.$store.dispatch("disciplines/loadDisciplines");
    //TODO CHECK IF DISCIPLINE IS IN LESSON STRUCTURE before doing dispatch otherwise you it will return an error and it is not handled
    //TODO high order function here, because sometimes lesson is specified in list but it is not present in files and it fails the import, must handle case
    await this.$store.dispatch("disciplines/setDisciplineLessonStructure", this.$route.params.discipline);
  },
};
</script>

<style></style>