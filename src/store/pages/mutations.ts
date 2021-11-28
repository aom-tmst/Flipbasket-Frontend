import { MutationTree } from 'vuex';
import { PagesStateInterface, Store, UserDetail,AllProduct,Cart,Notification } from './state';

const mutation: MutationTree<PagesStateInterface> = {
  setHomePage(state: PagesStateInterface, payload: Store[]) {
    state.store = payload;
  },

  setAllProduct(state: PagesStateInterface, payload: AllProduct[]) {
    state.allProduct = payload;
  },

  setCartPage(state: PagesStateInterface, payload: Cart[]) {
    state.cart = payload;
  },

  setNotification(state: PagesStateInterface, payload: Notification[]) {
    state.notification = payload;
  },

  setUsetUid(state: PagesStateInterface, userDetail: UserDetail){
    state.auth = userDetail
    console.log(state.auth , 'auth');
  }
};
export default mutation;