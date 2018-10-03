import * as types from './types'
import { DEFAULT_COUNT } from './const'

export default {
  [types.INCREMENT_COUNT] ({state, commit}) {
    let count = state.count + 1
    if (count > 42) {
      count = DEFAULT_COUNT
    }

    commit(types.SET_COUNT, count)
  }
}