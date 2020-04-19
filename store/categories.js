export const state = () => ({
  categories: [],
  parentCategories: [],
  activeCategories: [],
  categoriesTree: [],
  activeCategory: {},
  loading: {
    categories: true,
    parentCategories: true,
    activeCategories: true,
    categoriesTree: true,
    activeCategory: false,
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
      console.error("Failed to load parent categories.")
    }
  },
  async fetchRecursive({ commit }) {
    try {
      commit('setLoading', 'categoriesTree')

      const res = await this.$axios.get("v1/categories/recursive")

      commit('setCategoriesTree', res.data)
    } catch (e) {
      console.error("Failed to load recursive categories.")
    }
  },
  async fetchByParentSlug({ commit }, slug) {
    try {
      commit('setLoading', 'activeCategories')

      const res = await this.$axios.get("v1/categories/by-parent-slug?slug=" + slug)

      commit('setActiveCategories', res.data)
    } catch (e) {
      console.error("Failed to load categories by slug.")
    }
  },
  async findById({ commit }, id) {
    try {
      commit('setLoading', 'activeCategory')

      const res = await this.$axios.get(`v1/categories/${id}`)

      commit('setActiveCategory', res.data)
    } catch (e) {
      console.error("Failed to load active category.")
    }
  },
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
  setCategoriesTree(state, categories) {
    state.categoriesTree = categories
    state.loading.categoriesTree = false
  },
  setActiveCategory(state, category) {
    state.activeCategory = category
    state.loading.activeCategory = false
  },
  setLoading(state, name) {
    state.loading[name] = true
  },
}
