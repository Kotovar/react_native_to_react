import styles from './Description.module.scss'

interface Props {
  storage: string
  sostav: string
}

export const Description = ({ storage, sostav }: Props) => {
  if (!storage && !sostav) return null

  return (
    <div className={styles.container}>
      <p>Description</ p>
    </div>
  )
}
