<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-6">
                <div v-if="message != '' " class="alert alert-danger">{{ message }}</div>
                <h4 class="mb-3">Checkout</h4>
                <div>
                    <div class="form-group">
                        <label for="date">Date</label>
                        <input v-model="date" type="date" class="form-control mb-3" id="date">
                    </div>
                    <div class="form-group">
                        <label for="fullname">Name</label>
                        <input v-model="fullname" type="text" class="form-control mb-3" id="fullname" placeholder="Enter name">
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <input v-model="address"  type="text" class="form-control mb-3" id="address" placeholder="Enter Address">
                    </div>
                    <div class="form-group">
                        <label for="city">City</label>
                        <select v-model="city" class="form-control mb-3" id="city">
                            <option value="">Select</option>
                            <option value="Lille">Lille</option>
                            <option value="Paris">Paris</option>
                            <option value="Marseille">Marseille</option>
                        </select>
                    </div>
                    <button @click="save" class="w-100 btn btn-secondary btn-lg mt-3 mb-3" type="button">Save </button>
                </div>
                <div>
                    <div v-if="alert != false " class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong> Your order is being processed. Thank you !</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
                <hr class="my-4">
            </div>
        </div>
    </div>

</template>

<script>
import CheckOutDataService from '@/services/CheckOutDataService'

/**
 * Represents the CheckOut component.
 * @component
 */
export default {
  props: ['cart'], // List of props
  name: 'CheckOut', // Component name
  data () {
    return {
      date: '',
      fullname: '',
      address: '',
      city: '',
      message: '',
      alert: false
    }
  },
  methods: {
    /**
     * Saves the checkout details and processes the order.
     */
    save () {
      if (this.date === '' || this.fullname === '' || this.address === '' || this.city === '') {
        this.message = 'Please fill all fields'
      } else {
        console.log(this.$store.state.cart)
        console.log(this.$store.state.user.id)
        CheckOutDataService.create({
          name: this.$store.state.user.nickname,
          address: this.address,
          city: this.city,
          date: this.date,
          cart: this.$store.state.cart,
          userID: this.$store.state.user.id
        })
          .catch(e => {
            this.message = e.response.data.message
          })
      }
    }
  }
}
</script>
