export const state = () => ({
  categories: [],
  parentCategories: [],
  activeCategories: [],
  loading: {
    categories: true,
    parentCategories: true,
    activeCategories: true,
  }
})

export const actions = {
  async fetch({ commit }) {
    try {
      commit('setLoading', 'categories')

      const res = await this.$axios.get("v1/categories")

      commit('setCategories', res.data)
    } catch (e) {
      console.error("Failed to load categories.")
    }
  },
  async fetchParent({ commit }) {
    try {
      commit('setLoading', 'parentCategories')

      const res = await this.$axios.get("v1/categories/parent")

      commit('setParentCategories', res.data)
    } catch (e) {
      console.error("Failed to load categories.")
    }
  },
  async fetchByParentSlug({ commit }, slug) {
    try {
      commit('setLoading', 'activeCategories')

      const res = await this.$axios.get("v1/categories/by-parent-slug?slug=" + slug)

      commit('setActiveCategories', res.data)
    } catch (e) {
      console.error("Failed to load categories.")
    }
  }
}

export const mutations = {
  setCategories(state, categories) {
    state.categories = categories
    state.loading.categories = false
  },
  setParentCategories(state, categories) {
    state.parentCategories = categories
    state.loading.parentCategories = false
  },
  setActiveCategories(state, categories) {
    state.activeCategories = categories
    state.loading.activeCategories = false
  },
  setLoading(state, name) {
    state.loading[name] = true
  },
}
