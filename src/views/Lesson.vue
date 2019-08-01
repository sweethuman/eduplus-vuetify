<template>
  <v-container>
    <v-speed-dial v-model="fab" fixed bottom right>
      <template #activator>
        <v-btn v-model="fab" class="soundcloud-gradient" dark fab :large="$vuetify.breakpoint.lgAndUp">
          <v-icon>mdi-format-line-style</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
        :to="this.$route.path + '?style=visual'"
        active-class="v-btn--active lighten-2"
        :input-value="$route.query.style == null ? true : undefined"
        exact
        replace
      >
        <v-icon>mdi-eye</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
        :to="this.$route.path + '?style=audio'"
        active-class="v-btn--active lighten-2"
        exact
        replace
      >
        <v-icon>mdi-ear-hearing</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
        :to="this.$route.path + '?style=tactile'"
        active-class="v-btn--active lighten-2"
        exact
        replace
      >
        <v-icon>mdi-gesture-double-tap</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="purple"
        :to="this.$route.path + '?style=puzzle'"
        active-class="v-btn--active lighten-2"
        exact
        replace
      >
        <v-icon>mdi-puzzle</v-icon>
      </v-btn>
    </v-speed-dial>
    <component :is="activeComponent" v-bind="activeComponentProps"></component>
  </v-container>
</template>

<script>
import lessonStyles from "../enums/lessonStyles";
import { firestore } from "../firebase";
import LessonSkeletonLoader from "../components/Lesson/LessonSkeletonLoader";
import LessonLoadState from "../enums/LessonLoadState";
import ErrorComponent from "../components/ErrorComponent";

export default {
  name: "Lesson",
  components: {
    //Webpack Dynamic Imports, this means they are only loaded only when they are used, saving on LoadTime and bandwidth
    LessonViewer: () => ({
      component: import(/* webpackChunkName: "lessonViewer" */ "../components/Lesson/LessonViewer"),
      // A component to use while the async component is loading
      loading: LessonSkeletonLoader,
      // A component to use if the load fails
      error: ErrorComponent,
    }),
    ItemNotFound: () => ({
      component: import(/* webpackChunkName: "itemNotFound" */ "../components/ItemNotFound"),
      // A component to use while the async component is loading
      loading: LessonSkeletonLoader,
      // A component to use if the load fails
      error: ErrorComponent,
    }),
    LessonSkeletonLoader,
    ErrorComponent,
  },
  data() {
    return {
      fab: false,
      lessonData: {
        youtubeId: null,
        testId: null,
        markdown: "",
      },
      lessonTitle: "",
      loadState: null,
    };
  },
  computed: {
    pageTitle() {
      return this.lessonTitle;
    },
    activeComponent() {
      if (this.$wait.waiting(["loading lesson", "processing route"])) return "LessonSkeletonLoader";
      if (this.loadState === LessonLoadState.NotExist || this.loadState === LessonLoadState.MissingContent)
        return "ItemNotFound";
      if (this.loadState === LessonLoadState.Loaded) return "LessonViewer";
      return "ErrorComponent";
    },
    activeComponentProps() {
      if (this.$wait.waiting(["loading lesson", "processing route"])) return {};
      if (this.loadState === LessonLoadState.NotExist) return { text: this.$route.params.lesson + " Nu Exista!" };
      if (this.loadState === LessonLoadState.MissingContent)
        return { text: this.lessonTitle + " Nu Prezinta Continut!" };
      if (this.loadState === LessonLoadState.Loaded) return this.lessonData;
      return { text: "Exista O Eroare Neasteptata" };
    },
  },
  /*We Have Three Rejected States
  - Lesson Doesn't Exist
  - Style Doesn't Exist ->  When Style is Specified
  - Content is Missing -> When Style is Not Specified meaning DEFAULT URL, as a rule every lesson has to have at least VISUAL style
   */
  //Add a Loader here to Stop Loading Changes
  async beforeRouteUpdate(to, from, next) {
    this.$wait.start("processing route");
    let LoadState = await this.loadLesson(to);

    //Before Loading I should show Loading Animation and then do the LoadState and other components
    switch (LoadState) {
      case LessonLoadState.NotExist:
        this.loadState = LoadState;
        this.$log.debug("Proceeding to: ", to.fullPath);
        next();
        break;
      case LessonLoadState.MissingStyle:
        if (to.query.style == null) {
          this.loadState = LessonLoadState.MissingContent;
          next();
        } else if (to.path === from.path) {
          this.$showError(`Stilul ${lessonStyles.styleToText[to.query.style]} nu exista momentan`);
          this.$log.debug("Canceled going to: ", to.fullPath);
          next(false);
        } else {
          this.$showError(`Stilul ${lessonStyles.styleToText[to.query.style]} nu exista momentan`);
          this.$log.debug("Going to the default of the path: ", to.fullPath);
          next(to.path);
        }
        break;
      case LessonLoadState.Loaded:
        this.loadState = LessonLoadState.Loaded;
        this.$log.debug("Proceeding to: ", to.fullPath);
        next();
        break;
      default:
        this.$log.warning("Unhandled State");
        this.loadState = null;
        next();
    }
    this.$wait.end("processing route");
  },
  async created() {
    this.$wait.start("processing route");
    let LoadState = await this.loadLesson(this.$route);

    switch (LoadState) {
      case LessonLoadState.NotExist:
        this.loadState = LoadState;
        break;
      case LessonLoadState.MissingStyle:
        if (this.$route.query.style == null) {
          this.loadState = LessonLoadState.MissingContent;
        } else {
          this.$showError(`Stilul ${lessonStyles.styleToText[this.$route.query.style]} nu exista momentan`);
          this.$log.debug("Going to the default of the path: ", this.$route.fullPath);
          this.$router.replace(this.$route.path);
        }
        break;
      case LessonLoadState.Loaded:
        this.loadState = LessonLoadState.Loaded;
        break;
      default:
        this.$log.warning("Unhandled State");
        this.loadState = null;
    }
    this.$wait.end("processing route");
  },
  methods: {
    async loadLesson(routeObject) {
      this.$wait.start("loading lesson");
      try {
        let discipline = routeObject.params.discipline;
        let chapter = routeObject.params.chapter;
        let lesson = routeObject.params.lesson;
        await this.$store.dispatch("disciplines/loadLessons", {
          discipline: discipline,
          chapter: chapter,
        });
        let lessonIndex = this._.findIndex(
          this.$store.state.disciplines.lessons[discipline][chapter],
          x => x.id === lesson
        );
        if (lessonIndex === -1) {
          return LessonLoadState.NotExist;
        }
        let lessonObject = this.$store.state.disciplines.lessons[discipline][chapter][lessonIndex];
        this.lessonTitle = lessonObject.title;
        //Queries for the desired style, and if it doesn't exist, it will return MissingStyle which the router will then redirect to the default link and then load the default style
        let styleObject = await firestore
          .collection(`/disciplines/${discipline}/chapters/${chapter}/lessons/${lesson}/styles`)
          .doc(routeObject.query.style != null ? routeObject.query.style : lessonStyles.styles.VISUAL)
          .get();
        if (!styleObject.exists) {
          return LessonLoadState.MissingStyle;
        }
        let styleData = styleObject.data();
        //Load Additional Lesson Data
        if (styleObject.id === lessonStyles.styles.AUDIO || styleObject.id === lessonStyles.styles.TACTILE)
          this.lessonData.youtubeId = styleData["youtube-id"];
        else this.lessonData.youtubeId = null;
        if (lessonObject["test-id"] != null) this.lessonData.testId = lessonObject["test-id"];
        else this.lessonData.testId = null;
        //NOTE used to be console log here
        this.lessonData.markdown = styleData.source;
      } catch (e) {
        this.$log.error(e);
        return null;
      } finally {
        this.$wait.end("loading lesson");
      }
      return LessonLoadState.Loaded;
    },
  },
};
</script>
