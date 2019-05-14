import _ from "lodash";
import reflectPromise from "../jsUtilities/promiseReflect";
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
    async loadDisciplines({ commit }) {
      let disciplines = await import("../data/disciplines");
      commit("setDisciplines", disciplines.default);
    },
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
        //TODO add a way to show error, because if a lesson is declared and it is not added an error should be shown
        //NOTE must add a way to handle network errors for weird imports and detect error types
      });
      commit("setLessonsToChapter", {
        ...payload,
        lessons: lessonArray,
      });
    },
    async setDisciplineLessonStructure({ state, dispatch }, discipline) {
      try {
        await dispatch("getDisciplineChapters", discipline);
      } catch (e) {
        throw new Error(`${discipline} NOT FOUND`);
      }
      let chapterPromises = [];
      _.forEach(state.lessonStructure[discipline], function(chapter) {
        chapterPromises.push(
          dispatch("getChapterLessons", {
            disciplineId: discipline,
            chapterId: chapter.id,
          })
        );
      });
      let chapterFinishedPromises = await Promise.all(chapterPromises.map(reflectPromise));
      _.forEach(chapterFinishedPromises, function(chapterPromise) {
        //TODO add here the high order function to handle weird error in getChapter
      });
    },
  },
};
