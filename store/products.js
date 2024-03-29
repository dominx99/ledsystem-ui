export const state = () => ({
  products: [],
  loading: {
    products: true,
    product: true,
  },
  product: {},
  activeImage: {},
})

export const actions = {
  async fetchByCategorySlug({ commit }, slug) {
    try {
      commit('setLoadingProducts')

      const res = await this.$axios.get(`v1/categories/${slug}/products`)

      commit('setProducts', res.data)
    } catch (e) {
      console.error("Failed to load products")
    }
  },
  async findBySlug({ commit }, slug) {
    try {
      commit('setLoadingProduct')

      const res = await this.$axios.get(`v1/products/by-slug?slug=${slug}`)

      commit('setActiveImage', res.data.images[0])
      commit('setProduct', res.data)
    } catch (e) {
      console.error("Failed to find product")
    }
  },
}

export const mutations = {
  setProducts(state, products) {
    state.products = products
    state.loading.products = false
  },
  clearProducts(state) {
    state.products = []
  },
  setProduct(state, product) {
    state.product = product
    state.loading.product = false
  },
  setActiveImage(state, image) {
    state.activeImage = image
  },
  setLoading(state, name) {
    state.loading[name] = true
  },
  removeLoading(state, name) {
    state.loading[name] = false
  },
  setLoadingProduct(state) {
    state.loading.product = true
  },
  setLoadingProducts(state) {
    state.loading.products = true
  },
}
