<template>
  <div>
    <v-layout class="image-box" v-if="Object.keys(activeImage).length > 0">
      <v-flex
        xs12
        md9
      >
        <v-img
          class="my-auto image"
          :aspect-ratio="16/9"
          :src="imageUrl(activeImage.original.path)"
        />
      </v-flex>
      <v-flex
        xs12
        md3
      >
        <div
          class="d-flex images"
        >
          <v-img
            class="mr-2 s-image"
            v-for="(image, i) in product.images"
            :key="i"
            :aspect-ratio="16/9"
            :src="imageUrl(image.thumbnail.path)"
            @click="setActiveImage(image)"
          />
        </div>
      </v-flex>
    </v-layout>
    <v-alert color="warning" v-else>
      Produkt nie posiada obrazków.
    </v-alert>
  </div>
</template>

<script>
export default {
  computed: {
    product() {
      return this.$store.state.admin.products.product
    },
    productLoading() {
      return this.$store.state.admin.products.loading.product
    },
    activeImage() {
      return this.$store.state.admin.products.activeImage
    },
  },
  watch: {
    async productLoading(value) {
      if (value === true) {
        return
      }

      if (! this.product.images[0]) {
        return
      }

      this.setActiveImage(this.product.images[0])
    },
  },
  methods: {
    setActiveImage(image) {
      this.$store.commit('admin/products/setActiveImage', image)
    },
    imageUrl(path) {
      return process.env.storageUrl + path
    },
  },
}
</script>

<style lang="scss" scoped>
  .image-box {
    flex-wrap: wrap;

    .image {
      @media (min-width: map-get($grid-breakpoints, 'md')) {
        height: 600px;
      }
    }

    .images {
      width: 100%;
      flex-direction: row;
      overflow-x: auto;
      height: 100%;

      .s-image {
        width: 100px;
      }

      &::-webkit-scrollbar {
        width: 10px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      &::-webkit-scrollbar-thumb {
        background: #888;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

      @media (min-width: map-get($grid-breakpoints, 'md')) {
        height: 600px;
        flex-direction: column;
        overflow-y: auto;

        .s-image {
          width: 100%;
        }
      }
    }
  }
</style>
