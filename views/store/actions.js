
import { seemnite } from '../api'

export default {
  async LOGIN({ commit, state, getters }, user) {
    const { data } = await seemnite.login({data: user})
    commit('SET_TOKEN', data.token)
    return data
  },

  async LOGOUT({ commit, state, getters }) {
    const { data } = await seemnite.logout({
      headers: {
        token: ''
      }
    })
    return data
  }
}
