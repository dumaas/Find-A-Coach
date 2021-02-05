<template>
  <div>
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
    methods: {
      saveData(data) {
        this.$store.dispatch('coaches/registerCoach', data);
        this.$router.replace('/coaches');
      },
    },
  }
</script>
