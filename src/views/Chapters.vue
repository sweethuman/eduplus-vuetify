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
  computed: {
    isLessonStructure() {
      return this.$store.getters["disciplines/isLessonStructure"](this.$route.params.discipline);
    },
    activeComponent() {
      if (this.isLessonStructure) return "ChaptersViewer";
      return "ItemNotFound";
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
};
</script>

<style></style>
