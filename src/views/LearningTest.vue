<template>
  <v-container align-center justify-center fill-height>
    <v-layout column fill-width>
      <v-flex text-xs-center>
        <h2 id="examTitle" class="display-3 my-5">{{ pageTitle }}</h2>
      </v-flex>
      <v-layout justify-center>
        <v-flex md8>
          <v-fade-transition group mode="out-in">
            <dynamic-card
              v-for="(test, j) in questions"
              :key="'id' + j + '&page=' + page"
              ref="exerciseCards"
              :data="test"
              :disabled="answered"
            />
          </v-fade-transition>
          <v-divider id="examResultDivider" class="my-3"></v-divider>
          <v-layout v-if="!answered" align-space-around justify-center row wrap>
            <v-hover>
              <template #default="{ hover }">
                <v-btn
                  dark
                  color="green"
                  large
                  round
                  :class="`elevation-${hover ? 12 : 2}` + ' ma-1'"
                  @click="finishTest()"
                >
                  {{ finishButton }}
                  <v-icon right>mdi-checkbox-marked-circle-outline</v-icon>
                </v-btn>
              </template>
            </v-hover>
          </v-layout>
          <learning-test-result v-if="answered" :final-style="finalStyle" />
          <v-layout v-if="answered && !isLastPage" align-space-around justify-center row wrap>
            <v-hover>
              <template #default="{ hover }">
                <v-btn
                  dark
                  large
                  round
                  class="soundcloud-gradient-reversed mt-2"
                  :class="`elevation-${hover ? 12 : 2}` + ' ma-1'"
                  @click="loadNextPage()"
                >
                  Urmatorul Subiect
                  <v-icon right>mdi-page-next-outline</v-icon>
                </v-btn>
              </template>
            </v-hover>
          </v-layout>
        </v-flex>
        <v-snackbar
          v-model="showSnackbar"
          :color="snackbarData.color"
          :timeout="3000"
          auto-height
          class="font-weight-bold title"
          :multi-line="!$vuetify.breakpoint.mdAndUp"
        >
          {{ snackbarData.text }}
        </v-snackbar>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import LearningTestResult from "../components/LearningTestResult";
import DynamicCard from "../components/DynamicCard";
import learningTestJson from "../data/learningTest";
import lessonStyles from "../enums/lessonStyles";
export default {
  name: "LearningTest",
  components: { LearningTestResult, DynamicCard },
  data() {
    return {
      answered: false,
      snackbarData: {
        color: null,
        text: null,
      },
      showSnackbar: null,
      page: 0,
      exerciseCards: [],
      examData: learningTestJson.exam,
      pageTitle: learningTestJson.title,
      stylePoints: [0, 0, 0, 0],
      finalStyle: null,
    };
  },
  computed: {
    questions() {
      return this.examData[this.page].subject;
    },
    finishButton() {
      if (this.isLastPage) return "Termina Testul";
      return "Verifica Subiectul";
    },
    isLastPage() {
      return this.page === this.examData.length - 1;
    },
    examResultText() {
      if (this.isLastPage) return "Ai terminat Testul";
      return "Mergi la subiectul urmator!";
    },
  },
  watch: {
    page(newValue) {
      this.$nextTick(this.loadExerciseCards);
      this.$emit("page-change", newValue);
    },
  },
  async mounted() {
    this.$nextTick(this.loadExerciseCards());
    await this.$vuetify.goTo(0, { duration: 1000 });
  },
  methods: {
    validateAnswers() {
      for (let i = 0; i < this.exerciseCards.length; i++) {
        if (!this.exerciseCards[i].isAnswerChecked()) {
          this.snackbarData.color = "warning";
          this.snackbarData.text = "Au ramas Raspunsuri neselectate!";
          this.showSnackbar = true;
          return false;
        }
      }
      return true;
    },
    async finishTest() {
      if (this.validateAnswers() === false) return;
      this.answered = true;
      this.calculateCards();
      this.finalStyle = this.calculateStyle();
      await this.$store.dispatch("userManagement/updateLearningStyle", this.finalStyle);
    },
    loadExerciseCards() {
      let exerciseCardsChildren = [];
      for (let i = 0; i < this.$refs["exerciseCards"].length; i++) {
        exerciseCardsChildren[i] = this.$refs["exerciseCards"][i].$refs["component"];
      }
      this.exerciseCards = exerciseCardsChildren;
    },
    calculateCards() {
      for (let i = 0; i < this.exerciseCards.length; i++) {
        this.stylePoints[this.exerciseCards[i].radioSelection]++;
      }
    },
    calculateStyle() {
      let maxi = 0;
      let val = 0;
      for (let i = 0; i < 4; i++) {
        if (this.stylePoints[i] > maxi) {
          maxi = this.stylePoints[i];
          val = i;
        }
      }
      if (val === 0) return lessonStyles.VISUAL;
      if (val === 1) return lessonStyles.AUDIO;
      if (val === 2) return lessonStyles.TACTILE;
      if (val === 3) return lessonStyles.PUZZLE;
    },
    async loadNextPage() {
      await this.$vuetify.goTo(0, { duration: 1000 });
      this.page++;
      this.answered = false;
    },
  },
};
</script>

<style scoped></style>
