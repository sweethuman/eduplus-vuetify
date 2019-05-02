<template>
  <v-card>
    <v-card-text>
      <h2 class="display-3 font-weight-regular mb-3">Ai terminat testul!</h2>
      <h3 class="display-2">
        Ai
        <span class="red--text">{{ points }}</span>
        puncte din
        <span class="green--text">{{ maxPoints }}</span>
        puncte!
      </h3>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ExamResult",
  props: {
    points: Number,
    maxPoints: Number,
  },
};
</script>

<style scoped></style>
