import styles from './ProductModal.module.scss'

interface Props {
  id: string
}

export const ProductModal = ({ id }: Props) => {
  return (
    <div className={styles.modal}>
      <p>ProductModal - {id}</p>
    </div>
  )
}
