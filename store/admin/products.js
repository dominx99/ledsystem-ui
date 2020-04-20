export const state = () => ({
  product: {},
  loading: {
    product: false,
    addProduct: false,
  },
})

export const actions = {
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
  }
}

export const mutations = {
  setProduct(state, product) {
    state.product = product
  },
  setLoading(state, name) {
    state.loading[name] = true
  },
  removeLoading(state, name) {
    state.loading[name] = false
  },
}
