import { api } from 'boot/axios';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PagesStateInterface, Store,AllProduct,Cart,Notification } from './state';

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

  async fetchCartPage({ commit }) {
    const result = await api
      .get<Cart>('carts')
      .then((response) => response.data);
    commit('setCartPage', result);
    return result;
  },

  async fetchNotification({ commit }) {
    const result = await api
      .get<Notification>('notifications')
      .then((response) => response.data);
    commit('setNotification', result);
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

  UpdateCarts({ dispatch }) {
    void dispatch('fetchCartPage');
  },

  UpdateNotification({ dispatch }) {
    void dispatch('fetchNotification');
  },

  SubmitUid({ dispatch, commit }, userDetail) {
    commit('setUsetUid', userDetail);
    void dispatch('fetchHomePage');
  },

   InputMessage({ dispatch, commit }, thisMessage) {
    commit('setMessage', thisMessage);
    void dispatch('fetchHomePage');
  },
};

export default actions;
