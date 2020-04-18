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
  async fetch({ commit }) {
    try {
      commit('setLoadingProducts')

      const res = await this.$axios.get(`v1/products`)

      commit('setProducts', res.data)
    } catch (e) {
      console.error("Failed to load products.")
    }
  },
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
  async add({ commit, dispatch }, params) {
    try {
      commit('setLoading', 'addProduct')

      let data = new FormData()
      params.images.forEach((image, i) => {
        data.append(`images[${i}]`, image)
      })
      params.categories.forEach((category, i) => {
        data.append(`categories[${i}]`, category)
      })
      data.append('name', params.name)
      data.append('type', params.type)
      data.append('base', params.base)
      data.append('step', params.step)
      data.append('price', params.price)

      await this.$axios.post('v1/products', data, {
        headers: {'Content-Type': 'multipart/form-data'}
      })

      commit('removeLoading', 'addProduct')
      this.$router.push('/admin/produkty')
      setTimeout(() => dispatch('fetch'), 2500)
    } catch(e) {
      console.error('Failed to add product.')
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
