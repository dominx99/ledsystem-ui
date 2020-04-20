export const state = () => ({
  productCategoriesParameters: [],
  loading: {
    productCategoriesParameters: false,
  },
  newProduct: {
    existingParameters: [],
    newParameters: [],
  },
})

export const actions = {
  async fetchByCategoryIds({ commit }, categoryIds) {
    commit('setLoading', 'productCategoriesParameters')

    try {
      const res = await this.$axios.get('v1/parameters/by-category-ids', {
        params: {
          category_ids: categoryIds
        }
      })

      commit('setProductCategoriesParameters', res.data)
      commit('removeLoading', 'productCategoriesParameters')
    } catch (e) {
      console.error('Failed to load product categories\' parameters')
    }
  }
}

export const mutations = {
  setProductCategoriesParameters(state, parameters) {
    state.productCategoriesParameters = parameters
  },
  setNewProductExistingParameters(state, parameters) {
    state.newProduct.existingParameters = parameters
  },
  updateParameterValues(state, { index, values }) {
    state.newProduct.existingParameters[index].parameter_value_ids = values
  },
  updateNewParameterName(state, { index, name }) {
    state.newProduct.newParameters[index].name = name
  },
  updateNewParameterValues(state, { index, values }) {
    state.newProduct.newParameters[index].values = values
  },
  addNewParameter(state, { name, values }) {
    state.newProduct.newParameters.push({ name, values })
  },
  removeNewParameter(state, index) {
    state.newProduct.newParameters.splice(index, 1)
  },
  setLoading(state, name) {
    state.loading[name] = true
  },
  removeLoading(state, name) {
    state.loading[name] = false
  },
}
