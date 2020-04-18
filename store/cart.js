export const state = () => ({
  items: []
})

export const actions = {
  async clear({ commit }) {
    commit('clear')
  },
  async add({ commit }, item) {
    commit('pushItem', item)
  },
  async increment({ commit }, item) {
    commit('increment', item)
  },
  async decrement({ commit }, item) {
    commit('decrement', item)
  },
  async remove({ commit }, item) {
    commit("remove", item)
  },
}

export const mutations = {
  pushItem(state, newItem) {
    let index = state.items.findIndex(item => item.product.id === newItem.product.id)

    if (index !== -1) {
      state.items[index].count += newItem.count

      return
    }

    state.items.push(newItem)
  },
  clear(state) {
    state.items = []
  },
  remove(state, oldItem) {
    let index = state.items.findIndex(item => oldItem.product.id === item.product.id)

    if (index === -1) {
      return
    }

    state.items.splice(index, 1)
  },
  increment(state, newItem) {
    let index = state.items.findIndex(item => newItem.product.id === item.product.id)

    if (index === -1) {
      return
    }

    state.items[index].count++
  },
  decrement(state, newItem) {
    let index = state.items.findIndex(item => newItem.product.id === item.product.id)

    if (index === -1) {
      return
    }

    if (state.items[index].count === 1) {
      return
    }

    state.items[index].count--
  },
}

export const getters = {
  sum: (state) => {
    let sum = 0

    state.items.map(item => {
      sum += item.count * item.product.unit.price
    })

    return sum
  }
}
