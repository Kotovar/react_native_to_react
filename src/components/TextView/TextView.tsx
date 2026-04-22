import type { ComponentProps, CSSProperties } from 'react'
import clsx from 'clsx'
import styles from './TextView.module.scss'

type TextStyleKey = '12-500' | '14-400' | '14-700' | '15-700' | '15-900' | '20-900'

interface Props extends ComponentProps<'span'> {
  textStyle?: TextStyleKey
  color?: string
  numberOfLines?: number
  mt?: number
  ml?: number
  mr?: number
  mb?: number
  lh?: number
}

const textStyleClassNameMap: Record<TextStyleKey, string> = {
  '12-500': styles.text12_500,
  '14-400': styles.text14_400,
  '14-700': styles.text14_700,
  '15-700': styles.text15_700,
  '15-900': styles.text15_900,
  '20-900': styles.text20_900,
}

export const TextView = ({
  textStyle,
  color,
  mt,
  ml,
  mr,
  mb,
  lh,
  children,
  style,
  className,
  numberOfLines,
  ...rest
}: Props) => (
  <span
    className={clsx(
      {
        [styles.oneLine]: numberOfLines === 1,
        [styles.multiLine]: numberOfLines && numberOfLines > 1,
      },
      textStyle && textStyleClassNameMap[textStyle],
      className
    )}
    style={{
      ...(color !== undefined && { color }),
      ...(mt !== undefined && { marginTop: mt }),
      ...(ml !== undefined && { marginLeft: ml }),
      ...(mr !== undefined && { marginRight: mr }),
      ...(mb !== undefined && { marginBottom: mb }),
      ...(lh !== undefined && { lineHeight: lh }),
      ...(numberOfLines && numberOfLines > 1 && {
        ['--lines' as string]: numberOfLines,
      }),
      ...style,
    } as CSSProperties}
    {...rest}
  >
    {children}
  </span>
)
