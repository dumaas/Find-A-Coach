export default {
  setUser(state, payload) {
    state.token = 'Bearer ' + payload.token;
  },
}