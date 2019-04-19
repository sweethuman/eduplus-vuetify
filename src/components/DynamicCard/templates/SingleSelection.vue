<template>
  <form>
    <v-radio-group v-model="radioSelection" :disabled="answered" hide-details>
      <v-layout
        v-for="(option, i) in exercise.options"
        :key="i"
        align-center
        row
        :style="`background: ${getAnswerColor(chipStore[i].value)}; border-radius: 10px`"
        my-1
        px-2
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
</template>

<script>
export default {
  name: "SingleSelection",
  props: {
    exercise: {
      type: Object,
      default: undefined,
      required: true,
    },
  },
  data() {
    return {
      radioSelection: null,
      chipStore: [],
      resultOptions: Object.freeze({ correct: 0, wrong: 1, intermediate: 2 }),
      answered: false,
    };
  },
  beforeMount() {
    //Sets initial chip values to disabled(false)
    //Chips are the indicators next to the label that say if you're answer is correct or not
    this.calculateChips();
  },
  methods: {
    getLabelText(value) {
      if (value === this.resultOptions.correct) return "Corect";
      if (value === this.resultOptions.wrong) return "Gresit";
      if (value === this.resultOptions.intermediate) return "Raspunsul Corect";
      return "";
    },
    getAnswerColor(value) {
      if (value === this.resultOptions.correct) return "#c6e377";
      if (value === this.resultOptions.wrong) return "#ef6c57";
      if (value === this.resultOptions.intermediate) return "#c6e377";
      return "";
    },
    showChip(chipId) {
      if (chipId === this.radioSelection) {
        if (chipId === this.exercise.correctAnswer) {
          return { result: true, value: this.resultOptions.correct };
        } else {
          return { result: true, value: this.resultOptions.wrong };
        }
      }
      if (chipId === this.exercise.correctAnswer && this.radioSelection != null) {
        return { result: true, value: this.resultOptions.intermediate };
      }
      return { result: false };
    },
    calculateChips() {
      let points = 0;
      for (let j = 0; j < this.exercise.options.length; j++) {
        let tempChipValue = this.showChip(j);
        if (tempChipValue.result === true && tempChipValue.value === this.resultOptions.correct) {
          ++points;
        }
        this.$set(this.chipStore, j, tempChipValue);
      }
      return points;
    },
    isAnswerChecked() {
      return this.radioSelection != null;
    },
    //TODO use vuex store to set page to answered
    makeAnswered() {
      this.answered = true;
    },
  },
};
</script>

<style scoped></style>
