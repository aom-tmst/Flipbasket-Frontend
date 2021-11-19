import { Product } from 'src/type/Product';

interface Image {
  url: string;
}

export interface UserDetail {
  name: string | null | undefined;
  uid: string | null | undefined;
}

export interface Store {
  _id: string;
  name: string;
  uid: string;
  products: Product[];
}

export interface AllProduct {
  _id: string;
  name: string;
  desc: string;
  price: number;
  createAt: string;
  image: Image;
  type: string;
  uid: string;
  store: Store[];
}

export interface PagesStateInterface {
  allProduct: AllProduct[];
  store: Store[];
  auth: UserDetail;
}

function state(): PagesStateInterface {
  return {
    allProduct: [] as AllProduct[],
    store: [] as Store[],
    auth: {} as UserDetail,
  };
}

export default state;
