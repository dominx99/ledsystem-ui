<template>
  <v-row>
    <v-col cols="12">
      <MainCarousel />
      <MainBreadcrumb class="mt-3" />

      <v-row>
        <v-col md="4" cols="12">
          <CategoriesTree />
        </v-col>
        <v-col md="8" cols="12">
          <Products />
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
    console.log("env", process.env)
    console.log("base url", process.env.baseUrl)
    await this.$store.dispatch('categories/fetch')
    this.$store.commit('categories/setActiveCategories', this.$store.state.categories.categories)
  },
}
</script>
