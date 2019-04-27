export default {
  namespaced: true,
  state: {
    users: [],
  },
  mutations: {
    addUser(state, payload) {
      const newUser = {};
      newUser.id = state.users.length;
      newUser.username = payload.username.toLowerCase();
      newUser.name = payload.name;
      newUser.forename = payload.forename;
      newUser.email = payload.email;
      newUser.password = payload.password;
      state.users.push(newUser);
    },
  },
  getters: {
    getUserByEmail: state => email => {
      return state.users.find(user => user.email === email);
    },
    getUserByUsername: state => username => {
      username = username.toLowerCase();
      return state.users.find(user => user.username === username);
    },
    getUserByUsernameOrEmail: (state, getters) => loginId => {
      let result = getters.getUserByEmail(loginId);
      if (result == null) result = getters.getUserByUsername(loginId);
      return result;
    },

    checkIfEmailExists: (state, getters) => email => {
      let result = getters.getUserByEmail(email);
      return result != null;
    },
    checkIfUsernameExists: (state, getters) => username => {
      let result = getters.getUserByUsername(username);
      return result != null;
    },
  },
};
