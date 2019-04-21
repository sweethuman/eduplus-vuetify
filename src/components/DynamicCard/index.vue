<template>
  <v-card
    class="mb-2 elevation-3"
    style="background: linear-gradient(40deg, rgba(255,216,111,0.4), rgba(252,98,98,0.25)) !important;"
  >
    <v-card-text>
      <h3 class="title ma-2">
        {{ data.question }}
      </h3>
      <v-divider />
      <component :is="activeComponent" ref="component" :exercise="data" :disabled="disabled" />
    </v-card-text>
  </v-card>
</template>

<script>
import SingleSelection from "./templates/SingleSelection";
import MultipleSelection from "./templates/MultipleSelection";
export default {
  name: "DynamicCard",
  components: {
    SingleSelection,
    MultipleSelection,
  },
  props: {
    data: {
      type: Object,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    activeComponent() {
      return Array.isArray(this.data.correctAnswer) ? "MultipleSelection" : "SingleSelection";
    },
  },
};
</script>

<style scoped></style>
