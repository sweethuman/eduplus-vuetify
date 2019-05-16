<template>
  <v-card>
    <v-card-text>
      <h2 v-if="text != null" class="display-3 font-weight-regular mb-3">{{ text }}</h2>
      <h3 class="display-2">
        Pe Subiect ai
        <span class="red--text">{{ points }}</span>
        puncte din
        <span class="green--text">{{ maxPoints }}</span>
        puncte!
      </h3>
      <h3 v-if="allPoints != null && maxAllPoints != null" class="display-2">
        In Total ai
        <span class="red--text">{{ allPoints }}</span>
        puncte din
        <span class="green--text">{{ maxAllPoints }}</span>
        puncte!
      </h3>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ExamResult",
  props: {
    points: {
      type: Number,
      required: true,
    },
    maxPoints: {
      type: Number,
      required: true,
    },
    allPoints: {
      type: Number,
      default: null,
    },
    maxAllPoints: {
      type: Number,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped></style>
