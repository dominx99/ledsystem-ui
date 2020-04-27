export const state = () => ({
  error: {
    updateCategory: '',
  },
  errors: {
    updateCategory: {},
  },
  loading: {
    updateCategory: false,
    updateParameters: false,
  },
})

export const actions = {
  updateParameters(_, { categoryId, parameterIds }) {
    try {
      this.$axios.post(`v1/categories/${categoryId}/update-parameters`, {
        parameter_name_ids: parameterIds,
      })
    } catch(e) {
      console.error('Failed to update parameters.')
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
}

export const mutations = {
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
}
