export default {
  namespaced: true,
  state: {
    loggedIn: false,
    currentUser: {
      id: 0,
      username: null,
      name: null,
      email: null,
    },
  },
  mutations: {
    setNewUser(state, payload) {
      state.loggedIn = true;
      state.currentUser.id = payload.id;
      state.currentUser.username = payload.username;
      state.currentUser.name = payload.name;
      state.currentUser.email = payload.email;
    },
    resetState(state) {
      state.loggedIn = false;
      state.currentUser = {
        id: 0,
        username: null,
        name: null,
        email: null,
      };
    },
  },
  actions: {
    logIn({ commit, rootGetters }, payload) {
      let result = rootGetters["userDatabase/getUserByUsernameOrEmail"](payload.loginId);
      if (result == null) throw new Error("Username gresit");
      if (result.password !== payload.password) throw new Error("Parola Gresita");
      commit("setNewUser", result);
    },
  },
};
