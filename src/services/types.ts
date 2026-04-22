export type IProductImage = {
  id: string
  url: string
}

export type IProductTag = {
  key: string
  title: string
  background: string
}

export type ICatalogueProduct = {
  id: string
  title: string
  weight: string
  ed_izm?: string
  url: string
  availableones: number
  imageUrl: string
  imageUrls?: string[]
  images: IProductImage[]
  short_description: string
  storage: string
  sostav: string
  calories_amount: string
  bel_amount: string
  fats_amount: string
  ugl_amount: string
  related: string[]
  variations: string[]
  tags: IProductTag[]
  price: string
}

export type IRelatedProduct = ICatalogueProduct
