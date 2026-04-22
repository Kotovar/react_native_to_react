import { useRef } from 'react'
import type { ReactNode, RefObject } from 'react'
import clsx from 'clsx'
import styles from './FlashList.module.scss'

interface FlashListProps<T> {
  data: T[]
  renderItem: (item: T, index: number) => ReactNode
  keyExtractor?: (item: T, index: number) => string
  horizontal?: boolean
  showsHorizontalScrollIndicator?: boolean
  scrollEnabled?: boolean
  rootRef?: RefObject<HTMLDivElement | null>
  className?: string
  contentContainerStyle?: string
  itemClassName?: string
}

export const FlashList = <T,>({
  data,
  renderItem,
  keyExtractor,
  horizontal = false,
  showsHorizontalScrollIndicator = true,
  scrollEnabled = true,
  rootRef,
  className,
  contentContainerStyle,
  itemClassName,
}: FlashListProps<T>) => {
  const innerRef = useRef<HTMLDivElement | null>(null)
  const listRef = rootRef ?? innerRef

  return (
    <div
      ref={listRef}
      className={clsx(
        styles.root,
        {
          [styles.horizontal]: horizontal,
          [styles.hideScrollbar]: !showsHorizontalScrollIndicator,
          [styles.locked]: !scrollEnabled,
        },
        className
      )}
    >
      <div className={clsx(styles.content, horizontal && styles.horizontalContent, contentContainerStyle)}>
        {data.map((item, index) => (
          <div
            key={keyExtractor?.(item, index) ?? index.toString()}
            className={clsx(styles.item, itemClassName)}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  )
}
