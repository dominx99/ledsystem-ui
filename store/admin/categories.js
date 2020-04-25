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
}
