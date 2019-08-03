import _ from "lodash";
import { firestore } from "../firebase";
import { firestoreAction } from "vuexfire";
import Vue from "vue";

export default {
  namespaced: true,
  state: {
    //this disciplines structure is only for example
    disciplines: [
      {
        id: "romanian", //when coming from firestore `id` is non-enumerable
        title: "Romana",
        image: "imaginea de fundal",
        description: "o descriere",
      },
    ],
    //this chapters structure is only for example
    chapters: {
      romanian: [
        {
          id: "autori", //when coming from firestore `id` is non-enumerable
          title: "Autori",
          order: 0,
        },
      ],
    },
    //this lessons structure is only for example
    lessons: {
      romanian: {
        autori: [
          {
            id: "lessonId", //when coming from firestore `id` is non-enumerable
            title: "title",
            description: "o descriere",
          },
        ],
      },
    },
    currentLessonIndex: 0,
  },
  mutations: {
    changeCurrentLessonIndex(state, newIndex) {
      state.currentLessonIndex = newIndex;
    },
  },
  getters: {
    isReadyToLoadChapters: state => disciplineName => {
      return (
        state.chapters[disciplineName] != null &&
        state.chapters[disciplineName] !== 0 &&
        state.lessons[disciplineName] != null
      );
    },
    getDisciplineTitle: state => disciplineName => {
      let result = _.find(state.disciplines, ["id", disciplineName]);
      if (result == null) return result;
      return result.title;
    },
  },
  actions: {
    loadDisciplines: firestoreAction(function({ bindFirestoreRef }) {
      return bindFirestoreRef("disciplines", firestore.collection("disciplines"));
    }),
    loadChapters: firestoreAction(function({ bindFirestoreRef, state }, discipline) {
      //Vue.set is needed to set the reactivity and the object structure before binding the firestore data
      //VueFire can't set it itself
      if (state.chapters[discipline] == null) {
        Vue.set(state.chapters, discipline, []);
      }
      return bindFirestoreRef(
        `chapters.${discipline}`,
        firestore.collection(`disciplines/${discipline}/chapters`).orderBy("order", "asc")
      );
    }),
    loadLessons: firestoreAction(function({ bindFirestoreRef, state }, payload) {
      //Vue.set is needed to set the reactivity and the object structure before binding the firestore data
      //VueFire can't set it itself
      if (state.lessons[payload.discipline] == null) {
        Vue.set(state.lessons, payload.discipline, {});
      }
      if (state.lessons[payload.discipline][payload.chapter] == null) {
        Vue.set(state.lessons[payload.discipline], payload.chapter, []);
      }
      return bindFirestoreRef(
        `lessons.${payload.discipline}.${payload.chapter}`,
        firestore
          .collection(`disciplines/${payload.discipline}/chapters/${payload.chapter}/lessons`)
          .orderBy("order", "asc")
      );
    }),
  },
};
