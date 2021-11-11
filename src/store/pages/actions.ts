import { api } from 'boot/axios'
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PagesStateInterface,HomePage } from './state';

const actions: ActionTree<PagesStateInterface, StateInterface> = {
  async fetchHomePage({ commit }) {
    const result = await api
      .get<HomePage>('stores')
      .then((response) => response.data)
    commit('setHomePage', result)

    return result
  },
};

export default actions;
