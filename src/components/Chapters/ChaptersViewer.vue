<template>
  <v-card height="100%" width="100%">
    <v-layout align-center fill-height justify-center>
      <v-flex grow>
        <v-alert
          v-if="$store.getters['userManagement/loggedIn']"
          :value="$store.state.userManagement.currentUser.learningStyle == null"
          type="warning"
          class="mt-0 large-child-icon"
          icon="mdi-alert-decagram-outline"
        >
          <v-layout align-center justify-center :column="!$vuetify.breakpoint.lgAndUp">
            <v-flex grow class="text-xs-center">
              <span class="title">
                Chestionarul pentru stabilirea stilului de invatare nu a fost completat. Completeaza-l acum!
              </span>
            </v-flex>
            <v-flex shrink>
              <v-btn to="/learningTest" class="sublimelight-gradient-reversed" dark>
                MERGI LA CHESTIONAR!
              </v-btn>
            </v-flex>
          </v-layout>
        </v-alert>
        <v-expansion-panel popout>
          <v-expansion-panel-content
            v-for="(chapter, i) in data"
            :key="i"
            ripple
            lazy
            :disabled="chapter.lessons == null || chapter.lessons.length === 0"
          >
            <template #actions>
              <v-icon color="primary">$vuetify.icons.expand</v-icon>
            </template>
            <template #header>
              <div class="title">{{ romanization(i + 1) }}. {{ chapter.title }}</div>
            </template>
            <!--            TODO alignment of item needs to be improved-->
            <v-card>
              <v-card-title v-if="data[i]['test-id']" primary-title class="align-self-center ml-4">
                <go-to-exam-button :test-id="data[i]['test-id']" text="Examen Capitol"></go-to-exam-button>
              </v-card-title>
              <v-expansion-panel popout>
                <v-expansion-panel-content v-for="(lesson, j) in chapter.lessons" :key="j" ripple lazy>
                  <template #actions>
                    <v-icon color="primary">$vuetify.icons.expand</v-icon>
                  </template>
                  <template #header>
                    <div>{{ romanization(i + 1) }}.{{ j + 1 }}. {{ lesson.title }}</div>
                  </template>
                  <v-card>
                    <v-card-text>
                      {{ lesson.description }}
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        dark
                        large
                        round
                        class="soundcloud-gradient"
                        :to="generateLink(disciplineId, chapter.id, lesson.id)"
                      >
                        Invata
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import romanize from "romanize";
import GoToExamButton from "../core/GoToExamButton";
export default {
  name: "ChaptersViewer",
  components: { GoToExamButton },
  props: {
    data: {
      type: Array,
      required: true,
    },
    disciplineId: {
      type: String,
      required: true,
    },
  },
  methods: {
    romanization(number) {
      return romanize(number);
    },
    generateLink(disciplineId, chapterId, lessonId) {
      return (
        "/lesson/" +
        disciplineId +
        "/" +
        chapterId +
        "/" +
        lessonId +
        (this.$store.getters["userManagement/loggedIn"] &&
        this.$store.state.userManagement.currentUser.learningStyle != null
          ? "?style=" + this.$store.state.userManagement.currentUser.learningStyle
          : "")
      );
    },
  },
};
</script>

<style>
.v-expansion-panel--popout .v-expansion-panel--popout .v-expansion-panel__container--active {
  max-width: 95%;
}
</style>
