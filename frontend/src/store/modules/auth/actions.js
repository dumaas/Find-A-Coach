import axios from '../../../axios';

let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = 'dj-rest-auth/login/';

    if (mode === 'signup') {
      url = 'signup';
    }

    const response = await axios.post(url, {
      ...payload,
    }).catch(err => {
        console.log(err);
        const error = new Error(err.message || 'Failed to authenticate. Check your login data!');
        throw error;
      });

    let id = null;
    let email = response.data.user.email;
    let current = new Date();
    let token_expiration = new Date(current.getTime() + 3600000)
    let expiresIn = +token_expiration - new Date().getTime();
    let newToken = 'Bearer ' + response.data.access_token;

    // get userId
    context.rootState.coaches.coaches.forEach(
      coach => {
        if (coach.email === email) {
          id = coach.id.toString();
          context.commit('coaches/assignCoach');
          context.commit('setUserId', { id: id })
          localStorage.setItem('userId', id)
        }
      }
    );

    localStorage.setItem('token', newToken);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('tokenExpiration', token_expiration);

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn)

    context.commit('setUser', {
      token: newToken,
      email: email,
      id: id,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    const id = localStorage.getItem('userId');
    let tokenExpiration = localStorage.getItem('tokenExpiration');
    let expiresIn = 0;

    if (tokenExpiration) {
      tokenExpiration = new Date(tokenExpiration)
      expiresIn = +tokenExpiration - new Date().getTime();
    }

    if (expiresIn < 60000) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout')
    }, expiresIn);

    if (token) {
      context.commit('setUser', {
        token: token,
        email: email,
        id: id,
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
    })
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
}