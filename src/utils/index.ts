import type { CSSProperties } from 'react'

export const circle = (size: number, backgroundColor: string): CSSProperties => ({
  width: size,
  height: size,
  minWidth: size,
  borderRadius: '50%',
  backgroundColor,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const getWeight = (weight?: string, edZim?: string) => {
  if (!weight) return ''

  return edZim ? `${weight} ${edZim}` : weight
}
