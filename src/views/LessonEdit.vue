<template>
  <v-container>
    <component :is="activeComponent" v-bind="activeComponentProps"></component>
  </v-container>
</template>

<script>
import { firestore } from "../firebase";
import LessonEditSkeletonLoader from "../components/LessonEdit/LessonEditSkeletonLoader";
import ErrorComponent from "../components/ErrorComponent";
import LessonEditLoadState from "../enums/LessonEditLoadState";

export default {
  name: "LessonEdit",
  components: {
    //Webpack Dynamic Imports, this means they are only loaded only when they are used, saving on LoadTime and bandwidth
    LessonEditForm: () => ({
      component: import(/* webpackChunkName: "lessonEditForm" */ "../components/LessonEdit/LessonEditForm"),
      // A component to use while the async component is loading
      loading: LessonEditSkeletonLoader,
      // A component to use if the load fails
      error: ErrorComponent,
    }),
    ItemNotFound: () => ({
      component: import(/* webpackChunkName: "itemNotFound" */ "../components/ItemNotFound"),
      // A component to use while the async component is loading
      loading: LessonEditSkeletonLoader,
      // A component to use if the load fails
      error: ErrorComponent,
    }),
    LessonEditSkeletonLoader,
    ErrorComponent,
  },
  data() {
    return {
      loadedState: null,
      lessonObject: null,
    };
  },
  computed: {
    activeComponent() {
      if (this.$wait.waiting("loading source")) return "LessonEditSkeletonLoader";
      if (
        this.loadedState === LessonEditLoadState.MissingDiscipline ||
        this.loadedState === LessonEditLoadState.MissingChapter
      )
        return "ItemNotFound";
      if (this.loadedState === LessonEditLoadState.Loaded || this.loadedState === LessonEditLoadState.MissingLesson)
        return "LessonEditForm";
      return "ErrorComponent";
    },
    activeComponentProps() {
      if (this.$wait.waiting("loading source")) return {};
      if (this.loadedState === LessonEditLoadState.MissingDiscipline)
        return { text: `Disciplina ${this.$route.params.discipline} nu este prezenta in baza de date` };
      if (this.loadedState === LessonEditLoadState.MissingChapter)
        return { text: `Capitolul ${this.$route.params.chapters} nu este prezent in baza de date` };
      if (this.loadedState === LessonEditLoadState.Loaded) return {};
      return {};
    },
  },
  async beforeRouteUpdate(to, from, next) {
    this.$wait.start("loading source");
    this.loadedState = await this.loadForm(to);
    this.$wait.end("loading source");
    next();
  },
  async created() {
    this.$wait.start("loading source");
    this.loadedState = await this.loadForm(this.$route);
    this.$wait.end("loading source");
  },
  methods: {
    async loadForm(routeObject) {
      let discipline = routeObject.params.discipline;
      let chapter = routeObject.params.chapter;
      let disciplineObject = await firestore
        .collection("/disciplines/")
        .doc(discipline)
        .get();
      if (!disciplineObject.exists) {
        return LessonEditLoadState.MissingDiscipline;
      }
      let chapterObject = await firestore
        .collection(`/disciplines/${discipline}/chapters`)
        .doc(chapter)
        .get();
      if (!chapterObject.exists) {
        return LessonEditLoadState.MissingChapter;
      }
      return LessonEditLoadState.Loaded;
    },
  },
};
</script>

<style scoped></style>
