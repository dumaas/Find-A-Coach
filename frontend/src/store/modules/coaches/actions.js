import axios from '../../../axios';

export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      email: userId,
    };

    const token = context.rootGetters.token;

    const response = await axios.post('coaches/', {
      ...coachData,
      areas: data.areas.toString(),
    },
    {
      headers: {
        common: {
          'Authorization': token,
        },
      }
    }).catch(err => {
        console.log(err);
        const error = new Error(err.message || 'Failed to register coach!');
        throw error;
      });

    console.log(response.data)

    context.commit('registerCoach', {
      ...coachData,
      id: userId,
      areas: data.areas,
    });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await axios.get('coaches/')
      .catch(err => {
        console.log(err);
        const error = new Error(err.message || 'Failed to fetch!');
        throw error;
      });

    const coaches = [];

    for (const key in response.data) {
      const coach = {
        id: response.data[key].id,
        firstName: response.data[key].firstName,
        lastName: response.data[key].lastName,
        description: response.data[key].description,
        hourlyRate: response.data[key].hourlyRate,
        areas: response.data[key].areas.split(',').sort().reverse(),
        email: response.data[key].email,
      }
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
}