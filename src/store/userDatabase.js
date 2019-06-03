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
      newUser.learningStyle = null;
      state.users.push(newUser);
    },
    updateUser(state, payload) {
      const userToUpdate = state.users.find(user => user.id === payload.id);
      userToUpdate.username = payload.username != null ? payload.username : userToUpdate.username;
      userToUpdate.name = payload.name != null ? payload.name : userToUpdate.name;
      userToUpdate.forename = payload.forename != null ? payload.forename : userToUpdate.forename;
      userToUpdate.email = payload.email != null ? payload.email : userToUpdate.email;
      userToUpdate.password = payload.password != null ? payload.password : userToUpdate.password;
      userToUpdate.learningStyle = payload.learningStyle != null ? payload.learningStyle : userToUpdate.learningStyle;
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
    getUserById: state => id => {
      if (isNaN(id)) throw Error("Id is not a number!");
      id = parseInt(id);
      return state.users.find(user => user.id === id);
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
