import type { IRelatedProduct } from './types'

export const catalogueProducts: Record<string, IRelatedProduct> = {
  '101': {
    id: '101',
    title: 'Хлебцы гречневые с морской солью',
    weight: '120 г',
    imageUrl: 'juice.png',
    imageUrls: ['juice.png', 'juice.png'],
    price: '149 ₽',
  },
  '102': {
    id: '102',
    title: 'Миндальная паста без сахара',
    weight: '230 г',
    imageUrl: 'juice.png',
    imageUrls: ['juice.png', 'juice.png', 'juice.png'],
    price: '369 ₽',
  },
  '103': {
    id: '103',
    title: 'Кокосовые чипсы натуральные',
    weight: '90 г',
    imageUrl: 'juice.png',
    imageUrls: ['juice.png'],
    price: '219 ₽',
  },
}
