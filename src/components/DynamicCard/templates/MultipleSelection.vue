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
                <span :class="textColorOnTheme">{{ option }}</span>
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
import { examSelectionMixin } from "../../../mixins/examSelectionMixin";
import { textUtilitiesMixin } from "../../../mixins/utilitiesMixins";

export default {
  name: "MultipleSelection",
  mixins: [examSelectionMixin, textUtilitiesMixin],
  data() {
    return {
      checkboxSelection: [],
    };
  },
  methods: {
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
    isAnswerChecked() {
      return this.checkboxSelection.length !== 0;
    },
    calculateMaxPoints() {
      return this.exercise.correctAnswer.length;
    },
  },
};
</script>

<style scoped></style>
