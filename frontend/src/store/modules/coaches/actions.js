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

    const response = await axios.post('', {
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
}