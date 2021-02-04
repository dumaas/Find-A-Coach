<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid: !email.isValid}">
      <label for="email">Your Email</label>
      <input type="email" id="email" v-model.trim="email.val" @blur="clearValidity('email')" />
      <p class="errors" v-if="!email.isValid">Please provide a valid email address.</p>
    </div>
    <div class="form-control" :class="{invalid: !message.isValid}">
      <label for="message">Message</label>
      <textarea id="message" rows="5" v-model.trim="message.val" @blur="clearValidity('message')"></textarea>
      <p class="errors" v-if="!message.isValid">Description must not be empty.</p>
    </div>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        email: {
          val: '',
          isValid: true,
        },
        message: {
          val: '',
          isValid: true,
        },
        formIsValid: true,
      };
    },
    methods: {
      clearValidity(input) {
        this[input].isValid = true;
      },
      validateForm() {
        this.formIsValid = true;

        let emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (this.email.val === '') {
          this.email.isValid = false;
          this.formIsValid = false;
        }
        if (!this.email.val.match(emailFormat)) {
          this.email.isValid = false;
          this.formIsValid = false;
        }
        if (this.message.val === '') {
          this.message.isValid = false;
          this.formIsValid = false;
        }
      },
      submitForm() {
        this.validateForm();

        if (!this.formIsValid) {
          return;
        }

        const requestData = {
          coachId: this.$route.params.id,
          email: this.email.val,
          message: this.message.val,
        };

        this.$store.dispatch('requests/contactCoach', requestData);
        this.$router.replace('/coaches');
      },
    },
  }
</script>

<style scoped>
  form {
    margin: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 1rem;
  }
  .form-control {
    margin: 0.5rem 0;
  }
  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
  }
  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
  }
  input:focus,
  textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
  }
  .errors {
    font-weight: bold;
    color: red;
  }
  .actions {
    text-align: center;
  }
  .invalid label {
    color: red;
  }

  .invalid input,
  .invalid textarea {
    border: 1px solid red;
  }
</style>
