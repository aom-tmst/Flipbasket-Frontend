export interface FixProduct { 
    _id : string
    name: string
    desc : string
    price: number
    createAt: string
    image: Image
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

interface Image {
  url: string
}