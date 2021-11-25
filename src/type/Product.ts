export interface Product { 
    _id : string
    name: string
    desc : string
    price: number
    createAt: string
    image: Image
    type: string
    uid: string
    
}

export interface GalleryImg {
    img : string
}

interface Image {
  url: string
}