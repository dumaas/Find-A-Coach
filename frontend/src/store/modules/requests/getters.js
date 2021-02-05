export default {
  requests(state) {
    let myProxy = state.requests
    let myTarget = JSON.parse(JSON.stringify(myProxy))

    let requests = []

    myTarget.forEach(
      req => requests.push(req)
    );

    return requests;
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  },
}