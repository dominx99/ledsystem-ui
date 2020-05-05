export const state = () => ({
  products: [],
  product: {},
  activeImage: {},
  loading: {
    products: true,
    product: false,
    addProduct: false,
  },
  errors: {
    addProduct: {}
  },
})

export const actions = {
  async fetch({ commit }) {
    try {
      commit('setLoading', 'products')

      const res = await this.$axios.get(`v1/products`)

      commit('setProducts', res.data)
    } catch (e) {
      console.error("Failed to load products.")
    }
  },
  async findById({ commit }, id) {
    try {
      commit('setLoading', 'product')

      const res = await this.$axios.get(`v1/products/${id}`)

      commit('setProduct', res.data)
      commit('removeLoading', 'product')
    } catch (e) {
      console.error("Failed to find product.")
    }
  },
  async add({ commit, dispatch }, params) {
    try {
      commit('setLoading', 'addProduct')
      commit('clearErrors', 'addProduct')

      let data = new FormData()

      for (let itemKey in params) {
        if (itemKey === 'categories') {
          params.categories.forEach((category, i) => {
            data.append(`categories[${i}]`, category)
          })
        } else if (itemKey === 'images') {
          params.images.forEach((image, i) => {
            data.append(`images[${i}]`, image)
          })
        } else {
          data.append(itemKey, params[itemKey])
        }
      }

      await this.$axios.post('v1/products', data, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
    } catch(e) {
      console.error('Failed to add product.')

      if (e.response.status === 422) {
        commit('setErrors', {
          name: 'addProduct',
          errors: e.response.data.errors
        })
        commit('removeLoading', 'addProduct')

        return
      }
    }
  },
  assignParameters({ commit }, { productId, parameters, newParameters }) {
    try {
      this.$axios.post(`v1/products/${productId}/assign-parameters`, {
        parameters,
        new_parameters: newParameters,
      })
    } catch (e) {
      console.error('Failed to assign product parameters.')
    }
  },
  async setMainImage({ commit }, { productId, imageId }) {
    try {
      commit('setLoading', 'setActiveImage')

      await this.$axios.post(`v1/products/${productId}/set-main-image`, {
        image_id: imageId
      })
    } catch (e) {
      console.error("Failed to set active image.")
    }
  },
}

export const mutations = {
  setProducts(state, products) {
    state.products = products
    state.loading.products = false
  },
  setProduct(state, product) {
    state.product = product
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
  setErrors(state, { name, errors }) {
    state.errors[name] = errors
  },
  clearErrors(state, name) {
    state.errors[name] = {}
  },
}
