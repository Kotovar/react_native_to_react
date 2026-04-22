import { createRef } from 'react'
import { makeAutoObservable } from 'mobx'
import { catalogueProducts, initialProductId } from '@services'
import type { ICatalogueProduct, IProductTag } from '@services'

class CatalogueStore {
  catalogueProducts = catalogueProducts
  currentProductId = initialProductId
  productScrollViewRef = createRef<HTMLDivElement>()

  constructor() {
    makeAutoObservable(this, {
      productScrollViewRef: false,
    }, {
      autoBind: true,
    })
  }

  setCurrentProductId(id: string) {
    if (!this.catalogueProducts[id]) return
    this.currentProductId = id
  }

  getProductStore(id: string) {
    const product = this.catalogueProducts[id]

    if (!product) return undefined

    return {
      product: {
        value: product,
      },
    }
  }

  getTagsData(product?: ICatalogueProduct): IProductTag[] {
    return product?.tags ?? []
  }

  async openProduct(id: string) {
    this.setCurrentProductId(id)
  }
}

class UserStore {
  favoriteIds = new Set<string>()
  quantities: Record<string, number> = {}
  userGroup = 'web-mock-group'

  constructor() {
    makeAutoObservable(this, {}, {
      autoBind: true,
    })
  }

  toggleFavoriteProduct(product: ICatalogueProduct) {
    if (this.favoriteIds.has(product.id)) {
      this.favoriteIds.delete(product.id)
      return
    }

    this.favoriteIds.add(product.id)
  }

  getIsFavorite(id: string) {
    return this.favoriteIds.has(id)
  }

  getQuantity(id: string) {
    return this.quantities[id] ?? 0
  }

  incrementQuantity(id: string) {
    this.quantities[id] = this.getQuantity(id) + 1
  }

  decrementQuantity(id: string) {
    const nextValue = Math.max(this.getQuantity(id) - 1, 0)

    if (!nextValue) {
      delete this.quantities[id]
      return
    }

    this.quantities[id] = nextValue
  }
}

export const stores = {
  catalogueStore: new CatalogueStore(),
  userStore: new UserStore(),
}
