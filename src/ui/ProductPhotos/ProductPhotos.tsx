import styles from './ProductPhotos.module.scss'

interface Props {
  id: string
}

export const ProductPhotos = ({ id }: Props) => {
  return (
    <div className={styles.modal}>
      <p>ProductPhotos - {id}</p>
    </div>
  )
}