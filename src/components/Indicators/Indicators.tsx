import clsx from 'clsx'
import styles from './Indicators.module.scss'

interface Props {
  length: number
  offset: number
  pageWidth: number
  onSelect?: (index: number) => void
  className?: string
}

export const Indicators = ({
  length,
  offset,
  pageWidth,
  onSelect,
  className,
}: Props) => {
  const activeIndex = pageWidth ? Math.round(offset / pageWidth) : 0

  return (
    <div className={clsx(styles.root, className)}>
      {Array.from({ length }, (_, index) => (
        <button
          key={index}
          type="button"
          className={index === activeIndex ? styles.dotActive : styles.dot}
          onClick={() => onSelect?.(index)}
          aria-label={`Перейти к слайду ${index + 1}`}
        />
      ))}
    </div>
  )
}
