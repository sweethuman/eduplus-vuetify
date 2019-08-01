<template>
  <v-container fill-height>
    <component :is="activeComponent" v-bind="activeComponentProps"></component>
  </v-container>
</template>

<script>
import ChaptersSkeletonLoader from "../components/Chapters/ChaptersSkeletonLoader";
export default {
  name: "Chapters",
  components: {
    //Webpack Dynamic Imports, this means they are only loaded only when they are used, saving on LoadTime and bandwidth
    ChaptersViewer: () => import(/* webpackChunkName: "chaptersViewer" */ "../components/Chapters/ChaptersViewer"),
    ItemNotFound: () => import(/* webpackChunkName: "itemNotFound" */ "../components/ItemNotFound"),
    ChaptersSkeletonLoader,
  },
  //needed to react to route change, to reload data on route change
  async beforeRouteUpdate(to, from, next) {
    //TODO CHECK IF DISCIPLINE IS IN LESSON STRUCTURE before doing dispatch otherwise you it will return an error and it is not handled
    //TODO high order function here, because sometimes lesson is specified in list but it is not present in files and it fails the import, must handle case
    this.$wait.start("loading chapters");
    this.$log.debug("going to rounte: ", to.fullPath);
    try {
      await this.$store.dispatch("disciplines/loadChapters", to.params.discipline);
      this.$log.debug("loaded chapters for ", to.params.discipline);
      let data = this.$store.state.disciplines.chapters[to.params.discipline];
      let loadLessonsPromises = data.map(doc =>
        this.$store.dispatch("disciplines/loadLessons", { discipline: to.params.discipline, chapter: doc.id })
      );
      await Promise.all(loadLessonsPromises);
      this.$log.debug("loaded all lessons for ", to.params.discipline);
    } catch (e) {
      this.$log.warn(e);
      //TODO add console logging or high order function here, it happens when the current discipline is not found, it isn't critical
    } finally {
      this.$wait.end("loading chapters");
    }
    next();
  },
  computed: {
    isReadyToLoadChapters() {
      return this.$store.getters["disciplines/isReadyToLoadChapters"](this.$route.params.discipline);
    },
    disciplineTitle() {
      let disciplineTitle = this.$store.getters["disciplines/getDisciplineTitle"](this.$route.params.discipline);
      return disciplineTitle == null ? this.$route.params.discipline : disciplineTitle;
    },
    //Dynamically Select Component to be Loaded based on Chapters Loaded State
    //If They're Still Loading it Uses the Skeleton Loader
    //After they've finished loading if they're ready it selects ChaptersViewer
    //Otherwise it shows that They're Not Found
    activeComponent() {
      if (this.$wait.waiting("loading chapters")) return "ChaptersSkeletonLoader";
      if (this.isReadyToLoadChapters) return "ChaptersViewer";
      return "ItemNotFound";
    },
    //Dynamically loads props for the selected component
    activeComponentProps() {
      //SkeletonLoader doesn't need any props
      if (this.$wait.waiting("loading chapters")) return {};
      //Returns Props for Chapter Viewer
      if (this.isReadyToLoadChapters) {
        let data = this.$store.state.disciplines.chapters[this.$route.params.discipline];
        data = data.map(doc => {
          doc.lessons = this.$store.state.disciplines.lessons[this.$route.params.discipline][doc.id];
          return doc;
        });
        return {
          data: data,
          disciplineId: this.$route.params.discipline,
        };
      }
      //Returns Text Prop For ItemNotFound
      return {
        text: this.disciplineTitle + " nu a fost gasita.",
      };
    },
    pageTitle() {
      return this.disciplineTitle;
    },
  },
  async beforeCreate() {
    //TODO CHECK IF DISCIPLINE IS IN LESSON STRUCTURE before doing dispatch otherwise you it will return an error and it is not handled
    this.$wait.start("loading chapters");
    try {
      await this.$store.dispatch("disciplines/loadDisciplines");
      await this.$store.dispatch("disciplines/loadChapters", this.$route.params.discipline);
      this.$log.debug("loaded chapters for ", this.$route.params.discipline);
      let data = this.$store.state.disciplines.chapters[this.$route.params.discipline];
      let loadLessonsPromises = data.map(doc =>
        this.$store.dispatch("disciplines/loadLessons", { discipline: this.$route.params.discipline, chapter: doc.id })
      );
      await Promise.all(loadLessonsPromises);
      this.$log.debug("loaded all lessons for ", this.$route.params.discipline);
    } catch (e) {
      this.$log.warn(e);
      //TODO add console logging or high order function here, it happens when the current discipline is not found, it isn't critical
    } finally {
      this.$wait.end("loading chapters");
    }
  },
};
</script>

<style></style>
