export const state = () => ({
  products: [],
  loading: {
    products: true
  }
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
}

export const mutations = {
  setProducts(state, products) {
    state.products = products
    state.loading.products = false
  },
  setLoadingProducts(state) {
    state.loading.products = true
  },
}
