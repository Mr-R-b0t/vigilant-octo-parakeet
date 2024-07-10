<template>
    <section class="py-5 container">
        <div class="container px-4 px-lg-5 mt-5">
            <div v-show="message" class="alert alert-danger justify-content-center">{{ message }}</div>

            <!-- Category select -->
            <div class="row mb-4">
                <div class="col text-center">
                    <label for="categorySelect" class="form-label">Select a category:</label>
                    <select class="form-select" id="categorySelect" v-model="selectedCategory"
                        @change="filterByCategory(selectedCategory)">
                        <option value="">All</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Home & Kitchen">Home & Kitchen</option>
                        <!-- Add more options as needed -->
                    </select>
                </div>
            </div>

            <!-- Product cards -->
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <div class="col mb-5" v-for="(product, i) in filteredInventory" :key="i">
                    <div class="card h-100">
                        <!-- Product image -->
                        <img class="card-img-top" :src="require('@/assets/img/' + product.photo)" :alt="product.name" />

                        <!-- Product details -->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Product name -->
                                <h5 class="fw-bolder">{{ product.name }}</h5>
                                <!-- Product price -->
                                ${{ product.price.toFixed(2) }}
                            </div>
                        </div>

                        <!-- Product actions -->
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center">
                                <input type="number" class="form-control qt" v-model.number="product.quantity"
                                    placeholder="0" required>
                                <a class="btn btn-outline-dark mt-auto" @click="addToCart(product.name, i)">Add to
                                    cart</a>
                                <p><router-link :to="'product/' + product.name">See more</router-link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
/**
 * Represents the ProductList component.
 * @component
 */
export default {
  props: ['inventory', 'addToCart'], // List of props
  data () {
    return {
      selectedCategory: '', // Holds the selected category value
      message: null
    }
  },
  computed: {
    /**
     * Filtered inventory based on the selected category.
     * @returns {Object[]} - The filtered inventory.
     */
    filteredInventory () {
      if (this.selectedCategory) {
        // Filter the inventory based on the selected category
        return this.inventory.filter((product) => product.type === this.selectedCategory)
      } else {
        // If no category is selected, return the entire inventory
        return this.inventory
      }
    }
  },
  methods: {
    /**
     * Updates the selected category when the user selects a category.
     * @param {string} category - The selected category.
     */
    filterByCategory (category) {
      this.selectedCategory = category
    }
  }
}
</script>
<style>
.container{
  position: relative;
}
</style>
