<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred." @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <section>
      <base-card>
        <h2>Log in!</h2>
        <login-form @save-data="saveData"></login-form>
      </base-card>
    </section>
  </div>
</template>

<script>
  import LoginForm from '../../components/auth/LoginForm.vue'

  export default {
    components: {
      LoginForm,
    },
    data() {
      return {
        isLoading: false,
        error: null,
      };
    },
    methods: {
      async saveData(data, mode) {
        this.isLoading = true;

        try {
          if (mode === 'login') {
            await this.$store.dispatch('login', data);
          } else {
            await this.$store.dispatch('signup', {
              username: data.username,
              password1: data.password,
              password2: data.password,
              email: data.email,
            })
          }
          const redirectUrl = '/' + (this.$route.query.redirect || 'coaches')
          this.$router.replace(redirectUrl)
        } catch(err) {
          this.error = err.message || 'Failed to authenticated, try again later!';
        }

        this.isLoading = false;
      },
      handleError() {
        this.error = null;
      },
    },
  }
</script>
