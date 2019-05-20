<template>
  <v-btn :to="'/exam/' + testId" dark class="sublimelight-gradient" large>
    <v-icon left>mdi-book-open-outline</v-icon>
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: "GoToExamButton",
  props: {
    testId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
