<template>
  <v-container align-center justify-center fill-height>
    <v-layout v-if="!notFound" column fill-width>
      <v-flex text-xs-center>
        <h2 id="examTitle" class="display-3 my-5">{{ examData.title }}</h2>
      </v-flex>
      <card-list-exam
        v-if="pages != null && !notFound && pages.length !== 0"
        :key="$route.params.name"
        :exam-data="pages"
        @page-change="page = $event"
      />
      <item-not-found
        v-else-if="!$wait.is('loading exam')"
        :text="'Paginile pentru examenul ' + $route.params.name + ' nu au fost gasite!'"
      ></item-not-found>
    </v-layout>
    <item-not-found v-else :text="$route.params.name + ' examen nu a fost gasit!'"></item-not-found>
  </v-container>
</template>

<script>
import CardListExam from "../components/CardListExam";
import ItemNotFound from "../components/ItemNotFound";
import { firestore } from "../firebase";

export default {
  name: "Exam",
  components: { ItemNotFound, CardListExam },
  data() {
    return {
      examData: {
        title: "Loading...",
      },
      pages: [],
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
        let dataSnapshot = await firestore
          .collection("exams")
          .doc(routeObject.params.name)
          .get();
        if (dataSnapshot.exists) {
          this.examData = dataSnapshot.data();
          let querySnapshot = await firestore
            .collection(`/exams/${routeObject.params.name}/pages`)
            .orderBy("subjectIndex", "asc")
            .get();
          this.pages = querySnapshot.docs.map(doc => doc.data());
          this.notFound = false;
        } else {
          this.notFound = true;
        }
      } catch (e) {
        this.notFound = true;
        this.$log.error(e);
      }
      this.$wait.end("loading exam");
    },
  },
};
</script>

<style scoped></style>
