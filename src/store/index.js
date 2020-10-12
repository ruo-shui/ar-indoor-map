import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutation'

Vue.use(Vuex)

const state = {
  isNavShow:false
}

const store = new Vuex.Store({
  state,
  mutations
})

export default store