export interface FixProduct { 
    _id : string
    name: string
    desc : string
    price: number
    createAt: string
    image_Url: string 
    type: string
    uid: string
    store: Store
}

interface Store {
    _id: string;
    name: string;
    uid: string;
  }

export interface GalleryImg {
    img : string
}
