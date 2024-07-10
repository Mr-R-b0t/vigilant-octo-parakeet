<template>
    <!-- Navigation-->
    <div class="containerdiv">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container px-4 px-lg-5">
            <span class="navbar-brand" v-if="user"> Hi {{ user.nickname}}</span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                    <li class="nav-item" ><router-link class="nav-link active" aria-current="page" to="/">Home</router-link></li>
                    <li class="nav-item" v-if="user && user.isAdmin" ><router-link class="nav-link" to="/admin">Admin View</router-link></li>
                    <li class="nav-item  " v-if="user && user.isAdmin" ><router-link class="nav-link" to="/new-product">New Product</router-link></li>
                    <li class="nav-item " v-if="user"><router-link class="nav-link" to="/checkout">Checkout</router-link></li>
                    <li class="nav-item " v-if="user"><router-link class="nav-link" to="/past-orders">Past Orders</router-link></li>
                    <li class="nav-item " ><router-link class="nav-link" to="/about">About us</router-link></li>
                    <li class="nav-item " ><router-link class="nav-link" to="/history">History</router-link></li>
                    <li class="nav-item " ><router-link class="nav-link" to="/contact">Contact us</router-link></li>
                    <li class="nav-item " v-if="user"><span class="nav-link" @click="logout" style="cursor:pointer">Logout</span></li>
                    <li class="nav-item " v-if="!user"><router-link class="nav-link" to="/user">Register</router-link></li>
                    <li class="nav-item " v-if="!user"><router-link class="nav-link" to="/login">Login</router-link></li>
                  </ul>
                <form class="d-flex">
                    <button class="btn btn-outline-dark" type="button" v-on:click="toggleSideBar">
                        <i class="bi-cart-fill me-1"></i>
                        Cart
                        <span class="badge bg-dark text-white ms-1 rounded-pill"> {{ totalQuantity }}</span>
                    </button>
                </form>
            </div>
        </div>
    </nav>
    <!-- Header-->
    <header class="bg-dark py-3">
        <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
                <h1 class="display-4 fw-bolder">Fashion Fusion</h1>
            </div>
        </div>
    </header>
  <router-view
  :inventory = "inventory"
  :addToCart = "addToCart"
  :addInv = "addInventory"
  :user = "user"
  :removeInv = "removeInventory"
  :remove = "removeItem"
  :updateInv = "updateInventory"
  />
  <Sidebar
  v-if="showSideBar"
  :toggle = "toggleSideBar"
  :cart = "cart"
  :inventory = "inventory"
  :remove = "removeItem"
  />
  <div class="tqt"></div>
  <footer class="bg-dark text-center text-white">
        <!-- Grid container -->
        <div class="container p-4 pb-0">
          <!-- Section: Form -->
          <section class="">
            <form action="">
              <!--Grid row-->
              <div class="row d-flex justify-content-center">
                <!--Grid column-->
                <div class="col-auto">
                  <p class="pt-2">
                    <strong>Sign up for our newsletter</strong>
                  </p>
                </div>
                <!--Grid column-->
                <!--Grid column-->
                <div class="col-md-5 col-12">
                  <!-- Email input -->
                  <div class="form-outline form-white mb-4">
                    <input type="email" id="form5Example2" class="form-control" placeholder="Email" />
                  </div>
                </div>
                <!--Grid column-->
                <!--Grid column-->
                <div class="col-auto">
                  <!-- Submit button -->
                  <button type="submit" class="btn btn-outline-light mb-4">
                    Subscribe
                  </button>
                </div>
                <!--Grid column-->
              </div>
              <!--Grid row-->
            </form>
          </section>
          <!-- Section: Form -->
        </div>
        <!-- Grid container -->

        <!-- Copyright -->
        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
          © 2020 Copyright:
          <a class="text-white" href="https://www.youtube.com/watch?v=zL19uMsnpSU">Fashion Fusion</a>
        </div>
        <!-- Copyright -->
      </footer>
      </div>
</template>
  <style>
  footer{
    position:fixed;
    bottom:0;
    width: 100%;
    }
  .containerdiv{
    position:relative;
  }
  .tqt{
    height: 200px;
  }
</style>
<script>
import Sidebar from './components/SideBar.vue'
import ProductDataService from '@/services/ProductDataService'
import UserDataService from '@/services/UserDataService'
import { mapGetters } from 'vuex'

export default {
  components: {
    Sidebar
  },
  data () {
    return {
      showSideBar: false,
      inventory: [],
      cart: {},
      admin: false,
      showFooter: false
    }
  },
  methods: {
    handleScroll () {
      // You can adjust the scroll position threshold as needed
      const scrollThreshold = 100
      this.showFooter = window.scrollY > scrollThreshold
    },
    /**
     * Toggles the visibility of the sidebar.
     */
    toggleSideBar () {
      this.showSideBar = !this.showSideBar
    },
    /**
     * Adds a product to the cart.
     * @param {string} product - The product name.
     * @param {number} index - The index of the product in the inventory.
     */
    addToCart (product, index) {
      if (!this.cart[product]) this.cart[product] = 0
      this.cart[product] += this.inventory[index].quantity
      console.log(this.cart[product])
    },
    /**
     * Removes a product from the cart.
     * @param {string} name - The product name to be removed.
     */
    removeItem (name) {
      delete this.cart[name]
    },
    /**
     * Adds a new product to the inventory.
     * @param {Object} data - The data of the new product.
     */
    addInventory (data) {
      this.inventory.push(data)
    },
    /**
     * Removes a product from the inventory.
     * @param {number} index - The index of the product to be removed.
     */
    removeInventory (index) {
      this.inventory.splice(index, 1)
    },
    /**
     * Updates a product in the inventory.
     * @param {number} index - The index of the product to be updated.
     * @param {Object} data - The updated product data.
     */
    updateInventory (index, data) {
      this.inventory[index].name = data.name
      this.inventory[index].photo = data.photo
      this.inventory[index].price = data.price
      this.inventory[index].description = data.description
      this.inventory[index].type = data.type
    },
    /**
     * Logs out the user and removes the token from local storage.
     */
    logout () {
      UserDataService.getLogout()
        .then(response => {
          localStorage.removeItem('token')
          this.$store.dispatch('user', null)
          this.$router.push('login')
        })
    }
  },
  computed: {
    /**
     * Computes the total quantity of items in the cart.
     */
    totalQuantity () {
      return Object.values(this.cart).reduce((acc, curr) => {
        return acc + curr
      }, 0)
    },
    ...mapGetters(['user'])
  },
  mounted () {
    // Fetch the product data from the server.
    ProductDataService.getAll()
      .then(response => {
        this.inventory = response.data
      })
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
    // Fetch user authentication status and data.
    UserDataService.getAuth()
      .then(response => {
        this.name = response.data.nickname
        this.$store.dispatch('user', response.data)
        if (response.data.isAdmin === true) {
          this.$store.dispatch('isAdmin', true)
          this.admin = true
          console.log(this.$store.getters.isAdmin)
        }
      })
      .catch(e => {
        this.$store.dispatch('user', null)
      })
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

}
</script>
