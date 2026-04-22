import { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent, ReactNode, RefObject, UIEventHandler } from 'react'
import clsx from 'clsx'
import styles from './FlashList.module.scss'

const DRAG_THRESHOLD_PX = 4

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
  onScroll?: UIEventHandler<HTMLDivElement>
  desktopDragScroll?: boolean
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
  onScroll,
  desktopDragScroll = false,
}: FlashListProps<T>) => {
  const innerRef = useRef<HTMLDivElement | null>(null)
  const listRef = rootRef ?? innerRef
  const [isDragging, setIsDragging] = useState(false)
  const dragResetFrameRef = useRef<number | null>(null)
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
  })
  const didDragRef = useRef(false)

  const cancelPendingDragReset = useCallback(() => {
    if (dragResetFrameRef.current === null) return

    window.cancelAnimationFrame(dragResetFrameRef.current)
    dragResetFrameRef.current = null
  }, [])

  const stopDragging = useCallback(() => {
    if (!dragStateRef.current.isDragging) return

    dragStateRef.current.isDragging = false
    setIsDragging(false)
    cancelPendingDragReset()
    dragResetFrameRef.current = window.requestAnimationFrame(() => {
      didDragRef.current = false
      dragResetFrameRef.current = null
    })
  }, [cancelPendingDragReset])

  const handleDragMove = useCallback((clientX: number) => {
    if (!dragStateRef.current.isDragging) return

    const container = listRef.current

    if (!container) return

    const deltaX = clientX - dragStateRef.current.startX

    if (Math.abs(deltaX) > DRAG_THRESHOLD_PX) {
      didDragRef.current = true
    }

    container.scrollLeft = dragStateRef.current.startScrollLeft - deltaX
  }, [listRef])

  const handleMouseDown = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    if (!horizontal || !scrollEnabled || !desktopDragScroll || event.button !== 0) return

    const container = listRef.current

    if (!container) return

    cancelPendingDragReset()
    dragStateRef.current = {
      isDragging: true,
      startX: event.clientX,
      startScrollLeft: container.scrollLeft,
    }
    didDragRef.current = false
    setIsDragging(true)
    event.preventDefault()
  }, [cancelPendingDragReset, desktopDragScroll, horizontal, listRef, scrollEnabled])

  const handleClickCapture = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    if (!didDragRef.current) return

    event.preventDefault()
    event.stopPropagation()
    didDragRef.current = false
  }, [])

  useEffect(() => {
    if (!isDragging) return

    const handleWindowMouseMove = (event: MouseEvent) => {
      handleDragMove(event.clientX)
    }

    const handleWindowMouseUp = () => {
      stopDragging()
    }

    window.addEventListener('mousemove', handleWindowMouseMove)
    window.addEventListener('mouseup', handleWindowMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove)
      window.removeEventListener('mouseup', handleWindowMouseUp)
    }
  }, [handleDragMove, isDragging, stopDragging])

  useEffect(() => {
    return () => {
      cancelPendingDragReset()
    }
  }, [cancelPendingDragReset])

  return (
    <div
      ref={listRef}
      className={clsx(
        styles.root,
        {
          [styles.horizontal]: horizontal,
          [styles.hideScrollbar]: !showsHorizontalScrollIndicator,
          [styles.locked]: !scrollEnabled,
          [styles.dragEnabled]: horizontal && scrollEnabled && desktopDragScroll,
          [styles.dragging]: isDragging,
        },
        className
      )}
      onScroll={onScroll}
      onMouseDown={handleMouseDown}
      onClickCapture={handleClickCapture}
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
