<template>
  <form>
    <v-layout mt-3>
      <v-flex shrink>
        <v-layout
          v-for="(option, i) in exercise.options"
          :key="i"
          align-center
          row
          my-2
          :style="`background: ${getAnswerColor(chipStore[i].value)}; border-radius: 10px`"
          px-2
        >
          <v-flex mr-2>
            <v-checkbox
              v-model="checkboxSelection"
              :value="i"
              :disabled="disabled"
              hide-details
              style="margin-top: 0; padding-bottom: 4px"
            >
              <template #label>
                <span class="black--text">{{ option }}</span>
              </template>
            </v-checkbox>
          </v-flex>
          <v-flex shrink>
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
      </v-flex>
    </v-layout>
  </form>
</template>

<script>
export default {
  name: "MultipleSelection",
  props: {
    exercise: {
      type: Object,
      default: undefined,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkboxSelection: [],
      chipStore: [],
      resultOptions: Object.freeze({ correct: 0, wrong: 1, intermediate: 2 }),
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
      if (this.checkboxSelection.includes(chipId)) {
        if (this.exercise.correctAnswer.includes(chipId)) {
          return { result: true, value: this.resultOptions.correct };
        } else {
          return { result: true, value: this.resultOptions.wrong };
        }
      }
      if (this.checkboxSelection.length !== 0 && this.exercise.correctAnswer.includes(chipId)) {
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
      return this.checkboxSelection.length !== 0;
    },
  },
};
</script>

<style scoped></style>
