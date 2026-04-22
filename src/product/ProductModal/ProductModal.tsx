import { Description } from './components'
import styles from './ProductModal.module.scss'

const STORAGE = 'Хранить в сухом, защищённом от прямых солнечных лучей месте при температуре от +5°C до +25°C. После вскрытия упаковки хранить в холодильнике и употребить в течение 3 суток.';
const SOSTAV = 'Вода, сахар, растительные масла, сухое молоко, какао-порошок, эмульгаторы, ароматизаторы. Может содержать следы орехов и глютена.';

export const ProductModal = () => {
  return (
    <div className={styles.modal}>
      <Description storage={STORAGE} sostav={SOSTAV} />
    </div>
  )
}
