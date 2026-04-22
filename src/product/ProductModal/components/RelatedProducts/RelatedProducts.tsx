import { useCallback, useMemo } from 'react'
import { FlashList, ProductCard, TextView } from '@components'
import { EEvent, eventAppMetrica } from '@appMetrica'
import { catalogueProducts } from '@services'
import styles from './RelatedProducts.module.scss'

interface Props {
  relatedIds: string[]
}

const userGroup = 'mock-user-group'

export const RelatedProducts = ({ relatedIds }: Props) => {
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

  if (!validRelatedIds.length) return null

  return (
    <section className={styles.container}>
      <TextView ml={16} mb={16} textStyle={'20-700'}>
        {'С этим товаром берут'}
      </TextView>
      <FlashList
        data={validRelatedIds}
        horizontal
        showsHorizontalScrollIndicator={false}
        className={styles.list}
        contentContainerStyle={styles.flashList}
        itemClassName={styles.slide}
        keyExtractor={(id) => id}
        renderItem={renderItem}
        scrollEnabled={validRelatedIds.length > 1}
      />
    </section>
  )
}
