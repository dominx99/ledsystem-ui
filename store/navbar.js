export const state = () => ({
  drawer: false,
  switches: {
    search: false,
  },
})

export const mutations = {
  updateSearchSwitch(state, search) {
    state.switches.search = search
  },
  updateDrawer(state, drawer) {
    state.drawer = drawer
  }
}
