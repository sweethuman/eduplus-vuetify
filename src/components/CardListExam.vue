<template>
  <v-layout justify-center>
    <v-flex md8>
      <dynamic-card
        v-for="(test, j) in questions"
        :key="'id' + j + '&page=' + page"
        ref="exerciseCards"
        :data="test"
        :disabled="answered"
      />
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
      <exam-result
        v-if="answered"
        :points="points"
        :max-points="maxPoints"
        :all-points="isLastPage ? allPoints : null"
        :max-all-points="maxAllPoints"
        :text="examResultText"
        class="text-xs-center"
      />
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
      <v-btn dark flat @click="showSnackbar = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import ExamResult from "./ExamResult";
import DynamicCard from "./DynamicCard";
export default {
  name: "CardListExam",
  components: { ExamResult, DynamicCard },
  props: {
    examData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      answered: false,
      points: 0,
      maxPoints: 0,
      allPoints: 0,
      maxAllPoints: 0,
      snackbarData: {
        color: null,
        text: null,
      },
      showSnackbar: null,
      page: 0,
      exerciseCards: [],
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
    page() {
      this.$nextTick(this.loadExerciseCards);
    },
  },
  mounted() {
    this.$nextTick(this.loadExerciseCards());
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
    finishTest() {
      if (this.validateAnswers() === false) return;
      this.answered = true;
      this.calculateCards();
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
        this.points += this.exerciseCards[i].calculateChips();
        this.maxPoints += this.exerciseCards[i].calculateMaxPoints();
      }
    },
    async loadNextPage() {
      await this.$vuetify.goTo("#examTitle", { duration: 1000 });
      this.page++;
      this.answered = false;
      this.allPoints += this.points;
      this.maxAllPoints += this.maxPoints;
      this.points = 0;
      this.maxPoints = 0;
    },
  },
};
</script>

<style scoped></style>
