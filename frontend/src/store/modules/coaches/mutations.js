export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
    state.userIsCoach = true;
  },
}