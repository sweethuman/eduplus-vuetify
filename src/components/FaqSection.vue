<template>
  <v-layout fill-height align-center justify-center>
    <v-flex v-if="$vuetify.breakpoint.mdAndUp" shrink class="mr-1">
      <v-btn fab class="peach-gradient-reversed" dark large @click="prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs12 lg8>
      <v-window v-model="slide" class="elevation-0 my-5" dark>
        <v-window-item v-for="(itemGroup, i) in structuredItems" :key="i">
          <v-layout justify-space-between fill-height>
            <v-flex
              v-for="(faqItem, j) in itemGroup"
              :key="'' + i + j"
              xs12
              v-bind="cardSizeOnMedium(itemGroup.length)"
            >
              <v-card class="mx-1" min-height="200px" height="100%" hover>
                <v-layout justify-center fill-height column>
                  <v-flex shrink>
                    <v-card-title primary-title>
                      <h3 class="headline mb-0">
                        {{ faqItem.question }}
                      </h3>
                    </v-card-title>
                  </v-flex>

                  <v-flex shrink>
                    <v-card-text>
                      {{ faqItem.response }}
                    </v-card-text>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-window-item>
      </v-window>
    </v-flex>
    <v-flex v-if="$vuetify.breakpoint.mdAndUp" shrink class="ml-1">
      <v-btn fab class="peach-gradient" dark large @click="next">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { firestore } from "../firebase";

export default {
  name: "FaqSection",
  data() {
    return {
      slide: 0,
      faq: {
        items: [],
      },
    };
  },
  computed: {
    structuredItems() {
      let i = 0;
      let itemPerRow = this.$vuetify.breakpoint.mdAndUp ? 3 : 1;
      let arrayOfSlides = [];
      while (i < this.faq.items.length) {
        let a = [];
        for (let j = 0; j < itemPerRow && i + j < this.faq.items.length; j++) {
          a.push(this.faq.items[i + j]);
        }
        arrayOfSlides.push(a);
        i += itemPerRow;
      }
      return arrayOfSlides;
    },
  },
  methods: {
    prev() {
      this.slide = this.slide - 1 < 0 ? this.structuredItems.length - 1 : this.slide - 1;
    },
    next() {
      this.slide++;
    },
    cardSizeOnMedium(numberOfItems) {
      let itemLength = 12 / numberOfItems;
      return ["md" + itemLength];
    },
  },
  firestore: {
    faq: firestore.collection("public_data").doc("faq"),
  },
};
</script>

<style scoped></style>
