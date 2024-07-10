import http from '../http-common'

/**
 * Service for interacting with user-related API endpoints.
 * @class
 */
class UserDataService {
  /**
   * Create a new user.
   * @function
   * @param {Object} data - The data for creating the user.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  create (data) {
    return http.post('/user', data)
  }

  /**
   * Perform user login.
   * @function
   * @param {Object} data - The login credentials.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  postLogin (data) {
    return http.post('/user/login', data)
  }

  /**
   * Get user authentication status.
   * @function
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  getAuth () {
    return http.get('/user/auth')
  }

  /**
   * Log out the user.
   * @function
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  getLogout () {
    return http.get('/user/logout')
  }

  /**
   * Delete a user by ID.
   * @function
   * @param {number} id - The ID of the user to delete.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  delete (id) {
    return http.delete(`/user/${id}`)
  }

  /**
   * Get a list of all users.
   * @function
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  getAll () {
    return http.get('/user')
  }

  /**
   * Update the banned status of a user by ID.
   * @function
   * @param {number} id - The ID of the user to update.
   * @param {Object} data - The data for updating the banned status.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  updateBanned (id, data) {
    return http.put(`/user/${id}`, data)
  }

  /**
   * Update the admin status of a user by ID.
   * @function
   * @param {number} id - The ID of the user to update.
   * @param {Object} data - The data for updating the admin status.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  updateAdmin (id, data) {
    return http.put(`/user/admin/${id}`, data)
  }
}

export default new UserDataService()
