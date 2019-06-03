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
    <v-expand-transition>
      <v-layout v-if="lessonData.youtubeId != null" align-center justify-center class="mb-3">
        <v-flex md10 lg8>
          <v-card class="pa-2">
            <div class="youtube-container">
              <div class="youtube-content">
                <youtube
                  :video-id="lessonData.youtubeId"
                  :player-vars="playerVars"
                  style="margin-bottom: -6px; width: 100%;height: 100%"
                ></youtube>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-expand-transition>
    <v-layout align-center justify-center>
      <v-flex md10 lg8>
        <v-card>
          <v-card-text class="lesson-content">
            <render-advanced-markdown :markdown="markdown"></render-advanced-markdown>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-divider class="my-5"></v-divider>
    <v-layout align-center justify-center>
      <v-flex md10 lg8>
        <v-card class="pl-3">
          <v-card-title primary-title class="display-3 font-italic font-weight-bold pb-0">
            Referinte Lectie
          </v-card-title>
          <v-card-title class="pt-0 title">
            Contine Teste, Materiale Sursa sau alte Materiale Utile ce au legatura cu lectia
          </v-card-title>
          <v-card-text class="pt-0">
            <references-item v-if="lessonData.testId" icon="mdi-format-list-checks" title="Teste">
              <go-to-exam-button :test-id="lessonData.testId" text="Primul Test"></go-to-exam-button>
            </references-item>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import markdownIt from "../jsUtilities/markdownIt";
import lessonStyles from "../enums/lessonStyles";
import ReferencesItem from "../components/core/ReferencesItem";
import GoToExamButton from "../components/core/GoToExamButton";
import RenderAdvancedMarkdown from "../components/RenderAdvancedMarkdown";

export default {
  name: "Lesson",
  components: { ReferencesItem, GoToExamButton, RenderAdvancedMarkdown },
  data() {
    return {
      markdown: "",
      fab: false,
      playerVars: {
        origin: window.location.origin,
      },

      lessonData: {
        youtubeId: null,
        testId: null,
      },
      lessonTitle: "",
    };
  },
  computed: {
    pageTitle() {
      return this.lessonTitle;
    },
  },
  async beforeRouteUpdate(to, from, next) {
    if ((await this.loadLesson(to)) === false) {
      this.$showError("Acel stil nu exista momentan");
      next(false);
    } else next();
  },
  async created() {
    if ((await this.loadLesson(this.$route)) === false) {
      this.$showError("Acel stil nu exista momentan");
      this.$router.replace(this.$route.path);
    }
  },
  methods: {
    async loadLesson(routeObject) {
      this.$wait.start("loading lesson");
      try {
        let jsonDataFile = await import(
          `../data/lessons/${routeObject.params.discipline}/${routeObject.params.chapter}/${
            routeObject.params.lesson
          }/data.json`
        );
        this.lessonTitle = jsonDataFile.name;
        if (jsonDataFile.styles == null || jsonDataFile.styles.length === 0) {
          this.markdown = "LECTIA NU PREZINTA CONTINUT{.display-3 .error}";
          return;
        }
        let lessonObject = this._.find(jsonDataFile.styles, {
          //NOTE defaults to visual because ALL LESSONS SHOULD HAS VISUAL STYLE
          type: routeObject.query.style != null ? routeObject.query.style : lessonStyles.VISUAL,
        });
        if (lessonObject == null) {
          return false;
        }

        //Load Additional Lesson Data
        if (lessonObject.type === lessonStyles.AUDIO || lessonObject.type === lessonStyles.TACTILE)
          this.lessonData.youtubeId = lessonObject["youtube-id"];
        else this.lessonData.youtubeId = null;
        if (jsonDataFile["test-id"] != null) this.lessonData.testId = jsonDataFile["test-id"];
        else this.lessonData.testId = null;

        let markdownFile = await import(
          `../data/lessons/${routeObject.params.discipline}/${routeObject.params.chapter}/${
            routeObject.params.lesson
          }/${lessonObject.source}`
        );
        //NOTE used to be console log here
        this.markdown = (await this.axios.get(markdownFile.default)).data;
      } catch (e) {
        //NOTE used to be console log here
        //NOTE check between import error and actual error
        this.markdown = "LECTIA NU A FOST GASITA{.display-3 .error}";
      } finally {
        this.$wait.end("loading lesson");
      }
    },
  },
};
</script>

<style lang="scss">
.lesson-content {
  margin: 0 auto;
  line-height: 1;
  padding: 30px;
  font-size: 18px;
  p {
    line-height: 150%;
    max-width: 960px;
    font-weight: 400;
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: 400;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    margin-bottom: 25px;
    padding: 0;
  }

  h1 {
    font-size: 300%;
    padding: 0;
    font-variant: small-caps;
  }

  h2 {
    font-size: 150%;
  }

  h3 {
    font-size: 120%;
  }
  h4 {
    font-size: 100%;
    font-variant: small-caps;
  }
  h5 {
    font-size: 80%;
    font-weight: 100;
  }

  h6 {
    font-size: 80%;
    font-weight: 100;
    color: red;
    font-variant: small-caps;
  }
  ul,
  ol {
    padding: 0;
    margin: 0 0 0 50px;
  }
  ul {
    list-style-type: square;
  }

  li {
    line-height: 150%;
  }
  li ul,
  li ul {
    margin-left: 24px;
  }

  li > p {
    margin-bottom: 0;
  }

  pre {
    padding: 0 24px;
    white-space: pre-wrap;
  }
  code {
    font-family: Consolas, Monaco, Andale Mono, monospace;
    line-height: 1.5;
    font-size: 13px;
  }
  aside {
    display: block;
    float: right;
    width: 390px;
  }
  blockquote {
    border-left: 0.5em solid #eee;
    padding: 0 1em;
    margin-left: 0;
    max-width: 476px;
    cite {
      line-height: 20px;
      color: #bfbfbf;
    }
    cite:before {
      content: "\2014 \00A0";
    }
    p {
      max-width: 460px;
    }
  }
  hr {
    text-align: left;
    margin: 0 auto 0 0;
  }

  .titlu {
    color: lightcoral;
  }
  .emph {
    text-decoration: underline;
    color: red;
  }
}
</style>

<style scoped>
.youtube-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
}

.youtube-content {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
