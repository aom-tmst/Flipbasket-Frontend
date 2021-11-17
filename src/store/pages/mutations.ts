import { MutationTree } from 'vuex';
import { PagesStateInterface, Store, UserDetail } from './state';

const mutation: MutationTree<PagesStateInterface> = {
  setHomePage(state: PagesStateInterface, payload: Store[]) {
    state.store = payload;
  },

  setUsetUid(state: PagesStateInterface, userDetail: UserDetail){
    state.auth = userDetail
    console.log(state.auth , 'auth');
  }
};
export default mutation;