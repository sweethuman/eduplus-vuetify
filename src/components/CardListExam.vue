<template>
  <div>
    <v-layout justify-center>
      <v-flex md8>
        <template v-for="(test, j) in questions">
          <v-card
            class="mb-2 elevation-3"
            style="background: linear-gradient(40deg, rgba(255,216,111,0.4), rgba(252,98,98,0.25)) !important;"
            :key="j"
          >
            <v-card-text>
              <h3 class="title ma-2">
                {{ test.question }}
              </h3>
              <v-divider />
              <form>
                <v-radio-group v-model="radioSelection[j]" :disabled="answered">
                  <v-layout
                    v-for="(option, i) in test.options"
                    :key="i"
                    align-center
                    row
                    :style="`background: ${getAnswerColor(chipStore[j][i].value)}; border-radius: 10px`"
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
                        v-if="chipStore[j][i].result"
                        :color="chipStore[j][i].value === resultOptions.wrong ? '#c7004c' : '#4fb783'"
                        label
                        dark
                        style="border-radius: 20px"
                      >
                        {{ getLabelText(chipStore[j][i].value) }}
                      </v-chip>
                    </v-flex>
                  </v-layout>
                </v-radio-group>
              </form>
            </v-card-text>
          </v-card>
        </template>
        <exam-result :points="points" :maxPoints="questions.length" v-if="answered" />
        <v-layout align-space-around justify-center row wrap v-if="!answered">
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
        <v-snackbar v-model="showSnackbar" :color="snackbarData.color" :timeout="3000" auto-height>
          {{ snackbarData.text }} <v-btn dark flat @click="showSnackbar = false">Close</v-btn>
        </v-snackbar>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ExamResult from "./ExamResult";
export default {
  name: "CardListExam",
  components: { ExamResult },
  props: {
    questions: Array,
  },
  data() {
    return {
      radioSelection: [],
      chipStore: [[]],
      resultOptions: Object.freeze({ correct: 0, wrong: 1, intermidiate: 2 }),
      answered: false,
      points: 0,
      snackbarData: {
        color: null,
        text: null,
      },
      showSnackbar: null,
    };
  },
  methods: {
    getLabelText(value) {
      if (value === this.resultOptions.correct) return "Corect";
      if (value === this.resultOptions.wrong) return "Gresit";
      if (value === this.resultOptions.intermidiate) return "Raspunsul Corect";
    },
    getAnswerColor(value) {
      if (value === this.resultOptions.correct) return "#c6e377";
      if (value === this.resultOptions.wrong) return "#ef6c57";
      if (value === this.resultOptions.intermidiate) return "#c6e377";
      return "";
    },
    calculateChips() {
      for (let i = 0; i < this.questions.length; i++) {
        let tempChipValue = [];
        for (let j = 0; j < this.questions[i].options.length; j++) {
          tempChipValue[j] = this.showChip(j, i);
          if (tempChipValue[j].result === true && tempChipValue[j].value === this.resultOptions.correct) ++this.points;
        }
        this.$set(this.chipStore, i, tempChipValue);
      }
    },
    showChip(chipId, poz) {
      if (chipId === this.radioSelection[poz]) {
        if (chipId === this.questions[poz].correctAnswer) {
          return { result: true, value: this.resultOptions.correct };
        } else {
          return { result: true, value: this.resultOptions.wrong };
        }
      }
      if (chipId === this.questions[poz].correctAnswer && this.radioSelection[poz] != null) {
        return { result: true, value: this.resultOptions.intermidiate };
      }
      return { result: false };
    },
    validateAnswers() {
      for (let i = 0; i < this.questions.length; i++) {
        if (this.radioSelection[i] === undefined) {
          this.snackbarData.color = "warning";
          this.snackbarData.text = "Au Ramas Raspunsuri neselectate!";
          this.showSnackbar = true;
          return false;
        }
      }
      return true;
    },
    finishTest() {
      if (this.validateAnswers() === false) return;
      this.answered = true;
      this.calculateChips();
    },
  },
  beforeMount() {
    this.calculateChips();
  },
};
</script>

<style scoped></style>
