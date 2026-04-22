import { useCallback, useEffect, useMemo } from 'react'
import { computed } from 'mobx'
import { observer } from 'mobx-react-lite'
import { AmountControl, HtmlView, ModalSheet, ProductVariations, SvgIcon, TextView, TouchableCustom } from '@components'
import { theme } from '@constants'
import { EEvent, eventAppMetrica } from '@appMetrica'
import { stores } from '@stores'
import { circle, getWeight } from '@utils'
import { Description, EnergyNutritional, ProductPhotos, RelatedProducts } from './components'
import styles from './ProductModal.module.scss'

interface Props {
  id: string
  isHideAddBtn?: boolean
}

export const ProductModal = observer(({
  id,
  isHideAddBtn,
}: Props) => {
  const {
    catalogueStore: {
      getProductStore,
      getTagsData,
      productScrollViewRef,
      catalogueProducts,
      openProduct,
      currentProductId,
      setCurrentProductId,
    },
    userStore: {
      toggleFavoriteProduct,
      getIsFavorite,
      userGroup,
    },
  } = stores

  useEffect(() => {
    setCurrentProductId(id)
  }, [id, setCurrentProductId])

  const resolvedProductId = currentProductId || id
  const productStore = computed(() => getProductStore(resolvedProductId)).get()
  const product = productStore?.product.value
  const tagsToRender = getTagsData(product)
  const isFavorite = getIsFavorite(resolvedProductId)
  const edZim = catalogueProducts?.[resolvedProductId]?.ed_izm || product?.ed_izm || ''

  const renderTags = useMemo(() => {
    return (
      <div className={styles.containerTags}>
        {tagsToRender.map((tag) => (
          <div key={tag.key} className={styles.wrapTag} style={{ backgroundColor: tag.background }}>
            <TextView textStyle={'14-500'} lh={14}>
              {tag.title}
            </TextView>
          </div>
        ))}
      </div>
    )
  }, [tagsToRender])

  const handleLike = useCallback(() => {
    if (!product) return

    toggleFavoriteProduct(product)
  }, [product, toggleFavoriteProduct])

  const openDebugCode = useCallback(() => {
    if (!product) return

    console.log('Debug product', product.id)
  }, [product])

  const onShare = useCallback(async () => {
    if (!product) return

    const shareMessage = `${product.title}\nПосмотреть подробнее можно:\nНа сайте https://ecomarket.ru/${product.url}`

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Поделиться продуктом',
          text: shareMessage,
        })
      } else {
        console.log('Share fallback', shareMessage)
      }

      await eventAppMetrica(EEvent.ShareProduct, { userGroup, title: product.title })
    } catch (error) {
      console.log(error)
    }
  }, [product, userGroup])

  const handleSelectVariation = useCallback(async (nextId: string) => {
    await openProduct(nextId)
  }, [openProduct])

  if (!product) return

  return (
    <ModalSheet isOnlyChildren snapPoints={['100%']}>
      <div className={styles.modal}>
        <div ref={productScrollViewRef} className={styles.scrollArea}>
          {product.availableones > 0 && (
            <div className={styles.wrapBtn}>
              <TouchableCustom style={circle(36, theme.KTIconsBg)} onPress={handleLike}>
                <SvgIcon
                  icon={'Heart'}
                  fill={isFavorite ? theme.errorRed : undefined}
                  stroke={isFavorite ? theme.errorRed : theme.darkIcons}
                  size={17}
                />
              </TouchableCustom>
              <TouchableCustom style={circle(36, theme.KTIconsBg)} onPress={onShare}>
                <SvgIcon icon={'Share'} stroke={theme.darkIcons} size={17} />
              </TouchableCustom>
            </div>
          )}
          <ProductPhotos images={product.images} />
          <div className={styles.container}>
            <TouchableCustom
              delayLongPress={5000}
              onLongPress={openDebugCode}
              activeOpacity={1}
              className={styles.titleButton}
            >
              <TextView textStyle={'20-700'} className={styles.titleText}>
                {product.title?.trim()}
              </TextView>
            </TouchableCustom>

            <div className={styles.wrapTitle}>
              <TextView textStyle={'14-700'} color={theme.gray07} mt={4}>
                {getWeight(product.weight, edZim)}
              </TextView>
              {renderTags}
            </div>
            <ProductVariations productId={product.id} onPress={handleSelectVariation} />
            <div className={styles.wrapDescription}>
              {!!product.short_description && (
                <TextView textStyle={'15-700'} color={theme.black02} mb={10}>
                  {'Описание товара'}
                </TextView>
              )}
              <HtmlView html={product.short_description.trim()} />
              <Description storage={product.storage} sostav={product.sostav} />
              <EnergyNutritional
                cal={product.calories_amount}
                prot={product.bel_amount}
                fats={product.fats_amount}
                carb={product.ugl_amount}
              />
            </div>
          </div>
          <RelatedProducts relatedIds={product.related} />
        </div>
        {!isHideAddBtn && <AmountControl product={product} />}
      </div>
    </ModalSheet>
  )
})
