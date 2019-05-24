<template>
  <v-container align-center justify-center fill-height>
    <v-layout v-if="!notFound" column fill-width>
      <v-flex text-xs-center>
        <h2 id="examTitle" class="display-3 my-5">{{ examData.title }}</h2>
      </v-flex>
      <card-list-exam
        v-if="examData.exam != null && !notFound"
        :key="$route.params.name"
        :exam-data="examData.exam"
        @page-change="page = $event"
      />
    </v-layout>
    <item-not-found v-if="notFound" :text="$route.params.name + ' examen nu a fost gasit!'"></item-not-found>
  </v-container>
</template>

<script>
import CardListExam from "../components/CardListExam";
import ItemNotFound from "../components/ItemNotFound";

export default {
  name: "Exam",
  components: { ItemNotFound, CardListExam },
  data() {
    return {
      examData: {
        title: "Loading...",
      },
      notFound: false,
      page: 0,
    };
  },
  computed: {
    pageTitle() {
      return this.examData.title + " - " + this.page;
    },
  },
  async created() {
    await this.loadExam(this.$route);
  },
  async beforeRouteUpdate(to, from, next) {
    await this.loadExam(to);
    next();
  },
  methods: {
    async loadExam(routeObject) {
      this.$wait.start("loading exam");
      try {
        let exam = await import(`../data/exams/${routeObject.params.name}.json`);
        this.examData = exam.default;
        this.notFound = false;
      } catch (e) {
        this.notFound = true;
      }
      this.$wait.end("loading exam");
    },
  },
};
</script>

<style scoped></style>
