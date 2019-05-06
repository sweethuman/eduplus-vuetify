<template>
  <v-container fill-height>
    <component :is="activeComponent" v-bind="componentProps"></component>
  </v-container>
</template>

<script>
export default {
  name: "DisciplinePage",
  components: {
    DisciplineViewer: () => import(/* webpackChunkName: "discipViewer" */ "../components/DisciplineViewer"),
    ItemNotFound: () => import(/* webpackChunkName: "itemNotFound" */ "../components/ItemNotFound"),
  },
  computed: {
    isLessonStructure() {
      return this.$store.getters["disciplines/isLessonStructure"](this.$route.params.name);
    },
    activeComponent() {
      if (this.isLessonStructure) return "DisciplineViewer";
      return "ItemNotFound";
    },
    componentProps() {
      if (this.isLessonStructure)
        return { data: this.$store.state.disciplines.lessonStructure[this.$route.params.name] };
      return {
        text: this.$store.getters["disciplines/getDisciplineTitle"](this.$route.params.name) + " nu a fost gasita.",
      };
    },
  },
};
</script>

<style></style>
