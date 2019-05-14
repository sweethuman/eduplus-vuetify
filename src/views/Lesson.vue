<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex md10 lg8>
        <v-card>
          <v-card-text class="lesson-content" v-html="markation(markdown)"></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import markdownIt from "../jsUtilities/markdownIt";

export default {
  name: "Lesson",
  data() {
    return {
      markdown: "",
    };
  },
  async beforeRouteUpdate(to, from, next) {
    await this.loadMarkdown(to.params);
    next();
  },
  async created() {
    await this.loadMarkdown(this.$route.params);
  },
  methods: {
    markation(markdownString) {
      return markdownIt.render(markdownString);
    },
    async loadMarkdown(params) {
      try {
        let jsonDataFile = await import(
          `../data/lessons/${params.discipline}/${params.chapter}/${params.lesson}/data.json`
        );
        let markdownFile = await import(
          `../data/lessons/${params.discipline}/${params.chapter}/${params.lesson}/${
            jsonDataFile.default.styles[0].source
          }`
        );
        //NOTE used to be console log here
        this.markdown = (await this.axios.get(markdownFile.default)).data;
      } catch (e) {
        //NOTE used to be console log here
        this.markdown = "LESSON NOT FOUND{.display-4 .error}";
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

  h2,
  h3,
  h4,
  h5,
  p {
    margin-bottom: 25px;
    padding: 0;
  }

  h1 {
    margin-bottom: 10px;
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

  pre {
    padding: 0 24px;
    max-width: 800px;
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
}
</style>
