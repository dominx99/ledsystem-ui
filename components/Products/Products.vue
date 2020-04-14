<template>
  <v-container class="pa-0">
    <v-layout row v-if="loading" class="mt-0 pt-0">
      <v-col md="6" lg="4" cols="12" v-for="(n, i) in 6" :key="i">
        <v-skeleton-loader
          transition="scale-transition"
          type="card"
        ></v-skeleton-loader>
      </v-col>
    </v-layout>
    <v-layout
      class="flex flex-column flex-md-row flex-md-wrap"
    >
      <Product v-for="(product, index) in products" :key="index" :product="product" />
    </v-layout>
  </v-container>
</template>

<script>
import Product from './Product'

export default {
  components: {
    Product
  },
  computed: {
    products() {
      return this.$store.state.products.products
    },
    loading() {
      return this.$store.state.products.loading.products
    }
  },
}
</script>
