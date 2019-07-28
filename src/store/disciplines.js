import _ from "lodash";
import reflectPromise from "../jsUtilities/promiseReflect";
import { firestore } from "../firebase";
import { firestoreAction } from "vuexfire";

export default {
  namespaced: true,
  state: {
    disciplines: [],
    //this lesson structure is only for example
    lessonStructure: {
      romanian: [
        {
          id: "autori",
          name: "Autori",
          order: 0,
          lessons: [
            {
              name: "Mircea Eliate",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            },
          ],
        },
      ],
    },
  },
  mutations: {
    setDisciplines(state, disciplines) {
      state.disciplines = disciplines;
    },
    setChapters(state, payload) {
      this._vm.$set(state.lessonStructure, payload.discipline, payload.chapters);
    },
    setLessonsToChapter(state, payload) {
      let destinationIndex = _.findIndex(state.lessonStructure[payload.disciplineId], function(chapterObject) {
        return chapterObject.id === payload.chapterId;
      });
      if (destinationIndex === -1) {
        state.lessonStructure[payload.disciplineId].push({ id: payload.chapterId });
        destinationIndex = state.lessonStructure[payload.disciplineId].length - 1;
      }
      this._vm.$set(state.lessonStructure[payload.disciplineId][destinationIndex], "lessons", payload.lessons);
    },
  },
  getters: {
    isLessonStructure: state => disciplineName => {
      return state.lessonStructure[disciplineName] != null;
    },
    getDisciplineTitle: state => disciplineName => {
      let result = _.find(state.disciplines, ["name", disciplineName]);
      if (result == null) return result;
      return result.title;
    },
  },
  actions: {
    loadDisciplines: firestoreAction(function({ bindFirestoreRef }) {
      return bindFirestoreRef("disciplines", firestore.collection("disciplines"));
    }),
    async getDisciplineChapters({ commit }, discipline) {
      let chapters = await import(`../data/chapters/${discipline}.json`);
      let sendPayload = {};
      let sortedChapters = _.sortBy(chapters.default, o => o.order);
      sendPayload.discipline = discipline;
      sendPayload.chapters = sortedChapters;
      commit("setChapters", sendPayload);
    },
    async getChapterLessons({ commit }, payload) {
      let lessonsList = {};
      try {
        lessonsList = await import(`../data/lessons/${payload.disciplineId}/${payload.chapterId}/lessons.json`);
      } catch (e) {
        throw new Error(
          `There is no Discipline or Chapter with the given ID: ${payload.disciplineId}/${payload.chapterId}`
        );
      }
      let lessonPromises = [];
      _.forEach(lessonsList.default, async function(lessonId) {
        lessonPromises.push(
          import(`../data/lessons/${payload.disciplineId}/${payload.chapterId}/${lessonId}/data.json`)
        );
      });
      let lessonFinishedPromises = await Promise.all(lessonPromises.map(reflectPromise));
      let lessonArray = [];
      _.forEach(lessonFinishedPromises, function(lessonFin, index) {
        if (lessonFin.succeeded) {
          lessonFin.result.default.id = lessonsList.default[index];
          lessonArray.push(lessonFin.result.default);
        }
        //TODO add a way to show error
        //unhandled errored promises, happens when the id of the lesson is in lessons.json but the 'lessonId/data.json' doesn't exist
        //NOTE must add a way to handle network errors for weird imports and detect error types
      });
      commit("setLessonsToChapter", {
        ...payload,
        lessons: lessonArray,
      });
    },
    async setDisciplineLessonStructure({ state, dispatch }, discipline) {
      try {
        //get's chapters, throws error if lesson json not found in 'data/chapters/'
        await dispatch("getDisciplineChapters", discipline);
      } catch (e) {
        throw new Error(`${discipline} NOT FOUND`);
      }
      let chapterPromises = [];
      //runs through all the chapters and loads their lessons inside the lessonsStructure[discipline][chapterIndex].lessons
      _.forEach(state.lessonStructure[discipline], function(chapter) {
        chapterPromises.push(
          dispatch("getChapterLessons", {
            disciplineId: discipline,
            chapterId: chapter.id,
          })
        );
      });
      let chapterFinishedPromises = await Promise.all(chapterPromises.map(reflectPromise));
      //errors are created when there is a chapter declared but there is no folder or lessons.json in a folder with the chapter name
      _.forEach(chapterFinishedPromises, function(chapterPromise) {
        //TODO add here the high order function to handle weird error in getChapter
      });
    },
  },
};
