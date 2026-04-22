import clsx from 'clsx'
import { catalogueProducts } from '@services'
import { TextView } from '../TextView/TextView'
import styles from './ProductCard.module.scss'

interface Props {
  id: string
  className?: string
  onPress?: (title?: string) => void
  isOnePhoto?: boolean
}

export const ProductCard = ({
  id,
  className,
  onPress,
  isOnePhoto = false,
}: Props) => {
  const product = catalogueProducts[id]

  if (!product) return null

  const imageUrls = product.imageUrls?.length ? product.imageUrls : [product.imageUrl]
  const mainImageUrl = imageUrls[0]
  const showPhotoCount = !isOnePhoto && imageUrls.length > 1

  return (
    <article
      className={clsx(styles.card, className)}
      onClick={() => onPress?.(product.title)}
    >
      <img
        src={mainImageUrl}
        alt={product.title}
        className={styles.image}
      />
      {showPhotoCount && (
        <span className={styles.photoCount}>
          {`${imageUrls.length} фото`}
        </span>
      )}
      <div className={styles.body}>
        <TextView textStyle={'14-700'} numberOfLines={2} className={styles.title}>
          {product.title}
        </TextView>
        <TextView textStyle={'14-400'} color="var(--color-gray)">
          {product.weight}
        </TextView>
        <TextView textStyle={'15-700'} className={styles.price}>
          {product.price}
        </TextView>
      </div>
    </article>
  )
}
