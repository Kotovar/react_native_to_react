import styles from './RelatedProducts.module.scss'

interface Props {
  id: string
}

export const RelatedProducts = ({ id }: Props) => {
  return (
    <div className={styles.modal}>
      <p>RelatedProducts - {id}</p>
    </div>
  )
}