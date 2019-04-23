<template>
  <form>
    <v-radio-group v-model="radioSelection" :disabled="disabled" hide-details>
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
import { examSelectionMixin } from "../../../mixins/examSelectionMixin";

export default {
  name: "SingleSelection",
  mixins: [examSelectionMixin],
  data() {
    return {
      radioSelection: null,
    };
  },
  methods: {
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
    isAnswerChecked() {
      return this.radioSelection != null;
    },
  },
};
</script>

<style scoped></style>
