import { api } from 'boot/axios'
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PagesStateInterface,Store } from './state';

const actions: ActionTree<PagesStateInterface, StateInterface> = {
  async fetchHomePage({ commit }) {
    const result = await api
      .get<Store>('stores')
      .then((response) => response.data)
    commit('setHomePage', result)

    return result
  },

   UpdateProduct({ dispatch }){
    void dispatch('fetchHomePage')
  },

  AddProduct({ dispatch }){
    void dispatch('fetchHomePage')
  },

  DeleteProduct({ dispatch }){
    void dispatch('fetchHomePage')
  },

  UpdateProfileName({ dispatch }){
    void dispatch('fetchHomePage')
  },


};

export default actions;
