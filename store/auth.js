export const state = () => ({
  loading: {
    login: false
  },
  errors: {
    login: ''
  },
})

export const actions = {
  async login({ commit }, { email, password }) {
    try {
      commit('setLoadingLogin')
      commit('setLoginError', '')

      const res = await this.$axios.post(`v1/auth/login`, { email, password, grant_type: 'credentials' })

      if (res.status === 200) {
        this.$router.push({ name: 'admin-produkty' })

        return
      }
    } catch (e) {
      if (e.response.status === 400 && typeof e.response.data.error !== "undefined") {
        commit('setLoginError', e.response.data.error)

        return
      }

      commit('setLoginError', 'Wrong email or password.')
    }
  }
}

export const mutations = {
  setLoadingLogin(state) {
    state.loading.login = true
  },
  setLoginError(state, error) {
    state.errors.login = error
    state.loading.login = false
  },
}
