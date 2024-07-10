import http from '../http-common'

/**
 * Service for interacting with product-related API endpoints.
 * @class
 */
class ProductDataService {
  /**
   * Get all products.
   * @function
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  getAll () {
    return http.get('/product')
  }

  /**
   * Create a new product.
   * @function
   * @param {Object} data - The data for creating the product.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  create (data) {
    return http.post('/product', data)
  }

  /**
   * Get a specific product by ID.
   * @function
   * @param {number} id - The ID of the product to retrieve.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  get (id) {
    return http.get(`/product/${id}`)
  }

  /**
   * Update a product by ID.
   * @function
   * @param {number} id - The ID of the product to update.
   * @param {Object} data - The data for updating the product.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  update (id, data) {
    return http.put(`/product/${id}`, data)
  }

  /**
   * Delete a product by ID.
   * @function
   * @param {number} id - The ID of the product to delete.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  delete (id) {
    return http.delete(`/product/${id}`)
  }
}

export default new ProductDataService()
