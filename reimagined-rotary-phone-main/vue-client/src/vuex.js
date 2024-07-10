import { createStore } from 'vuex'

export default createStore({
  /**
   * The state of the Vuex store.
   * @type {object}
   */
  state: {
    user: null,
    isAdmin: false,
    cart: []
  },
  getters: {
    /**
     * Get the user from the state.
     * @param {object} state - The Vuex state.
     * @returns {object | null} The user object or null.
     */
    user: (state) => {
      return state.user
    },
    /**
     * Check if the user is an admin.
     * @param {object} state - The Vuex state.
     * @returns {boolean} True if the user is an admin, false otherwise.
     */
    isAdmin: (state) => {
      return state.isAdmin
    },
    /**
     * Get the cart from the state.
     * @param {object} state - The Vuex state.
     * @returns {Array} The cart array.
     */
    cart: (state) => {
      return state.cart
    }
  },
  actions: {
    /**
     * Set the user in the store.
     * @param {object} context - The Vuex context.
     * @param {object | null} user - The user object or null.
     */
    user (context, user) {
      context.commit('user', user)
    },
    /**
     * Set the admin status in the store.
     * @param {object} context - The Vuex context.
     * @param {boolean} isAdmin - True if the user is an admin, false otherwise.
     */
    isAdmin (context, isAdmin) {
      context.commit('isAdmin', isAdmin)
    },
    /**
     * Set the cart in the store.
     * @param {object} context - The Vuex context.
     * @param {Array} cart - The cart array.
     */
    cart (context, cart) {
      context.commit('cart', cart)
    }
  },
  mutations: {
    /**
     * Mutate the user in the state.
     * @param {object} state - The Vuex state.
     * @param {object | null} user - The user object or null.
     */
    user (state, user) {
      state.user = user
    },
    /**
     * Mutate the admin status in the state.
     * @param {object} state - The Vuex state.
     * @param {boolean} isAdmin - True if the user is an admin, false otherwise.
     */
    isAdmin (state, isAdmin) {
      state.isAdmin = isAdmin
    },
    /**
     * Mutate the cart in the state.
     * @param {object} state - The Vuex state.
     * @param {Array} cart - The cart array.
     */
    cart (state, cart) {
      state.cart = cart
    }
  }
})
