import { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { stores } from '@stores'
import { getWeight } from '@utils'
import { TextView } from '../TextView/TextView'
import styles from './ProductVariations.module.scss'

interface Props {
  productId: string
  onPress: (id: string) => void | Promise<void>
}

export const ProductVariations = observer(({
  productId,
  onPress,
}: Props) => {
  const {
    catalogueStore: { catalogueProducts, currentProductId },
  } = stores

  const product = catalogueProducts[productId]
  const variationIds = product?.variations ?? []

  const handleSelect = useCallback((id: string) => {
    void onPress(id)
  }, [onPress])

  if (variationIds.length <= 1) return null

  return (
    <div className={styles.root}>
      {variationIds.map((id) => {
        const variation = catalogueProducts[id]

        if (!variation) return null

        const isActive = currentProductId === id

        return (
          <button
            key={id}
            type="button"
            className={isActive ? styles.buttonActive : styles.button}
            onClick={() => handleSelect(id)}
          >
            <TextView textStyle={'14-500'}>
              {getWeight(variation.weight, variation.ed_izm)}
            </TextView>
          </button>
        )
      })}
    </div>
  )
})
