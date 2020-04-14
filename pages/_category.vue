<template>
  <v-row>
    <v-col cols="12">
      <MainCarousel v-if="false" />
      <MainBreadcrumb class="mt-0" />

      <v-row>
        <v-col :md="4">
          <CategoriesTree />
        </v-col>
        <v-col :md="8">
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
  mounted() {
    if (this.$store.state.categories.categories.length <= 0) {
      this.$store.dispatch('categories/fetch')
    }
    this.$store.dispatch('categories/fetchByParentSlug', this.$route.params.category)
    this.$store.dispatch('products/fetchByCategorySlug', this.$route.params.category)
  }
}
</script>
