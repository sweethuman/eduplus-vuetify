<template>
  <v-layout align-start justify-center fill-height>
    <v-flex md10 lg8>
      <v-card height="100%" width="100%">
        <bullet-list-loader style="width: 100%"></bullet-list-loader>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { BulletListLoader } from "vue-content-loader";
export default {
  name: "LessonSkeletonLoader",
  components: { BulletListLoader },
};
</script>

<style scoped></style>
