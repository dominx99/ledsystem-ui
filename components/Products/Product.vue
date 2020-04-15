<template>
  <v-card
    :loading="loading"
    class="text-center product"
  >
    <v-img
      :src="imageUrl()"
      height="150"
      contain
    ></v-img>

    <v-card-title class="justify-center subtitle-1" v-text="product.name"></v-card-title>

    <v-card-text class="subtitle-1 font-weight-bold"><Money :value="product.unit.price" /></v-card-text>

    <v-card-actions class="pa-0">
      <v-btn
        color="primary lighten-2 pa-0"
        @click="addToCart"
        block
        large
        tile
      >
        Dodaj do koszyka
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import Money from './../Money/Money.vue'

  export default {
    components: {
      Money,
    },
    props: ['product'],
    data: () => ({
      loading: false,
      selection: 1,
    }),
    methods: {
      imageUrl() {
        if (! this.product.images[0]) {
          return 'https://images.obi.pl/product/PL/1500x1500/603449_1.jpg'
        }

        return process.env.baseUrl + '/storage/' + this.product.images[0].path
      },
      addToCart () {
        this.loading = true

        setTimeout(() => (this.loading = false), 1000)

        this.$store.dispatch('cart/add', { product: this.product, count: 1 })
      },
    },
  }
</script>

<style lang="scss" scoped>
.product {
  width: 100%;
  margin-bottom: 1rem;

  @media (min-width: map-get($grid-breakpoints, 'md')) and (max-width: map-get($grid-breakpoints, 'lg') - 1) {
    width: calc((100% / 2) - (1rem / 2));

    &:nth-child(2n + 1) {
      margin-right: .5rem;
    }

    &:nth-child(2n) {
      margin-left: .5rem;
    }
  }

  @media (min-width: map-get($grid-breakpoints, 'lg')) {
    width: calc((100% / 3) - (2rem / 3));

    &:nth-child(3n + 1) {
      margin-right: 1rem;
    }

    &:nth-child(3n - 1) {
      margin-right: 1rem;
    }
  }
}
</style>
