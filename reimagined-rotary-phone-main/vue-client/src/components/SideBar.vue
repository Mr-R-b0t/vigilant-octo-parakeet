<template>
    <aside class="cart-container">
        <div class="cart">
            <h1 class="cart-title spread">
            <span>
                Cart
                <i class="bi-cart-fill me-1"></i>
            </span>
            <button class="cart-close" @click="toggle">&times;</button>
            </h1>
            <div class="cart-body">
            <table class="cart-table">
                <thead>
                <tr>
                    <th><span class="sr-only">Product Image</span></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th><span class="sr-only">Actions</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(quantity, key, i) in cart" :key="i">
                    <td><img :src="require('@/assets/img/100/' + getPhoto(key))" :alt="key" ></td>
                    <td>{{ key }}</td>
                    <td>${{ getPrice(key) }}</td>
                    <td class="center">{{ quantity }}</td>
                    <td>${{ (quantity*getPrice(key)).toFixed(2)}}</td>
                    <td class="center">
                    <button class="btn btn-light cart-remove" @click="remove(key)">
                        &times;
                    </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <p class="center" v-if="!Object.keys(cart).length"><em>No items in cart</em></p>
            <div class="spread">
                <span><strong>Total:</strong> ${{ calculateTotal() }}</span>
                <button @click="checkout" class="btn btn-light">Checkout</button>
            </div>
            </div>
        </div>
    </aside>
</template>

<script>
export default {
  /**
   * Props passed to the component.
   * @prop {Function} toggle - A function to toggle the sidebar.
   * @prop {Object} cart - The shopping cart object.
   * @prop {Array} inventory - The list of products in the inventory.
   * @prop {Function} remove - A function to remove an item from the cart.
   */
  props: ['toggle', 'cart', 'inventory', 'remove'],
  data () {
    return {
      publicPath: window.location.origin
    }
  },
  methods: {
    /**
     * Get the price of a product by its name.
     * @param {string} name - The name of the product.
     * @returns {string} - The formatted price of the product.
     */
    getPrice (name) {
      const product = this.inventory.find((p) => {
        return p.name === name
      })
      return product.price.toFixed(2)
    },
    /**
     * Get the photo URL of a product by its name.
     * @param {string} name - The name of the product.
     * @returns {string} - The URL of the product's photo.
     */
    getPhoto (name) {
      const product = this.inventory.find((p) => {
        return p.name === name
      })
      return product.photo
    },
    /**
     * Calculate the total price of items in the cart.
     * @returns {string} - The formatted total price.
     */
    calculateTotal () {
      const total = Object.entries(this.cart).reduce((acc, curr) => { return acc + (curr[1] * this.getPrice(curr[0])) }, 0)
      return total.toFixed(2)
    },
    /**
     * Handle the checkout process by sending the cart data to the store and navigating to the checkout page.
     */
    checkout () {
      for (const [key, value] of Object.entries(this.cart)) {
        console.log(`${key}: ${value}`)
      }
      this.$store.dispatch('cart', this.cart)
      this.$router.push('/checkout')
    }
  }
}

</script>
