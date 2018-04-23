
import { seemnite } from '../api'
import Cookies from 'universal-cookie'
import conf from '../config'

export default {
  async INITSTORE({ commit, state, getters }, user) {
    const cookies = new Cookies()
    let token = cookies.get(conf.storageNamespace + 'token')
    if (token) {
      commit('SET_TOKEN', token)
    }
  },
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
