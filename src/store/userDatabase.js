export default {
  namespaced: true,
  state: {
    users: [],
  },
  mutations: {
    addUser(state, payload) {
      const newUser = {};
      newUser.id = state.users.length;
      newUser.username = payload.username;
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
      return state.users.find(user => user.username === username);
    },
    getUserByUsernameOrEmail: (state, getters) => payload => {
      let result = getters.getUserByEmail(payload);
      if (result == null) result = getters.getUserByUsername(payload);
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
