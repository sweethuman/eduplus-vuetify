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
          <v-progress-linear
            :value="(100 / questions.length) * questionPosition"
            color="wiretap-gradient"
          ></v-progress-linear>
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
                    @click="skipQuestion()"
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
                    @click="resetAndLoadPosition(++questionPosition)"
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
        },
        {
          id: 2,
          question:
            "Pentru cӑ ai înţeles cum poate fi combӑtutӑ uitarea, aplicând cunoştinţele dobândite la orele de psihologie, ai primit calificativul maxim la examen; acum ştii cӑ o memorare devine eficientӑ dacӑ repetarea materialului de memorat:",
          options: [
            "se reduce la simpla citire a textului",
            "este eşalonată în timp şi bazată pe reluarea la anumite intervale a repetiţiilor",
            "este comasată în timp şi bazată pe repetarea integrală a materialului",
            "depăşeşte numărul de repetiţii care au fost anterior necesare pentru întipărirea informaţiilor"
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          question: "Memorarea logică pune în evidenţă:",
          options: [
            "implicarea afectivității în memorare",
            "implicarea repetiţiei în memorare",
            "implicarea percepţiei în memorare",
            "implicarea înţelegerii în memorare"
          ],
          correctAnswer: 3
        },
        {
          id: 4,
          question:
            "Clasificarea formelor memoriei în memorie senzorială, memorie de scurtă durată şi memorie de lungă durată, are la bază:",
          options: [
            "rapiditatea întipăririi informaţiilor",
            "durata reactualizării informaţiilor",
            "rapiditatea reactualizării informaţiilor",
            "durata păstrării informaţiilor"
          ],
          correctAnswer: 3
        },
        {
          id: 5,
          question: "Ca proces al memoriei si, totodată, etapă a acesteia, reactualizarea informaţiilor:",
          options: [
            "este numită si întipărire",
            "constă în reţinerea informaţiilor pentru o perioadă mai lungă sau mai scurtă de timp",
            "este procesul de rezolvare a problemelor cu ajutorul informaţiilor anterioare",
            "se realizează sub forma recunoasterilor si reproducerilor"
          ],
          correctAnswer: 3
        },
        {
          id: 6,
          question: "Clasificarea formelor memoriei în memorie logică şi memorie mecanică are la bază:",
          options: [
            "prezenţa sau absenţa intenţiei de memorare",
            "durata păstrării informaţiilor",
            "gradul de înţelegere a celor memorate",
            "modalitatea informaţională preferenţială"
          ],
          correctAnswer: 2
        },
        {
          id: 7,
          question: "După prezența sau absența intenției de a memora, memorarea poate fi:",
          options: [
            "voluntară sau involuntară",
            "mecanică sau logică",
            "de scurtă durată sau de lungă durată",
            "perceptivă sau verbal"
          ],
          correctAnswer: 0
        },
        {
          id: 8,
          question:
            "Faptul că omul reţine şi reactualizează doar o parte din informaţii evidenţiază o trăsătură a memoriei, şi anume caracterul ei:",
          options: ["selectiv", "mijlocit", "inteligibil", "active"],
          correctAnswer: 0
        }
      ],
      radioSelection: null,
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
      if (chipId === this.radioSelection) {
        if (chipId === this.questions[this.questionPosition].correctAnswer) {
          return { result: true, value: this.resultOptions.correct };
        } else {
          return { result: true, value: this.resultOptions.wrong };
        }
      }
      if (chipId === this.questions[this.questionPosition].correctAnswer && this.radioSelection != null) {
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
        value: this.resultOptions.intermidiate
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
    }
  },
  beforeMount() {
    this.calculateChips();
  }
};
</script>

<style scoped></style>
