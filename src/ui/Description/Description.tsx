import styles from './Description.module.scss'

interface Props {
  id: string
}

export const Description = ({ id }: Props) => {
  return (
    <div className={styles.modal}>
      <p>Description - {id}</p>
    </div>
  )
}