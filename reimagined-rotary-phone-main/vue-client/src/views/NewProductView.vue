<template>
    <div v-if="user" class="product-add">
      <!-- Section-->
      <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
          <div
            class="
              row
              gx-4 gx-lg-5
              row-cols-2 row-cols-md-3 row-cols-xl-2
              justify-content-center
            "
          >
            <div class="col-sm-12">
              <h4 class="mb-3">Add new product</h4>
              <div class="needs-validation" novalidate>
                <div class="row g-2">
                  <div v-if=!submitted>
                  <div class="col-12">
                    <label for="productName" class="form-label"
                      >Product Name</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="productName"
                      v-model="product.name"
                      placeholder=""
                      required
                    />
                    <div class="invalid-feedback">Valid name is required.</div>
                  </div>
                  <div class="col-12">
                    <label for="productPhoto" class="form-label"
                      >Product Photo</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="productPhoto"
                      v-model="product.photo"
                      placeholder=""
                      required
                    />
                    <div class="invalid-feedback">
                      Valid photo path is required.
                    </div>
                  </div>
                  <div class="col-12">
                    <label for="productPrice" class="form-label">Price</label>
                    <div class="input-group has-validation">
                      <span class="input-group-text">EUR</span>
                      <input
                        type="text"
                        class="form-control"
                        id="productPrice"
                        v-model.number="product.price"
                        placeholder=""
                        required
                      />
                      <div class="invalid-feedback">Price is required.</div>
                    </div>
                  </div>
                  <div class="col-12">
                    <label for="productDescription" class="form-label"
                      >Product Description</label
                    >
                    <textarea
                      class="form-control"
                      id="productDescription"
                      placeholder=""
                      v-model="product.description"
                    ></textarea>
                    <div class="invalid-feedback">Valid description</div>
                  </div>
                  <div class="col-12">
                    <label for="productType" class="form-label"
                      >Product Type</label
                    >
                    <select class="form-select" id="productType" v-model="product.type" required>
                      <option value="">Select a category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Home & Kitchen">Home & Kitchen</option>
                      <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                      <option value="Sports & Outdoors">Sports & Outdoors</option>
                      <option value="Books">Books</option>
                      <option value="Toys & Games">Toys & Games</option>
                    </select>

                    <div class="invalid-feedback">
                      Valid photo path is required.
                    </div>
                  </div>
                  <button class="w-100 btn btn-secondary btn-lg mt-3" type="button"  @click="saveProduct">Save </button>
                  </div>
                  <div v-else>
                    <div  class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong> You submitted successfully!</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    <button class="w-100 btn btn-success btn-lg mt-3" type="button" @click="newProduct">New product </button>
                  </div>
                  <hr class="my-4">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-else>
      {{ this.$router.push({name: 'login'})}}
    </div>
  </template>

<script>
/**
 * ProductForm component for adding a new product.
 * @module ProductForm
 * @namespace
 */
import ProductDataService from '@/services/ProductDataService'

export default {
  /**
   * Props received by the component.
   * @prop {Function} addInv - Function to add a new product to the inventory.
   * @prop {Object} user - The user object.
   */
  props: ['addInv', 'user'],

  /**
   * Component data.
   * @returns {Object} An object containing component data.
   */
  data () {
    return {
      /**
       * Flag indicating whether the form has been submitted.
       * @type {boolean}
       */
      submitted: false,

      /**
       * Product data to be submitted.
       * @type {Object}
       */
      product: {
        name: '',
        photo: '',
        price: '',
        description: '',
        type: ''
      }
    }
  },

  /**
   * Component methods.
   * @type {Object}
   */
  methods: {
    /**
     * Saves the product by sending a request to the server.
     * Validates input fields and handles server responses.
     * @function
     * @returns {void}
     */
    saveProduct () {
      if (
        this.product.name === '' ||
        this.product.photo === '' ||
        this.product.price === '' ||
        this.product.description === '' ||
        this.product.type === ''
      ) {
        this.message = 'Please fill all fields'
        return
      }
      if (this.product.price < 0) {
        this.message = 'Price must be positive'
        return
      }
      // Check if price is an integer
      if (this.product.price % 1 !== 0) {
        this.message = 'Price must be an integer'
        return
      }
      // Check if product name is unique
      ProductDataService.create(this.product)
        .then(response => {
          this.product.id = response.data.id
          this.addInv(this.product)
          // console.log(this.product)
          this.submitted = true
        })
    },

    /**
     * Clears the form and resets the submitted flag.
     * @function
     * @returns {void}
     */
    newProduct () {
      this.submitted = false
      this.product = {}
    }
  }
}
</script>
