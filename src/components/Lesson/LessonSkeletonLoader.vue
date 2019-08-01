<template>
  <v-card height="100%" width="100%">
    <v-layout align-center fill-height justify-center>
      <v-flex xs6>
        <bullet-list-loader style="width: 100%"></bullet-list-loader>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { BulletListLoader } from "vue-content-loader";
export default {
  name: "LessonSkeletonLoader",
  components: { BulletListLoader },
};
</script>

<style scoped></style>
