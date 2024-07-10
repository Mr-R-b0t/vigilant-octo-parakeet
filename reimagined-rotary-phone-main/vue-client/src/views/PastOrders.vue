<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <h4 class="mb-3">My Past Orders</h4>
        <ul class="list-group">
          <li class="list-group-item" v-for="(order, index) in myOrders" :key="index">
            <p><strong>Date: </strong>{{ dateConversion(order.date) }}</p>
            <p><strong>Name: </strong>{{ order.name }}</p>
            <p><strong>Address: </strong>{{ order.adress }}</p>
            <p><strong>City: </strong>{{ order.city }}</p>
            <p><strong>Products: </strong></p>
            <ul>
              <li v-for="(product, index) in order.cart" :key="index">
                <p>{{ index }}  :   {{ product }}</p>
              </li>
            </ul>
            <a class="btn btn-secondary" @click="cancelOrder()" >Cancel Order</a>
          </li>
        </ul>
      </div>
      <div class="col-md-6" v-if="user.isAdmin">
        <h4 class="mb-3">Others Past Orders</h4>
        <ul class="list-group">
          <li class="list-group-item" v-for="(order, index) in otherOrders" :key="index">
            <p><strong>Date: </strong>{{ dateConversion(order.date) }}</p>
            <p><strong>Name: </strong>{{ order.name }}</p>
            <p><strong>Address: </strong>{{ order.adress }}</p>
            <p><strong>City: </strong>{{ order.city }}</p>
            <p><strong>Products: </strong></p>
              <ul>
                <li v-for="(product, index) in order.cart" :key="index">
                  <p>{{ index }}  :   {{ product }}</p>
                </li>
              </ul>
            <a class="btn btn-secondary" @click="cancelOrder()" >Cancel Order</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * PastOrders component for displaying past orders.
 * @module PastOrders
 * @namespace
 */
import CheckOutDataService from '@/services/CheckOutDataService'

export default {
  /**
   * Props received by the component.
   * @prop {Object} user - The user object.
   */
  props: ['user'],

  /**
   * Component name.
   * @type {string}
   */
  name: 'PastOrders',

  /**
   * Component data.
   * @returns {Object} An object containing component data.
   */
  data () {
    return {
      /**
       * Array containing all orders.
       * @type {Array}
       */
      orders: [],

      /**
       * Array containing the user's orders.
       * @type {Array}
       */
      myOrders: [],

      /**
       * Array containing orders by other users.
       * @type {Array}
       */
      otherOrders: []
    }
  },

  /**
   * Lifecycle method that runs when the component is mounted.
   * Fetches orders and filters them.
   * @function
   * @returns {void}
   */
  mounted () {
    this.getOrders()
  },

  /**
   * Component methods.
   * @type {Object}
   */
  methods: {
    /**
     * Fetches all orders from the server.
     * Updates the component's orders array.
     * Calls the filterOrders method.
     * @function
     * @returns {void}
     */
    getOrders () {
      CheckOutDataService.getAll()
        .then(response => {
          this.orders = response.data
          console.log(this.orders)
          this.filterOrders()
        })
        .catch(error => {
          console.log(error)
        })
    },

    /**
     * Filters the orders into myOrders and otherOrders based on user ID.
     * @function
     * @returns {void}
     */
    filterOrders () {
      this.myOrders = this.orders.filter(order => order.userID === this.user.id)
      this.otherOrders = this.orders.filter(order => order.userID !== this.user.id)
    },

    /**
     * Cancels an order by sending a request to the server.
     * @function
     * @returns {void}
     */
    cancelOrder () {
      CheckOutDataService.delete(this.userID)
        .then(response => {
          console.log('Success')
        })
    },

    /**
     * Converts a date to a formatted string.
     * @function
     * @param {Date} date - The date to be formatted.
     * @returns {string} The formatted date string.
     */
    dateConversion (date) {
      return new Date(date).toLocaleDateString()
    }
  }
}
</script>
