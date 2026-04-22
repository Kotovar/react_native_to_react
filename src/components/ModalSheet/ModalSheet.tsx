import type { CSSProperties, ReactNode } from 'react'
import styles from './ModalSheet.module.scss'

interface Props {
  children: ReactNode
  isOnlyChildren?: boolean
  snapPoints?: string[]
}

export const ModalSheet = ({
  children,
  isOnlyChildren = false,
  snapPoints,
}: Props) => {
  const sheetStyle: CSSProperties = {
    ...(snapPoints?.[0] && { height: snapPoints[0] }),
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.sheet} style={sheetStyle}>
        {!isOnlyChildren && (
          <div className={styles.handleWrap}>
            <span className={styles.handle} />
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
