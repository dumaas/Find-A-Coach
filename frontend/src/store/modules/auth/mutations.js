export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.email = payload.email;
    state.id = payload.id;
    state.didAutoLogout = false;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
  setUserId(state, payload) {
    state.id = payload.id;
  },
}