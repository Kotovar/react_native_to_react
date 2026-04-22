import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FlashList, ProductCard, TextView } from '@components'
import { EEvent, eventAppMetrica } from '@appMetrica'
import { catalogueProducts } from '@services'
import { stores } from '@stores'
import styles from './RelatedProducts.module.scss'

interface Props {
  relatedIds: string[]
}

export const RelatedProducts = ({ relatedIds }: Props) => {
  const {
    userStore: { userGroup },
  } = stores
  const listRef = useRef<HTMLDivElement | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const validRelatedIds = useMemo(() => {
    return relatedIds.filter((id) => catalogueProducts[id])
  }, [relatedIds])

  const reportEvent = useCallback(async (title?: string) => {
    await eventAppMetrica(EEvent.TakeWithProduct, { userGroup, title })
  }, [userGroup])

  const renderItem = useCallback((id: string) => {
    return (
      <ProductCard
        id={id}
        className={styles.card}
        onPress={reportEvent}
        isOnePhoto
      />
    )
  }, [reportEvent])

  const updateScrollState = useCallback(() => {
    const container = listRef.current

    if (!container) return

    const maxScrollLeft = container.scrollWidth - container.clientWidth

    setCanScrollPrev(container.scrollLeft > 2)
    setCanScrollNext(maxScrollLeft - container.scrollLeft > 2)
  }, [])

  const scrollList = useCallback((direction: -1 | 1) => {
    const container = listRef.current

    if (!container) return

    const step = Math.max(container.clientWidth * 0.8, 220)

    container.scrollBy({
      left: step * direction,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    updateScrollState()

    const handleResize = () => {
      updateScrollState()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [updateScrollState, validRelatedIds.length])

  if (!validRelatedIds.length) return null

  return (
    <section className={styles.container}>
      <TextView ml={16} textStyle={'20-700'} className={styles.title}>
        {'С этим товаром берут'}
      </TextView>
      <div className={styles.carousel}>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => scrollList(-1)}
          disabled={!canScrollPrev}
          aria-label="Прокрутить список товаров назад"
        >
          <span className={styles.arrowLeft} aria-hidden="true" />
        </button>
        <FlashList
          rootRef={listRef}
          data={validRelatedIds}
          horizontal
          showsHorizontalScrollIndicator={false}
          className={styles.list}
          contentContainerStyle={styles.flashList}
          itemClassName={styles.slide}
          keyExtractor={(id) => id}
          renderItem={renderItem}
          scrollEnabled={validRelatedIds.length > 1}
          desktopDragScroll={validRelatedIds.length > 1}
          onScroll={updateScrollState}
        />
        <button
          type="button"
          className={styles.navButton}
          onClick={() => scrollList(1)}
          disabled={!canScrollNext}
          aria-label="Прокрутить список товаров вперед"
        >
          <span className={styles.arrowRight} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
