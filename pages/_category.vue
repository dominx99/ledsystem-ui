<template>
  <v-row>
    <v-col cols="12">
      <MainBreadcrumb v-if="false" />

      <v-layout row>
        <v-col md="4" cols="12">
          <CategoriesTree />
        </v-col>
        <v-col md="8" cols="12">
          <Products v-if="products.length > 0 || loadingProducts" />
          <v-alert
            color="info darken-1 white--text"
            v-else
          >Żaden produkt nie został znaleziony w tej kategorii.</v-alert>
        </v-col>
      </v-layout>
    </v-col>
  </v-row>
</template>

<script>
import Products from './../components/Products/Products'
import CategoriesTree from './../components/Categories/CategoriesTree'
import MainBreadcrumb from './../components/Breadcrumbs/MainBreadcrumb'

export default {
  computed: {
    products() {
      return this.$store.state.products.products
    },
    loadingProducts() {
      return this.$store.state.products.loading.products
    },
  },
  components: {
    Products,
    CategoriesTree,
    MainBreadcrumb,
  },
  mounted() {
    if (this.$store.state.categories.parentCategories.length <= 0) {
      this.$store.dispatch('categories/fetchParent')
    }
    this.$store.dispatch('categories/fetchByParentSlug', this.$route.params.category)
    this.$store.commit('products/clearProducts')
    this.$store.dispatch('products/fetchByCategorySlug', this.$route.params.category)
  }
}
</script>
