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
      state.currentUser.forename = payload.forename;
      state.currentUser.email = payload.email;
    },
    resetState(state) {
      state.loggedIn = false;
      state.currentUser = {
        id: 0,
        username: null,
        name: null,
        forename: null,
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
    register({ commit, rootGetters }, payload) {
      if (
        payload == null ||
        payload.username == null ||
        payload.name == null ||
        payload.forename == null ||
        payload.email == null ||
        payload.password == null
      )
        throw new Error("Unul sau Mai multe campuri sunt goale");
      if (rootGetters["userDatabase/checkIfEmailExists"](payload.email)) throw new Error("Email exista deja");
      if (rootGetters["userDatabase/checkIfUsernameExists"](payload.username)) throw new Error("Username exista deja");
      commit(
        "userDatabase/addUser",
        {
          username: payload.username,
          name: payload.name,
          forename: payload.forename,
          email: payload.email,
          password: payload.password,
        },
        { root: true }
      );
    },
    updateCurrentUser({ state, commit }, payload) {
      const userToUpdate = {};
      userToUpdate.id = state.currentUser.id;
      userToUpdate.username = payload.username != null ? payload.username : state.currentUser.username;
      userToUpdate.name = payload.name != null ? payload.name : state.currentUser.name;
      userToUpdate.forename = payload.forename != null ? payload.forename : state.currentUser.forename;
      userToUpdate.email = payload.email != null ? payload.email : state.currentUser.email;
      commit("setNewUser", userToUpdate);
      commit("userDatabase/updateUser", userToUpdate, { root: true });
    },
    updateCurrentPassword({ state, commit, rootGetters }, payload) {
      let user = rootGetters["userDatabase/getUserById"](state.currentUser.id);
      if (user == null) throw new Error("USER DOES NOT EXIST! CRITICAL ERROR!");
      if (user.password !== payload.oldPassword) throw new Error("Old Password is Wrong!");
      commit("userDatabase/updateUser", { id: state.currentUser.id, password: payload.newPassword }, { root: true });
    },
  },
};
