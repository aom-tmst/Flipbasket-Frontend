import { api } from 'boot/axios';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PagesStateInterface, Store,AllProduct } from './state';

const actions: ActionTree<PagesStateInterface, StateInterface> = {
  async fetchHomePage({ commit }) {
    const result = await api
      .get<Store>('stores')
      .then((response) => response.data);
    commit('setHomePage', result);
    return result;
  },

  async fetchAllProduct({ commit }) {
    const result = await api
      .get<AllProduct>('products')
      .then((response) => response.data);
    commit('setAllProduct', result);
    return result;
  },

  UpdateProduct({ dispatch }) {
    void dispatch('fetchHomePage');
  },

  AddProduct({ dispatch }) {
    void dispatch('fetchHomePage');
  },

  DeleteProduct({ dispatch }) {
    void dispatch('fetchHomePage');
  },

  UpdateProfileName({ dispatch }) {
    void dispatch('fetchHomePage');
  },

  SubmitUid({ dispatch, commit }, userDetail) {
    commit('setUsetUid', userDetail);
    void dispatch('fetchHomePage');
  },
};

export default actions;
