import { Product } from 'src/type/Product';
import { MutationTree } from 'vuex';
import { PagesStateInterface, Store } from './state';

const mutation: MutationTree<PagesStateInterface> = {
  setHomePage(state: PagesStateInterface, payload: Store[]) {
    state.store = payload;
  },

  onUpdateProduct(state: PagesStateInterface, payload: Product) {
    const index = state.store[0].products.findIndex(
      (data) => data._id == payload._id
    );
    state.store[0].products[index] = payload;
  },

  // onDeleteProduct(state: PagesStateInterface, payload: Product) {
  //   const index = state.store[0].products.findIndex((data) => data._id == payload._id);
  //   state.store[0].products[index] = payload;
  // },
};

export default mutation;
