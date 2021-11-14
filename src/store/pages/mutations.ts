import { MutationTree } from 'vuex';
import { PagesStateInterface, Store } from './state';

const mutation: MutationTree<PagesStateInterface> = {
  setHomePage(state: PagesStateInterface, payload: Store[]) {
    state.store = payload;
  },
};

export default mutation;
