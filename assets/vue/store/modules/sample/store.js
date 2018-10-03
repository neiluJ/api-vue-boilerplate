import * as types from './types'
import actions from './actions'
import getters from './getters'
import * as CONST from './const'

const state = {
  count: CONST.DEFAULT_COUNT,
}

const mutations = {
  [types.SET_COUNT] (state, count) {
    state.count = count
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}