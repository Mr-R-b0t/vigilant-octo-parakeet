import http from '../http-common'

/**
 * Service for interacting with checkout-related API endpoints.
 * @class
 */
class CheckOutDataService {
  /**
   * Get all checkouts.
   * @function
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  getAll () {
    return http.get('/checkout')
  }

  /**
   * Create a new checkout record.
   * @function
   * @param {Object} data - The data for creating the checkout record.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  create (data) {
    return http.post('/checkout', data)
  }

  /**
   * Get a specific checkout record by ID.
   * @function
   * @param {number} id - The ID of the checkout record to retrieve.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  get (id) {
    return http.get(`/checkout/${id}`)
  }

  /**
   * Update a checkout record by ID.
   * @function
   * @param {number} id - The ID of the checkout record to update.
   * @param {Object} data - The data for updating the checkout record.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  update (id, data) {
    return http.put(`/checkout/${id}`, data)
  }

  /**
   * Delete a checkout record by ID.
   * @function
   * @param {number} id - The ID of the checkout record to delete.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  delete (id) {
    return http.delete(`/checkout/${id}`)
  }

  /**
   * Get all checkouts associated with a specific user.
   * @function
   * @param {number} id - The ID of the user for whom to retrieve checkouts.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  getCheckOutByUser (id) {
    return http.get(`/checkout/user/${id}`)
  }
}

export default new CheckOutDataService()
