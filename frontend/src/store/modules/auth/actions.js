import axios from '../../../axios';

export default {
  async login(context, payload) {
    const response = await axios.post('dj-rest-auth/login/', {
      ...payload,
    }).catch(err => {
        console.log(err);
        const error = new Error(err.message || 'Failed to authenticate. Check your login data!');
        throw error;
      });

    context.commit('setUser', {
      token: response.data.access_token,
    });
  },
  async signup(context, payload) {
    const response = await axios.post('signup/', {
      ...payload,
    }).catch(err => {
        console.log(err);
        const error = new Error(err.message || 'Failed to authenticate. Check your login data!');
        throw error;
      });

    console.log(response)

    context.commit('setUser', {
      token: response.access_token,
    });
  },
}