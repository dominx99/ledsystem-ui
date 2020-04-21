<template>
  <div class="mt-2">
    <v-card class="mb-5 elevation-1">
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="6">
            <v-skeleton-loader
              v-if="loading"
              transition="scale-transition"
              type="image"
            ></v-skeleton-loader>

            <div v-else>
              <v-img
                class="mb-2"
                :aspect-ratio="16/9"
                :src="imageUrl(activeImage.original.path)"
              >
              </v-img>
              <div class="d-flex flex-row">
                <v-img
                  class="mr-2"
                  v-for="(image, i) in product.images"
                  :key="i"
                  max-width="100"
                  :aspect-ratio="16/9"
                  :src="imageUrl(image.thumbnail.path)"
                  @click="setActiveImage(image)"
                >
                </v-img>
              </div>
            </div>

          </v-col>
          <v-col cols="12" md="6">
            <v-skeleton-loader
              v-if="loading"
              transition="scale-transition"
              type="article"
            ></v-skeleton-loader>

            <div v-else>
              <v-card-title
                v-text="product.name"
              ></v-card-title>
              <v-card-text
                class="headline"
              >
                <Money :value="product.unit.price" />
                <p class="grey--text subtitle-1 mb-0">za sztukę</p>
              </v-card-text>

              <v-card-actions>
                <v-card
                  flat
                  outlined
                >
                  <v-btn
                    text
                    @click="decrement"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <input
                    style="width: 75px"
                    type="number"
                    step="1"
                    v-model="quantity"
                    class="text-center"
                    @blur="handleQuantity"
                  />
                  <v-btn
                    text
                    @click="increment"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-card>
              </v-card-actions>
              <v-card-actions>
                <v-btn
                  tile
                  outlined
                  color="primary lighten-2"
                  @click="addToCart()"
                >Dodaj do koszyka</v-btn>
                <v-btn
                  tile
                  depressed
                  color="primary lighten-2"
                  @click="addToCart()"
                >Kup teraz</v-btn>
              </v-card-actions>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card class="elevation-1">
      <v-tabs
        v-model="tab"
      >
        <v-tab v-if="product.parameters && product.parameters.length > 0">Parametry</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="6"
                v-for="(parameter, index) in product.parameters"
                :key="index"
              >
                <v-row no-gutters>
                  <v-col cols="4">
                    <p class="mb-0 grey--text text--darken-1" v-text="parameter.name.name"></p>
                  </v-col>
                  <v-col cols="4">
                    <p
                      class="mb-0"
                      v-for="(value, i) in parameter.values"
                      :key="i"
                      v-text="value.value"
                    ></p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
  import Money from '~/components/Money/Money'
  export default {
    components: {
      Money,
    },
    data: () => ({
      quantity: 1,
      tab: 0,
    }),
    mounted() {
      if (this.$store.state.categories.parentCategories.length <= 0) {
        this.$store.dispatch('categories/fetchParent')
      }
      this.$store.dispatch('products/findBySlug', this.$route.params.product)
    },
    computed: {
      product() {
        return this.$store.state.products.product
      },
      loading() {
        return this.$store.state.products.loading.product
      },
      activeImage() {
        return this.$store.state.products.activeImage
      },
    },
    methods: {
      handleQuantity() {
        if (typeof this.quantity === "string") {
          this.quantity = parseInt(this.quantity)
        }

        if (this.quantity < 1) {
          this.quantity = 1
        }
      },
      setActiveImage(image) {
        this.$store.commit('products/setActiveImage', image)
      },
      imageUrl(path) {
        return process.env.storageUrl + path
      },
      addToCart() {
        this.$store.dispatch('cart/add', { product: this.product, count: this.quantity })
      },
      increment() {
        this.quantity += this.product.unit.step
      },
      decrement() {
        if ((this.quantity - this.product.unit.step < 1)) {
          this.quantity = 1

          return
        }

        this.quantity -= this.product.unit.step
      },
    }
  }
</script>
