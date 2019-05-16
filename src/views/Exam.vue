<template>
  <v-container align-content-space-around>
    <v-layout text-xs-center>
      <v-flex>
        <h2 id="examTitle" class="display-3 my-5">{{ examData.title }}</h2>
      </v-flex>
    </v-layout>
    <card-list-exam :exam-data="examData.exam" />
  </v-container>
</template>

<script>
import CardListExam from "../components/CardListExam";
import ExampleTest from "../data/exams/exampleTest";

export default {
  name: "Exam",
  components: { CardListExam },
  data() {
    return {
      examData: ExampleTest,
    };
  },
};
</script>

<style scoped></style>
