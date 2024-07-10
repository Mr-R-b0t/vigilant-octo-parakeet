<template>
  <div class="container">
   <div class="row justify-content-center mt-5">
     <div class="col-md-6">
       <div v-show="message" class="alert alert-danger">{{message}}</div>
       <h4 class="mb-3">New User</h4>
       <div class="form-group">
          <label for="fullname">Nickname</label>
          <input type="text" class="form-control mb-3" id="fullname" placeholder="Enter nickname" v-model="user.nickname">
        </div>
        <div class="form-group">
          <label for="username">Email</label>
          <input type="text" class="form-control mb-3" id="email" placeholder="Enter email" v-model="user.email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control mb-3" id="password" placeholder="Enter password" v-model="user.password">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control mb-3" id="password_validation" placeholder="Re-enter password" v-model="user.confirmpassword">
          </div>
         <button class="w-100 btn btn-secondary btn-lg mt-3" type="button"  @click="saveUser">Save </button>
          <hr class="my-4">
     </div>
   </div>
  </div>
</template>

<script>
/**
 * UserRegistration component for registering new users.
 * @module UserRegistration
 * @namespace
 */
import UserDataService from '@/services/UserDataService'

export default {
  /**
   * Data properties for the component.
   * @type {Object}
   */
  data () {
    return {
      message: null,
      user: {
        email: '',
        password: '',
        nickname: '',
        confirmpassword: ''
      }
    }
  },

  /**
   * Methods for the component.
   * @type {Object}
   */
  methods: {
    /**
     * Saves a new user after validating the input fields.
     * @function
     */
    saveUser () {
      if (this.user.password !== this.user.confirmpassword) {
        this.message = 'Passwords do not match'
        return
      }
      if (!this.validateEmail(this.user.email)) {
        this.message = 'Invalid email'
        return
      }
      UserDataService.create(this.user)
        .then(response => {
          this.$router.push({ name: 'login' })
        })
        .catch(error => {
          this.message = error.response.data.message
        })
    },

    /**
     * Validates an email using a regular expression.
     * @function
     * @param {string} email - The email to validate.
     * @returns {boolean} Whether the email is valid or not.
     */
    validateEmail (email) {
      // eslint-disable-next-line prefer-regex-literals
      const emailReg = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))/i)
      return emailReg.test(email)
    }
  }
}

</script>
