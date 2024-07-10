import axios from 'axios'

/**
 * Axios instance for making HTTP requests to the API.
 * @type {AxiosInstance}
 */
const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
     Authorization: 'Bearer ' + localStorage.getItem('token')
  }
})

export default http
