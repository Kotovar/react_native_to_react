import { Description, EnergyNutritional, ProductPhotos } from './components'
import styles from './ProductModal.module.scss'

const STORAGE = 'Хранить в сухом, защищённом от прямых солнечных лучей месте при температуре от +5°C до +25°C. После вскрытия упаковки хранить в холодильнике и употребить в течение 3 суток.';
const SOSTAV = 'Вода, сахар, растительные масла, сухое молоко, какао-порошок, эмульгаторы, ароматизаторы. Может содержать следы орехов и глютена.';
const CAL = '285'
const PROT = '6,5'
const FATS = '12,3'
const CARB = '34,8'
const IMAGES = [
  { id: '1', url: 'juice.png' },
  { id: '2', url: 'juice.png' },
  { id: '3', url: 'juice.png' },
]

export const ProductModal = () => {
  return (
    <div className={styles.modal}>
      <Description storage={STORAGE} sostav={SOSTAV} />
      <EnergyNutritional cal={CAL} prot={PROT} fats={FATS} carb={CARB} />
      <ProductPhotos images={IMAGES} />
    </div>
  )
}
