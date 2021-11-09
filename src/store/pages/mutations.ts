import { MutationTree } from 'vuex';
import { PagesStateInterface,HomePage } from './state';

const mutation: MutationTree<PagesStateInterface> = {
  setHomePage(state: PagesStateInterface, payload: HomePage[]) {
    state.homePage = payload
  },
};

export default mutation;
