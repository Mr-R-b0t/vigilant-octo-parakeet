<template>
    <div class="product-add">
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
                      <span class="input-group-text">CAD</span>
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
                    <select
                      class="form-control"
                      id="productType"
                      placeholder=""
                      v-model="product.type"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Burguer">Burguer</option>
                      <option value="Italian">Italian</option>
                      <option value="Indian">Indian</option>
                      <option value="Thai">Thai</option>
                    </select>
                    <div class="invalid-feedback">
                      Valid photo path is required.
                    </div>
                  </div>
                  <button class="w-100 btn btn-secondary btn-lg mt-3" type="button"  @click="updateProduct">Update </button>
                  <button class="w-100 btn btn-danger btn-lg mt-3" type="button" @click="deleteProduct">Delete </button>
                  </div>
                  <div v-else>
                    <div  class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong> {{ message }}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  </div>
                  <hr class="my-4">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>

<script>
/**
 * ProductDetails component for displaying and managing product details.
 * @module ProductDetails
 * @namespace
 */
import ProductDataService from '@/services/ProductDataService'

export default {
  /**
   * Props received by the component.
   * @prop {Function} removeInv - Function to remove inventory item.
   * @prop {Array} inventory - The inventory data.
   * @prop {Function} remove - Function to remove a product.
   * @prop {Function} updateInv - Function to update inventory item.
   */
  props: ['removeInv', 'inventory', 'remove', 'updateInv'],

  /**
   * Component data.
   * @returns {Object} An object containing component data.
   */
  data () {
    return {
      /**
       * Error or success message.
       * @type {string|null}
       */
      message: null,

      /**
       * Indicates if a form has been submitted.
       * @type {boolean}
       */
      submitted: false,

      /**
       * Product details.
       * @type {Object}
       */
      product: {},

      /**
       * Product ID.
       * @type {number}
       */
      id: parseInt(this.$route.params.id)
    }
  },

  /**
   * Component methods.
   * @type {Object}
   */
  methods: {
    /**
     * Updates the product's details.
     * Calls the ProductDataService update method.
     * @function
     * @returns {void}
     */
    updateProduct () {
      ProductDataService.update(this.id, this.product)
        .then(response => {
          this.updateInv(this.productIndex, this.product)
          this.message = response.data.message
          this.submitted = true
        })
    },

    /**
     * Deletes the product.
     * Calls the ProductDataService delete method.
     * Removes the product from the inventory.
     * @function
     * @returns {void}
     */
    deleteProduct () {
      ProductDataService.delete(this.id)
        .then(response => {
          this.message = response.data.message
          this.removeInv(this.product.index)
          this.remove(this.product.name)
          this.$router.push({ name: 'home' })
        })
    }
  },

  /**
   * Component computed properties.
   * @type {Object}
   */
  computed: {
    /**
     * Finds the index of the product in the inventory by ID.
     * @function
     * @returns {number} The index of the product.
     */
    productIndex () {
      const index = this.inventory.findIndex((p) => {
        return p.id === this.id
      })
      return index
    }
  },

  /**
   * Lifecycle method that runs when the component is mounted.
   * Fetches product details.
   * @function
   * @returns {void}
   */
  mounted () {
    ProductDataService.get(this.id)
      .then(response => {
        this.product = response.data
      })
  }
}

</script>
