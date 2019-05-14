<template>
  <v-card height="100%" width="100%">
    <v-layout align-center fill-height justify-center>
      <v-flex grow>
        <v-expansion-panel popout>
          <v-expansion-panel-content
            v-for="(chapter, i) in data"
            :key="i"
            ripple
            lazy
            :disabled="chapter.lessons == null || chapter.lessons.length === 0"
          >
            <template #actions>
              <v-icon color="primary">$vuetify.icons.expand</v-icon>
            </template>
            <template #header>
              <div>{{ romanization(i + 1) }}. {{ chapter.title }}</div>
            </template>
            <v-card>
              <v-card-title primary-title></v-card-title>
              <v-expansion-panel popout>
                <v-expansion-panel-content v-for="(lesson, j) in chapter.lessons" :key="j" ripple lazy>
                  <template #actions>
                    <v-icon color="primary">$vuetify.icons.expand</v-icon>
                  </template>
                  <template #header>
                    <div>{{ romanization(i + 1) }}.{{ j + 1 }}. {{ lesson.name }}</div>
                  </template>
                  <v-card>
                    <v-card-text>
                      {{ lesson.description }}
                    </v-card-text>
                    <v-card-actions v-if="lesson.styles != null && lesson.styles.length !== 0">
                      <v-spacer></v-spacer>
                      <v-btn
                        dark
                        large
                        round
                        class="soundcloud-gradient"
                        :to="generateLink(disciplineId, chapter.id, lesson.id)"
                      >
                        Invata
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import romanize from "romanize";
export default {
  name: "DisciplineViewer",
  props: {
    data: {
      type: Array,
      required: true,
    },
    disciplineId: {
      type: String,
      required: true,
    },
  },
  methods: {
    romanization(number) {
      return romanize(number);
    },
    generateLink(disciplineId, chapterId, lessonId) {
      return "/lesson/" + disciplineId + "/" + chapterId + "/" + lessonId;
    },
  },
};
</script>

<style>
.v-expansion-panel--popout .v-expansion-panel--popout .v-expansion-panel__container--active {
  max-width: 95%;
}
</style>
