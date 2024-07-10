<template>
  <div class="admin py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h1 class="text-center mb-4">This is an admin page</h1>
          <p class="text-center">Only logged-in users can see this page</p>
          <div class="mt-5">
            <h3>All users</h3>
            <ul class="list-unstyled">
              <li v-for="user in users" :key="user.id" class="mb-4">
                <div class="card p-3">
                  <h5 class="card-title">User ID: {{ user.id }}</h5>
                  <p class="card-text">Email: {{ user.email }}</p>
                  <p class="card-text">Creation Date: {{ dateConversion(user.createdAt) }}</p>
                  <p class="card-text">Nickname: {{ user.nickname }}</p>
                  <p class="card-text">Admin: {{ user.isAdmin }}</p>
                  <p class="card-text">Password: {{ user.password }}</p>
                  <p class="card-text">Banned: {{ user.isBanned }}</p>
                  <div class="btn-group">
                    <button v-if="!user.isBanned" class="btn btn-secondary" @click="banUser(user.id)">Ban</button>
                    <button v-if="user.isBanned" class="btn btn-secondary" @click="unBanUser(user.id)">Unban</button>
                    <button v-if="!user.isAdmin" class="btn btn-secondary" @click="adminUser(user.id)">Make admin</button>
                    <button v-if="user.isAdmin" class="btn btn-secondary" @click="unAdminUser(user.id)">Remove
                      admin</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 40px 0;
}
</style>

<script>
import UserDataService from '@/services/UserDataService'

export default {
  name: 'AboutView',
  data () {
    return {
      user: {
        id: '',
        email: '',
        password: '',
        nickname: ''
      },
      users: []
    }
  },
  mounted () {
    /**
     * Fetches all users and populates the 'users' data property.
     */
    UserDataService.getAll()
      .then(response => {
        this.users = response.data
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    /**
     * Converts a date to a localized date string.
     * @param {Date} date - The date to convert.
     * @returns {string} A localized date string.
     */
    dateConversion (date) {
      return new Date(date).toLocaleDateString()
    },
    /**
     * Bans a user by updating the 'isBanned' property to true.
     * @param {number} id - The ID of the user to ban.
     */
    banUser (id) {
      UserDataService.updateBanned(id, { isBanned: true })
        .then(response => {
          console.log(response.data)
          this.reload()
        })
        .catch(e => {
          console.log(e)
        })
    },
    /**
     * Unbans a user by updating the 'isBanned' property to false.
     * @param {number} id - The ID of the user to unban.
     */
    unBanUser (id) {
      UserDataService.updateBanned(id, { isBanned: false })
        .then(response => {
          console.log(response.data)
          this.reload()
        })
        .catch(e => {
          console.log(e)
        })
    },
    /**
     * Grants admin privileges to a user by updating the 'isAdmin' property to true.
     * @param {number} id - The ID of the user to make admin.
     */
    adminUser (id) {
      UserDataService.updateAdmin(id, { isAdmin: true })
        .then(response => {
          console.log(response.data)
          this.reload()
        })
        .catch(e => {
          console.log(e)
        })
    },
    /**
   * Removes admin privileges from a user by updating the 'isAdmin' property to false.
   * @param {number} id - The ID of the user to remove admin privileges from.
   */
    unAdminUser (id) {
      UserDataService.updateAdmin(id, { isAdmin: false })
        .then(response => {
          console.log(response.data)
          this.reload()
        })
        .catch(e => {
          console.log(e)
        })
    },
    /**
   * Reloads the current page to reflect changes after user actions.
   */
    reload () {
      window.location.reload()
    }
  }
}
</script>
