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
      <component :is="'SingleSelection'" ref="component" :exercise="data" />
    </v-card-text>
  </v-card>
</template>

<script>
import SingleSelection from "./templates/SingleSelection";
export default {
  name: "DynamicCard",
  components: {
    SingleSelection,
  },
  props: {
    data: {
      type: Object,
      default: undefined,
    },
  },
};
</script>

<style scoped></style>
