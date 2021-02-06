<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid: !userEmail.isValid}">
      <label for="email">Email</label>
      <input type="email" id="email" v-model.trim="userEmail.val" @blur="clearValidity('userEmail')" />
      <p class="errors" v-if="!userEmail.isValid">Please provide a valid email address.</p>
    </div>
    <div class="form-control" :class="{invalid: !userPassword.isValid}">
      <label for="password">Password</label>
      <input type="password" id="password" v-model.trim="userPassword.val" @blur="clearValidity('userPassword')" />
      <p class="errors" v-if="!userPassword.isValid">Password must be longer than 6 characters.</p>
    </div>
    <p class="errors" v-if="!formIsValid">Please fix the above errors and submit again.</p>
    <base-button>{{ submitButtonCaption }}</base-button>
    <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
  </form>
</template>

<script>
  export default {
    emits: ['save-data'],
    data() {
      return {
        userEmail: {
          val: '',
          isValid: true,
        },
        userPassword: {
          val: '',
          isValid: true,
        },
        formIsValid: true,
        mode: 'login',
      };
    },
    computed: {
      submitButtonCaption() {
        if (this.mode === 'login') {
          return 'Login';
        } else {
          return 'Sign Up'
        }
      },
      switchModeButtonCaption() {
        if (this.mode === 'login') {
          return 'Sign Up Instead';
        } else {
          return 'Login Instead'
        }
      },
    },
    methods: {
      clearValidity(input) {
        this[input].isValid = true;
      },
      validateForm() {
        this.formIsValid = true;

        let emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (this.userEmail.val === '') {
          this.userEmail.isValid = false;
          this.formIsValid = false;
        }
        if (!this.userEmail.val.match(emailFormat)) {
          this.userEmail.isValid = false;
          this.formIsValid = false;
        }
        if (this.userPassword.val.length < 6) {
          this.userPassword.isValid = false;
          this.formIsValid = false;
        }
      },
      submitForm() {
        this.validateForm();

        if (!this.formIsValid) {
          return;
        }

        let user = this.userEmail.val
        let newUsername = user.replace('@', '_').substring(0, user.indexOf('.com'))

        const formData = {
          username: newUsername,
          email: this.userEmail.val,
          password: this.userPassword.val,
        };

        this.$emit('save-data', formData, this.mode);
      },
      switchAuthMode() {
        if (this.mode === 'login') {
          this.mode = 'signup';
        } else {
          this.mode = 'login';
        }
      },
    },
  }
</script>

<style scoped>
  form {
    margin: 0.5rem;
    padding: 0.5rem;
  }

  .form-control {
    margin: 0.5rem 0;
  }

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  input[type='checkbox'] + label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
  }

  input,
  textarea {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
  }

  input:focus,
  textarea:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
  }

  input[type='checkbox'] {
    display: inline;
    width: auto;
    border: none;
  }

  input[type='checkbox']:focus {
    outline: #3d008d solid 1px;
  }

  h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
  }

  .errors {
    font-weight: bold;
    color: red;
  }

  .invalid label {
    color: red;
  }

  .invalid input {
    border: 1px solid red;
  }
</style>
