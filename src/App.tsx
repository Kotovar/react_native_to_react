import { initialProductId } from '@services'
import { ProductModal } from './product/ProductModal'

function App() {
  return <ProductModal id={initialProductId} />
}

export default App
