export type IProductImage = {
  id: string
  url: string
}

export type IRelatedProduct = {
  id: string
  title: string
  weight: string
  imageUrl: string
  imageUrls?: string[]
  price: string
}
