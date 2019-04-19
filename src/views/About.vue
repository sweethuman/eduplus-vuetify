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
                <span class="font-weight-medium">Maths</span>, <span class="font-weight-medium">Romanian</span>,
                <span class="font-weight-medium">Psychology</span> and
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
                <v-flex v-for="card in slide" :key="card.id" xs12 sm4>
                  <v-card height="400">
                    <v-layout fill-height column>
                      <v-flex shrink>
                        <v-img :src="card.image" aspect-ratio="2.75"></v-img>
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
                            <v-icon left>mdi-book-open-page-variant</v-icon>Learn
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
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slideItems: [
        {
          id: 1,
          image:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          title: "Coding Lessons",
          description: "Step by step guide with problems based on the latest Bacalaureat Exam.",
        },
        {
          id: 2,
          image:
            "https://images.unsplash.com/photo-1457904375453-3e1fc2fc76f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          title: "Math Lessons",
          description: "From the basics to the advanced. Complete lessons on everything you need to know about maths.",
        },
        {
          id: 3,
          image:
            "https://images.unsplash.com/photo-1542412138098-8f997794d3d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          title: "Study Romanian",
          description: "Take this class and improve all your knowledge about Bacovia, Eminescu and may others.",
        },
        {
          id: 4,
          image:
            "https://images.unsplash.com/photo-1470172201050-cecdf8133607?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          title: "Physics",
          description: "Discover the inner-workings of The Universe!",
        },
        {
          id: 5,
          image:
            "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          title: "Chemistry",
          description:
            "Atoms are special. So are the relationships between them. Now let's see how combining them can create the most amazing things!",
        },
        {
          id: 6,
          image:
            "https://images.unsplash.com/photo-1549925245-8a7a48495212?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          title: "Psychology",
          description:
            "What if we learned how the inside works? Let's delve deep into the human consciousness and analyze why people do what they do..",
        },
      ],
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
  },
};
</script>
