<template>
  <v-row>
    <v-col cols="12">
      <MainCarousel />
      <MainBreadcrumb class="mt-3" v-if="false" />

      <v-row>
        <v-col md="4" cols="12">
          <CategoriesTree />
        </v-col>
        <v-col md="8" cols="12">
          <Products v-if="products.length > 0 || loadingProducts" />
          <v-alert
            color="info darken-1 white--text"
            v-else
          >Brak topowych produktów.</v-alert>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Products from './../components/Products/Products'
import CategoriesTree from './../components/Categories/CategoriesTree'
import MainCarousel from './../components/Carousels/MainCarousel'
import MainBreadcrumb from './../components/Breadcrumbs/MainBreadcrumb'

export default {
  components: {
    Products,
    CategoriesTree,
    MainCarousel,
    MainBreadcrumb,
  },
  async mounted() {
    await this.$store.dispatch('categories/fetchParent')
    this.$store.commit('categories/setActiveCategories', this.$store.state.categories.parentCategories)
    this.$store.commit('products/removeLoading', 'products')
  },
  computed: {
    products() {
      return this.$store.state.products.products
    },
    loadingProducts() {
      return this.$store.state.products.loading.products
    },
  },
}
</script>
