import { useCallback, useRef, useState } from 'react'
import { HorizontalList, Indicators } from '@components'
import type { IProductImage } from '@services'
import styles from './ProductPhotos.module.scss'

interface Props {
  images: IProductImage[]
}

export const ProductPhotos = ({ images }: Props) => {
  const listRef = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState(0)
  const [pageWidth, setPageWidth] = useState(0)

  const renderItem = useCallback((item: IProductImage, index: number) => {
    return (
      <div className={styles.slideInner}>
        <img
          src={item.url}
          alt={`Фото товара ${index + 1}`}
          className={styles.image}
        />
      </div>
    )
  }, [])

  const scrollToIndex = useCallback((index: number) => {
    const container = listRef.current
    if (!container) return

    container.scrollTo({
      left: container.clientWidth * index,
      behavior: 'smooth',
    })
  }, [])

  const handleOffsetChange = useCallback((nextOffset: number) => {
    setOffset(nextOffset)
    setPageWidth(listRef.current?.clientWidth ?? 0)
  }, [])

  if (!images.length) {
    return <div className={styles.placeholder} />
  }

  return (
    <div className={styles.container}>
      <HorizontalList
        rootRef={listRef}
        items={images}
        scrollEnabled={images.length > 1}
        onOffsetChange={handleOffsetChange}
        className={styles.list}
        slideClassName={styles.slide}
        getItemKey={(item, index) => item.id || `${item.url}-${index}`}
        renderItem={renderItem}
      />
      {images.length > 1 && (
        <Indicators
          length={images.length}
          offset={offset}
          pageWidth={pageWidth}
          onSelect={scrollToIndex}
        />
      )}
    </div>
  )
}
