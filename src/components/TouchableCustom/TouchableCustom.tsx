import { useCallback, useRef } from 'react'
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './TouchableCustom.module.scss'

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children: ReactNode
  onPress?: () => void
  onLongPress?: () => void
  delayLongPress?: number
  activeOpacity?: number
}

export const TouchableCustom = ({
  children,
  className,
  style,
  onPress,
  onLongPress,
  delayLongPress = 500,
  activeOpacity = 0.85,
  ...rest
}: Props) => {
  const timerRef = useRef<number | null>(null)
  const longPressTriggeredRef = useRef(false)

  const clearLongPress = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startLongPress = useCallback(() => {
    if (!onLongPress) return

    longPressTriggeredRef.current = false
    clearLongPress()

    timerRef.current = window.setTimeout(() => {
      longPressTriggeredRef.current = true
      onLongPress()
    }, delayLongPress)
  }, [clearLongPress, delayLongPress, onLongPress])

  const handleClick = useCallback(() => {
    if (longPressTriggeredRef.current) {
      longPressTriggeredRef.current = false
      return
    }

    onPress?.()
  }, [onPress])

  return (
    <button
      type="button"
      className={clsx(styles.root, className)}
      style={{
        ['--active-opacity' as string]: String(activeOpacity),
        ...style,
      } as CSSProperties}
      onClick={handleClick}
      onMouseDown={startLongPress}
      onMouseUp={clearLongPress}
      onMouseLeave={clearLongPress}
      onTouchStart={startLongPress}
      onTouchEnd={clearLongPress}
      {...rest}
    >
      {children}
    </button>
  )
}
