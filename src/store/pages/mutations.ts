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
  },

  setMessage(state: PagesStateInterface, thisMessage: string){
    state.message.push(thisMessage)
    // message.value.push(thisMessage);  
    console.log(state.message , 'message on mutations');
  }
};
export default mutation;