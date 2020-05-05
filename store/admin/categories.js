export const state = () => ({
  activeCategory: {},
  steps: {
    createCategory: 1,
  },
  error: {
    updateCategory: '',
    createCategory: '',
  },
  errors: {
    updateCategory: {},
    createCategory: {},
  },
  loading: {
    updateCategory: false,
    updateParameters: false,
    createCategory: false,
    activeCategory: false,
  },
})

export const actions = {
  updateParameters({ commit }, { categoryId, parameterIds }) {
    try {
      commit('setLoading', 'updateParameters')

      this.$axios.post(`v1/categories/${categoryId}/update-parameters`, {
        parameter_name_ids: parameterIds,
      })
    } catch(e) {
      console.error('Failed to update parameters.')
    }
  },
  async create({ commit }, params) {
    try {
      commit('setLoading', 'createCategory')

      await this.$axios.post(`v1/categories`, params)
    } catch(e) {
      if (e.response.status === 422) {
        commit('setErrors', {
          name: 'createCategory',
          errors: e.response.data.errors
        })
        commit('removeLoading', 'createCategory')

        return
      }
    }
  },
  async update({ commit }, { categoryId, params }) {
    try {
      commit('clearError', 'updateCategory')
      commit('setLoading', 'updateCategory')

      await this.$axios.put(`v1/categories/${categoryId}`, params)
    } catch(e) {
      if (e.response.status === 422) {
        commit('setErrors', {
          name: 'updateCategory',
          errors: e.response.data.errors
        })
        commit('removeLoading', 'updateCategory')

        return
      }

      if (e.response.status === 400) {
        commit('setError', {
          name: 'updateCategory',
          error: e.response.data.error
        })
        commit('removeLoading', 'updateCategory')
      }
    }
  },
  async findById({ commit }, id) {
    try {
      commit('setLoading', 'activeCategory')

      const res = await this.$axios.get(`v1/categories/${id}`)

      commit('setActiveCategory', res.data)
      commit('removeLoading', 'activeCategory')
    } catch (e) {
      console.error("Failed to load active category.")
    }
  },
}

export const mutations = {
  setActiveCategory(state, category) {
    state.activeCategory = category
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
  setError(state, { name, error }) {
    state.error[name] = error
  },
  clearError(state, name) {
    state.error[name] = ''
  },
  nextStep(state, name) {
    state.steps[name]++
  },
  setStep(state, { name, value }) {
    state.steps[name] = value
  },
}
