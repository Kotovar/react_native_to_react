import { observer } from 'mobx-react-lite'
import type { ICatalogueProduct } from '@services'
import { stores } from '@stores'
import { TouchableCustom } from '../TouchableCustom/TouchableCustom'
import { TextView } from '../TextView/TextView'
import styles from './AmountControl.module.scss'

interface Props {
  product: ICatalogueProduct
}

export const AmountControl = observer(({
  product,
}: Props) => {
  const {
    userStore: { getQuantity, incrementQuantity, decrementQuantity },
  } = stores

  const quantity = getQuantity(product.id)
  const numericPrice = product.price.replace(/[^\d,.\s]/g, '').trim()
  const [majorPartRaw, minorPartRaw] = numericPrice.replace(',', '.').split('.')
  const majorPart = majorPartRaw || '0'
  const minorPart = (minorPartRaw || '00').padEnd(2, '0').slice(0, 2)

  return (
    <div className={styles.root}>
      <div className={styles.priceBlock}>
        <div className={styles.priceRow}>
          <TextView textStyle={'20-900'} className={styles.priceMajor}>
            {majorPart}
          </TextView>
          <span className={styles.priceMinor}>{minorPart}</span>
        </div>
        <TextView textStyle={'14-400'} color="var(--color-gray)" className={styles.priceMeta}>
          за 1 шт
        </TextView>
      </div>
      {quantity > 0 ? (
        <div className={styles.controls}>
          <TouchableCustom className={styles.stepper} onPress={() => decrementQuantity(product.id)}>
            -
          </TouchableCustom>
          <TextView textStyle={'15-700'}>{String(quantity)}</TextView>
          <TouchableCustom className={styles.stepper} onPress={() => incrementQuantity(product.id)}>
            +
          </TouchableCustom>
        </div>
      ) : (
        <TouchableCustom className={styles.button} onPress={() => incrementQuantity(product.id)}>
          <TextView textStyle={'15-700'} color="var(--color-white)">
            В корзину
          </TextView>
        </TouchableCustom>
      )}
    </div>
  )
})
