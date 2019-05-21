<template>
  <div class="about">
    <v-container fluid grid-list-xs>
      <v-layout fill-height mb-5>
        <v-flex xs12 sm8 offset-sm2>
          <v-card class="elevation-15">
            <v-card-title primary-title>
              <div>
                <h1 class="display-4 font-weight-thin mb-1">EDU+</h1>
                <h4 class="display-1 font-weight-thin font-italic">
                  Your learning journey starts here
                </h4>
              </div>
            </v-card-title>
            <v-card-text>
              <h5 class="headline">
                This is an open platform that helps you start learning the things that matter most in the way you need
                to.
              </h5>
              <h5 class="headline">
                To get started just take the test or find the lesson you need amongst the ones that we offer.
              </h5>
              <h5 class="headline">
                There are plenty of options for a lot of subject such as
                <span class="font-weight-medium">Maths</span>
                ,
                <span class="font-weight-medium">Romanian</span>
                ,
                <span class="font-weight-medium">Psychology</span>
                and
                <span class="font-weight-medium">Physics</span>
              </h5>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout fill-height>
        <v-flex xs12 sm8 offset-sm2>
          <v-carousel
            hide-delimiters
            class="elevation-0"
            height="400"
            :interval="$vuetify.breakpoint.mdAndUp ? 10000 : 3500"
            hide-controls
            vertical
          >
            <v-carousel-item v-for="(slide, i) in slideFormatted" :key="i">
              <v-layout align-center justify-space-between fill-height>
                <v-flex v-for="card in slide" :key="card.id" xs12 md4>
                  <v-card height="400">
                    <v-layout fill-height column>
                      <v-flex shrink>
                        <v-img :src="card.image" aspect-ratio="2.75">
                          <template #placeholder>
                            <v-layout fill-height align-center justify-center ma-0>
                              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-layout>
                          </template>
                        </v-img>
                      </v-flex>

                      <v-flex grow>
                        <v-card-title primary-title>
                          <div>
                            <h3 class="headline mb-0">{{ card.title }}</h3>
                            <div>{{ card.description }}</div>
                          </div>
                        </v-card-title>
                      </v-flex>

                      <v-flex shrink class="ml-2 mb-2">
                        <v-card-actions>
                          <v-btn color="orange" class="peach-gradient" large @click="snackbar = true">
                            <v-icon left>mdi-book-open-page-variant</v-icon>
                            Learn
                          </v-btn>
                        </v-card-actions>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar v-model="snackbar" color="error" :timeout="5000">
      Sorry. Lesson isn't active yet.
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
    };
  },
  computed: {
    slideFormatted: function() {
      let i = 0;
      let itemPerRow = this.$vuetify.breakpoint.mdAndUp ? 3 : 1;
      let arrayOfSlides = [];
      while (i < this.slideItems.length) {
        let a = [];
        for (let j = 0; j < itemPerRow; j++) {
          a.push(this.slideItems[i + j]);
        }
        arrayOfSlides.push(a);
        i += itemPerRow;
      }
      return arrayOfSlides;
    },
    slideItems: function() {
      return this.$store.state.disciplines.disciplines;
    },
  },
  async beforeCreate() {
    this.$wait.start("loading disciplinesForCarousel");
    await this.$store.dispatch("disciplines/loadDisciplines");
    this.$wait.end("loading disciplinesForCarousel");
  },
};
</script>
