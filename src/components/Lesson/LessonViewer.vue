<template>
  <v-layout column>
    <v-expand-transition>
      <v-layout v-if="youtubeId != null" align-center justify-center class="mb-3">
        <v-flex md10 lg8>
          <v-card class="pa-2">
            <v-responsive :aspect-ratio="16 / 9">
              <div class="youtube-container" style="height: 100%">
                <div class="youtube-content" style="height: 100%">
                  <youtube
                    :video-id="youtubeId"
                    :player-vars="playerVars"
                    style="margin-bottom: -6px; width: 100%;height: 100%"
                  ></youtube>
                </div>
              </div>
            </v-responsive>
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
            <references-item v-if="testId" icon="mdi-format-list-checks" title="Teste">
              <go-to-exam-button :test-id="testId" text="Primul Test"></go-to-exam-button>
            </references-item>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import RenderAdvancedMarkdown from "../RenderAdvancedMarkdown";
import ReferencesItem from "../core/ReferencesItem";
import GoToExamButton from "../core/GoToExamButton";
export default {
  name: "LessonViewer",
  components: {
    RenderAdvancedMarkdown,
    ReferencesItem,
    GoToExamButton,
  },
  props: {
    markdown: {
      type: String,
      required: true,
    },
    youtubeId: {
      type: String,
      default: null,
    },
    testId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      playerVars: {
        origin: window.location.origin,
      },
    };
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
    text-indent: 1em;
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
    text-indent: 0;
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
      text-indent: 0;
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
