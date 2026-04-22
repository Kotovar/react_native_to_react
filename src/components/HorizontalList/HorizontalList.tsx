import { useCallback, useRef } from 'react'
import type { ReactNode, RefObject, UIEvent } from 'react'
import clsx from 'clsx'
import styles from './HorizontalList.module.scss'

interface HorizontalListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  getItemKey?: (item: T, index: number) => string
  onOffsetChange?: (offset: number) => void
  scrollEnabled?: boolean
  rootRef?: RefObject<HTMLDivElement | null>
  className?: string
  contentClassName?: string
  slideClassName?: string
}

export const HorizontalList = <T,>({
  items,
  renderItem,
  getItemKey,
  onOffsetChange,
  scrollEnabled = true,
  rootRef,
  className,
  contentClassName,
  slideClassName,
}: HorizontalListProps<T>) => {
  const innerRef = useRef<HTMLDivElement | null>(null)
  const listRef = rootRef ?? innerRef

  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget
    if (!onOffsetChange) return

    onOffsetChange(container.scrollLeft)
  }, [onOffsetChange])

  return (
    <div
      ref={listRef}
      className={clsx(styles.root, !scrollEnabled && styles.locked, className)}
      onScroll={handleScroll}
    >
      <div className={clsx(styles.content, contentClassName)}>
        {items.map((item, index) => (
          <div
            key={getItemKey?.(item, index) ?? index.toString()}
            className={clsx(styles.slide, slideClassName)}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  )
}
