import { Product } from 'src/type/Product';

export interface Store {
  products: Product[];
  _id: string;
  name: string;
  uid: string
}

export interface UserDetail {
  name: string
  uid: string
}

export interface PagesStateInterface {
  store: Store[],
  auth: UserDetail
}

function state(): PagesStateInterface {
  return {
    store: [] as Store[],
    auth: {} as UserDetail
  };
}

export default state;
