<template>
    <div class="container">
        <h1>Contact Us</h1>
        <form>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" v-model="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea class="form-control" id="message" rows="5" v-model="message" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="submitForm">Submit</button>
        </form>
    </div>

</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      message: ''
    }
  },
  methods: {
    submitForm () {
      // Handle form submission here
      console.log('Form submitted!')
    }
  }
}
</script>
