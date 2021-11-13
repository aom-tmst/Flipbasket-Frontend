import { Product } from 'src/type/Product';


export interface Store {
  products : Product[]
}

export interface PagesStateInterface {
  store: Store[] 
}

function state(): PagesStateInterface {
  return {
    store: [] as Store[]
  };
}

export default state;
