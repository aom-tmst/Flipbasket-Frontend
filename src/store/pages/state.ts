interface Images{
  url: string;
}

export interface HomePage {
  _id: number;
  name: string;
  desc: string;
  price: number;
  images: Images[];
}

export interface PagesStateInterface {
  homePage: HomePage[] | null
}

function state(): PagesStateInterface {
  return {
    homePage: null,
  };
}

export default state;
