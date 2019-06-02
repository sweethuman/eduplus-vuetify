import shuffle from "knuth-shuffle-seeded";
export default {
  namespaced: true,
  state: {
    words: [],
  },
  mutations: {
    addWord(state, word) {
      state.words.push(word);
    },
    removeWord(state, word) {
      state.words.splice(state.words.indexOf(word), 1);
    },
  },
  getters: {
    getOptions: state => originalOption => {
      let arrayCopy = state.words.slice(0);
      if (state.words.length <= 6) return shuffle(arrayCopy);
      let returnArray = [originalOption];
      arrayCopy.splice(arrayCopy.indexOf(originalOption), 1);
      for (let i = 0; i < 5; i++) {
        let pos = Math.floor(Math.random() * arrayCopy.length);
        returnArray.push(arrayCopy[pos]);
        arrayCopy.splice(pos, 1);
      }
      return shuffle(returnArray);
    },
  },
};
