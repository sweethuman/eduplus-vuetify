<template>
  <div>
    <v-layout v-if="!finished" justify-center>
      <v-flex md8>
        <v-card class="mb-2 elevation-3">
          <v-card-title primary-title>
            <h3 class="title ma-2">
              {{ questions[questionPosition].question }}
            </h3>
          </v-card-title>
          <v-progress-linear :value="(100 / questions.length) * questionPosition" color="wiretap-gradient" />
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-if="!finished" justify-center>
      <v-flex md8>
        <v-card class="elevation-3">
          <v-card-text>
            <form>
              <v-radio-group v-model="radioSelection" :disabled="answered">
                <v-layout
                  v-for="(option, i) in questions[questionPosition].options"
                  :key="i"
                  align-center
                  row
                  :style="`background: ${getAnswerColor(chipStore[i].value)}; border-radius: 10px`"
                  my-1
                >
                  <v-flex xs12>
                    <v-radio :value="i" class="py-2">
                      <template #label>
                        <span class="black--text">{{ option }}</span>
                      </template>
                    </v-radio>
                  </v-flex>
                  <v-flex>
                    <v-chip
                      v-if="chipStore[i].result"
                      :color="chipStore[i].value === resultOptions.wrong ? '#c7004c' : '#4fb783'"
                      label
                      dark
                      style="border-radius: 20px"
                    >
                      {{ getLabelText(chipStore[i].value) }}
                    </v-chip>
                  </v-flex>
                </v-layout>
              </v-radio-group>
            </form>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-layout v-if="!answered" align-space-around justify-center row wrap>
              <v-hover>
                <template #default="{ hover }">
                  <v-btn
                    dark
                    color="green"
                    large
                    round
                    :class="`elevation-${hover ? 12 : 2}` + ' ma-1'"
                    @click="checkAnswer()"
                  >
                    Verifica Raspunul<v-icon right>
                      mdi-checkbox-marked-circle-outline
                    </v-icon>
                  </v-btn>
                </template>
              </v-hover>
              <v-hover>
                <template #default="{ hover }">
                  <v-btn
                    dark
                    color="warning"
                    large
                    round
                    :class="`elevation-${hover ? 12 : 2}` + ' ma-1'"
                    @click="skipQuestion()"
                  >
                    Sari Peste<v-icon right>
                      mdi-skip-next
                    </v-icon>
                  </v-btn>
                </template>
              </v-hover>
            </v-layout>
            <v-layout v-if="answered" align-space-around justify-center row wrap>
              <v-hover>
                <template #default="{ hover }">
                  <v-btn
                    dark
                    color="success"
                    large
                    round
                    :class="`elevation-${hover ? 12 : 2}` + ' ma-1'"
                    @click="resetAndLoadPosition(++questionPosition)"
                  >
                    Urmatoarea Intrebare<v-icon right>
                      mdi-arrow-right
                    </v-icon>
                  </v-btn>
                </template>
              </v-hover>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-if="finished" justify-center text-xs-center>
      <v-flex xs12 md8>
        <exam-result :points="points" :max-points="questions.length" />
      </v-flex>
    </v-layout>
    <v-snackbar v-model="showSnackbar" :color="snackbarData.color" :timeout="3000" auto-height>
      {{ snackbarData.text }}
      <v-btn dark flat @click="showSnackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import ExamResult from "./ExamResult";

export default {
  name: "CardSlideExam",
  components: { ExamResult },
  props: {
    questions: Array,
  },
  data() {
    return {
      radioSelection: null,
      chipStore: [],
      resultOptions: Object.freeze({ correct: 0, wrong: 1, intermediate: 2 }),
      questionPosition: 0,
      answered: false,
      points: 0,
      snackbarData: {
        color: null,
        text: null,
      },
      showSnackbar: null,
      finished: false,
    };
  },
  beforeMount() {
    this.calculateChips();
  },
  methods: {
    showChip(chipId) {
      if (chipId === this.radioSelection) {
        if (chipId === this.questions[this.questionPosition].correctAnswer) {
          return { result: true, value: this.resultOptions.correct };
        } else {
          return { result: true, value: this.resultOptions.wrong };
        }
      }
      if (chipId === this.questions[this.questionPosition].correctAnswer && this.radioSelection != null) {
        return { result: true, value: this.resultOptions.intermediate };
      }
      return { result: false };
    },
    calculateChips() {
      for (let i = 0; i < this.questions[this.questionPosition].options.length; i++) {
        this.$set(this.chipStore, i, this.showChip(i));
      }
    },
    getLabelText(value) {
      if (value === this.resultOptions.correct) return "Corect";
      if (value === this.resultOptions.wrong) return "Gresit";
      if (value === this.resultOptions.intermediate) return "Raspunsul Corect";
    },
    getAnswerColor(value) {
      if (value === this.resultOptions.correct) return "#c6e377";
      if (value === this.resultOptions.wrong) return "#ef6c57";
      if (value === this.resultOptions.intermediate) return "#c6e377";
      return "";
    },
    checkAnswer() {
      if (this.radioSelection == null) {
        this.snackbarData.color = "warning";
        this.snackbarData.text = "Selecteaza un raspuns!";
        this.showSnackbar = true;
        return;
      }
      if (this.radioSelection === this.questions[this.questionPosition].correctAnswer) {
        this.points++;
        this.snackbarData.color = "success";
        this.snackbarData.text = "Ai raspuns corect!";
      } else {
        this.snackbarData.color = "error";
        this.snackbarData.text = "Ai raspuns gresit!";
      }
      this.showSnackbar = true;
      this.calculateChips();
      this.answered = true;
    },
    skipQuestion() {
      this.$set(this.chipStore, this.questions[this.questionPosition].correctAnswer, {
        result: true,
        value: this.resultOptions.intermediate,
      });
      this.answered = true;
    },
    resetAndLoadPosition(position) {
      if (position === this.questions.length) {
        this.finished = true;
        return;
      }
      this.radioSelection = null;
      this.answered = false;
      this.calculateChips();
    },
  },
};
</script>

<style scoped></style>
