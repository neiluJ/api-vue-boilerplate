import Vue from 'vue'
import Vuex from 'vuex'

import sample from './modules/sample/store'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    sample
  },
  strict: debug
})