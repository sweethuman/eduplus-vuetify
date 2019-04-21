<template>
  <div>
    <v-layout justify-center>
      <v-flex md8>
        <dynamic-card v-for="(test, j) in questions" :key="j" ref="exerciseCards" :data="test" :disabled="answered" />
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
                Termina Testul<v-icon right>mdi-checkbox-marked-circle-outline</v-icon>
              </v-btn>
            </template>
          </v-hover>
        </v-layout>
        <exam-result v-if="answered" :points="points" :max-points="questions.length" class="text-xs-center" />
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarData.color"
      :timeout="3000"
      auto-height
      class="font-weight-bold title"
      :multi-line="!$vuetify.breakpoint.mdAndUp"
    >
      {{ snackbarData.text }} <v-btn dark flat @click="showSnackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import ExamResult from "./ExamResult";
import DynamicCard from "./DynamicCard";
export default {
  name: "CardListExam",
  components: { ExamResult, DynamicCard },
  props: {
    questions: {
      type: Array,
      default: undefined,
    },
  },
  data() {
    return {
      answered: false,
      points: 0,
      snackbarData: {
        color: null,
        text: null,
      },
      showSnackbar: null,
    };
  },
  computed: {
    exerciseCards() {
      let exerciseCardsChildren = [];
      for (let i = 0; i < this.$refs["exerciseCards"].length; i++) {
        exerciseCardsChildren[i] = this.$refs["exerciseCards"][i].$refs["component"];
      }
      return exerciseCardsChildren;
    },
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
    calculateCards() {
      for (let i = 0; i < this.exerciseCards.length; i++) {
        this.points += this.exerciseCards[i].calculateChips();
      }
    },
  },
};
</script>

<style scoped></style>
