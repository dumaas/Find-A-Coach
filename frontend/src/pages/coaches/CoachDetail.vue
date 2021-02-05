<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge v-for="area in selectedCoach.areas" :key="area" :type="area" :title="area"></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
  export default {
    props: ['id'],
    data() {
      return {
        isLoading: false,
        error: null,
        selectedCoach: null,
      };
    },
    computed: {
      fullName() {
        return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
      },
      areas() {
        return this.selectedCoach.areas;
      },
      rate() {
        return this.selectedCoach.hourlyRate;
      },
      description() {
        return this.selectedCoach.description;
      },
      contactLink() {
        return this.$route.path + '/contact';
      },
    },
    created() {
      this.isLoading = true;

      let coachId = Number(this.id);
      let myProxy = this.$store.getters['coaches/coaches']
      let myTarget = JSON.parse(JSON.stringify(myProxy))

      let findSelectedCoach = myTarget.find(
        (coach) => coach.id === coachId
      );

      try {
        this.selectedCoach = findSelectedCoach;
      } catch(error) {
          this.error = error.message || 'Something went wrong!';
      }

      this.isLoading = false;
    },
    methods: {
      handleError() {
        this.error = null;
      },
    },
  };
</script>
