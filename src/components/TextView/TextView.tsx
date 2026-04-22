import type { ComponentProps } from "react"
import clsx from 'clsx'
import styles from './TextView.module.scss'

type TextStyleKey = '15-700' | '14-400'

interface Props extends ComponentProps<'span'> {
  textStyle?: TextStyleKey
  color?: string
  mt?: number
  lh?: number
}

const textStyleClassNameMap: Record<TextStyleKey, string> = {
  '15-700': styles.text15_700,
  '14-400': styles.text14_400,
}

export const TextView = ({
  textStyle,
  color,
  mt,
  lh,
  children,
  style,
  className,
  ...rest
}: Props) => (
  <span
    className={clsx(
      textStyle && textStyleClassNameMap[textStyle],
      className
    )}
    style={{
      ...(color !== undefined && { color }),
      ...(mt !== undefined && { marginTop: mt }),
      ...(lh !== undefined && { lineHeight: lh }),
      ...style,
    }}
    {...rest}
  >
    {children}
  </span>
)
