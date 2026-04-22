import { Description } from './components'
import styles from './ProductModal.module.scss'

// interface Props {
//   id?: string
// }
//
const STORAGE = 'storage';
const SOSTAV = 'sostav';

export const ProductModal = () => {
  return (
    <div className={styles.modal}>
      <Description storage={STORAGE} sostav={SOSTAV} />
    </div>
  )
}
