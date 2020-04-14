export const state = () => ({
  categories: [],
  activeCategories: [],
  loading: {
    categories: true,
    activeCategories: true,
  }
})

export const actions = {
  async fetch({ commit }) {
    try {
      commit('setLoadingCategories')

      const res = await this.$axios.get("v1/categories")

      commit('setCategories', res.data)
    } catch (e) {
      console.error("Failed to load categories")
    }
  },
  async fetchByParentSlug({ commit }, slug) {
    try {
      commit('setLoadingActiveCategories')

      const res = await this.$axios.get("v1/categories/by-parent-slug?slug=" + slug)

      commit('setActiveCategories', res.data)
    } catch (e) {
      console.error("Failed to load categories")
    }
  }
}

export const mutations = {
  setCategories(state, categories) {
    state.categories = categories
    state.loading.categories = false
  },
  setActiveCategories(state, categories) {
    state.activeCategories = categories
    state.loading.activeCategories = false
  },
  setLoadingCategories(state) {
    state.loading.categories = true
  },
  setLoadingActiveCategories(state) {
    state.loading.activeCategories = true
  },
}
