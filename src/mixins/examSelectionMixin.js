export const examSelectionMixin = {
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
  },
};
