<template>
  <v-container align-content-space-around>
    <v-layout text-xs-center>
      <v-flex>
        <h2 class="display-3">Test Memorie</h2>
      </v-flex>
    </v-layout>

    <v-layout justify-center v-if="!finished">
      <v-flex md8>
        <v-card class="mb-2 elevation-3">
          <v-card-title primary-title>
            <h3 class="title ma-2">
              {{ questions[questionPosition].question }}
            </h3>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-center v-if="!finished">
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
                      >{{ getLabelText(chipStore[i].value) }}</v-chip
                    >
                  </v-flex>
                </v-layout>
              </v-radio-group>
            </form>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-layout align-space-around justify-center row wrap v-if="!answered">
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
                    Verifica Raspunul<v-icon right>mdi-checkbox-marked-circle-outline</v-icon>
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
                    @click="
                      $set(chipStore, questions[questionPosition].correctAnswer, {
                        result: true,
                        value: resultOptions.intermidiate
                      });
                      answered = true;
                    "
                  >
                    Sari Peste<v-icon right>mdi-skip-next</v-icon>
                  </v-btn>
                </template>
              </v-hover>
            </v-layout>
            <v-layout align-space-around justify-center row wrap v-if="answered">
              <v-hover>
                <template #default="{ hover }">
                  <v-btn
                    dark
                    color="success"
                    large
                    round
                    :class="`elevation-${hover ? 12 : 2}` + ' ma-1'"
                    @click="resetAndLoadNext()"
                  >
                    Urmatoarea Intrebare<v-icon right>mdi-arrow-right</v-icon>
                  </v-btn>
                </template>
              </v-hover>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-center v-if="finished" text-xs-center>
      <v-flex md10>
        <v-card>
          <v-card-text>
            <h2 class="display-3 font-weight-regular mb-3">Ai terminat testul!</h2>
            <h3 class="display-2">
              Ai <span class="red--text">{{ points }}</span> puncte din
              <span class="green--text">{{ questions.length }}</span> puncte!
            </h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="showSnackbar" :color="snackbarData.color" :timeout="3000" auto-height>
      {{ snackbarData.text }} <v-btn dark flat @click="showSnackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "Exam",
  data() {
    return {
      questions: [
        {
          id: 0,
          question:
            "De cele mai multe ori, numerele de telefon, numele de persoane, datele istorice, denumirile geografice, formulele, denumirile latinești ale plantelor sunt reținute pe baza memorării:",
          options: ["logice", "mecanica", "postvoluntare", "afective"],
          correctAnswer: 1
        },
        {
          id: 1,
          question: "Uitarea este un fenomen psihic:",
          options: [
            "natural şi relativ necesar",
            "patologic şi selectiv",
            "întotdeauna pozitiv şi necesar",
            "nefiresc, manifestat sub forma erorilor sau omisiunilor"
          ],
          correctAnswer: 0
        }
      ],
      radioSelection: null,
      chosenAnswer: null,
      chipStore: [],
      resultOptions: Object.freeze({ correct: 0, wrong: 1, intermidiate: 2 }),
      questionPosition: 0,
      answered: false,
      points: 0,
      snackbarData: {
        color: null,
        text: null
      },
      showSnackbar: null,
      finished: false
    };
  },
  methods: {
    showChip(chipId) {
      if (chipId === this.chosenAnswer) {
        if (chipId === this.questions[this.questionPosition].correctAnswer) {
          return { result: true, value: this.resultOptions.correct };
        } else {
          return { result: true, value: this.resultOptions.wrong };
        }
      }
      if (chipId === this.questions[this.questionPosition].correctAnswer && this.chosenAnswer != null) {
        return { result: true, value: this.resultOptions.intermidiate };
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
      if (value === this.resultOptions.intermidiate) return "Raspunsul Corect";
    },
    getAnswerColor(value) {
      if (value === this.resultOptions.correct) return "#c6e377";
      if (value === this.resultOptions.wrong) return "#ef6c57";
      if (value === this.resultOptions.intermidiate) return "#c6e377";
      return "";
    },
    checkAnswer() {
      if (this.radioSelection == null) return;
      this.chosenAnswer = this.radioSelection;
      if (this.chosenAnswer === this.questions[this.questionPosition].correctAnswer) {
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
    resetAndLoadNext() {
      if (this.questionPosition === this.questions.length - 1) {
        this.finished = true;
        return;
      }
      this.radioSelection = null;
      this.chosenAnswer = null;
      this.answered = false;
      this.calculateChips();
      this.questionPosition++;
    }
  },
  beforeMount() {
    this.calculateChips();
  }
};
</script>

<style scoped></style>
