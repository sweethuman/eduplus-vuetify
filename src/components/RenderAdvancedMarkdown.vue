<template>
  <v-runtime-template :template="markation"></v-runtime-template>
</template>

<script>
import VRuntimeTemplate from "v-runtime-template";
import FillWord from "./FillWord";
import markdownIt from "../jsUtilities/markdownIt";
export default {
  name: "RenderAdvancedMarkdown",
  components: { VRuntimeTemplate, FillWord },
  props: {
    markdown: {
      type: String,
      required: true,
    },
  },
  computed: {
    markation() {
      return "<div>" + markdownIt.render(this.markdown) + "</div>";
    },
  },
};
</script>

<style scoped></style>
