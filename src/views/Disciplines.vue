<template>
  <v-container fluid fill-height>
    <v-layout justify-space-around align-center>
      <v-flex xs12 md10 lg7>
        <v-container grid-list-lg fluid class="pa-0">
          <v-layout wrap>
            <v-flex v-for="i in $store.state.disciplines.disciplines.length" :key="i" xs12 sm6 md4>
              <content-card :content="generateConent(i - 1)" round></content-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ContentCard from "../components/ContentCard";
import CardContent from "../constructors/cardContent";
export default {
  name: "Disciplines",
  components: {
    ContentCard,
  },
  methods: {
    generateConent(index) {
      let that = this.$store.state.disciplines.disciplines[index];
      return new CardContent(that.title, that.description, that.image + "&w=1000", that.image + "&w=200&q=80");
    },
  },
};
</script>

<style scoped></style>
