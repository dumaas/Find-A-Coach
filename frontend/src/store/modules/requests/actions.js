import axios from '../../../axios';

export default {
  async contactCoach(context, payload) {
    const formattedCoachUrl = 'http://localhost:8000/coaches/' + payload.coachId + '/';
    const newRequest = {
      coach: formattedCoachUrl,
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await axios.post('messages/', {
      ...newRequest,
    }).catch(err => {
        console.log(err);
        const error = new Error(err.message || 'Failed to send request!');
        throw error;
      });

    newRequest.id = response.name;

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;

    const token = context.rootGetters.token;
    const response = await axios.get('messages/', {
      headers: {
        common: {
          'Authorization': token,
        },
      }
    }).catch(err => {
        console.log(err);
        const error = new Error(err.message || 'Failed to fetch request messages!');
        throw error;
      });

    const requests = []

    response.data.forEach(
      (message, key) => {
        let url = message.coach;
        let coachToRequest = url.substring(url.indexOf('/', 22)+1, url.lastIndexOf('/'));

        if (coachToRequest === coachId) {
          const request = {
            id: key+1,
            coach: coachId,
            userEmail: message.userEmail,
            message: message.message,
          };
          requests.push(request);
        }
    });

    context.commit('setRequests', requests);
  },
}