import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { State } from '../index'

import { fetchBingImgApi } from '@/api/common'

export interface BasicState {
    bingImg: string;
}

const state: BasicState = {
  bingImg: '',
}

// getters
const getters: GetterTree<BasicState, State> = {}
const actions: ActionTree<BasicState, State> = {
  async fetchBingImg({ commit }) {
    const { url } = await fetchBingImgApi()
    commit('setBingImg', url)
  },
}

const mutations: MutationTree<BasicState> = {
  setBingImg(state, url) {
    state.bingImg = url
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
