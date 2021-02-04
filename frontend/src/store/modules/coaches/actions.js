import axios from '../../../axios';

export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
    };

    const response = await axios.post('coaches', {
      ...coachData,
      areas: data.areas.toString(),
    })

    const responseData = await response;

    if (!response.ok) {
      // error ...
      console.log(responseData)
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId,
      areas: data.areas,
    });
  },
  async loadCoaches(context) {
    const response = await axios.get('coaches')
      .catch(err => {
        console.log(err);
        const error = new Error(err.message || 'Failed to fetch!');
        throw error;
      });

    const coaches = [];

    for (const key in response.data) {
      const areas = response.data[key].areas.split(',').sort().reverse()
      const id = Number([key]) + 1;
      const coach = {
        id: id,
        firstName: response.data[key].firstName,
        lastName: response.data[key].lastName,
        description: response.data[key].description,
        hourlyRate: response.data[key].hourlyRate,
        areas: areas,
      }
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
  },
}