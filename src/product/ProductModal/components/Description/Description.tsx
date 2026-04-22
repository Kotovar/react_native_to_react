import { TextView } from '@components'
import { theme } from '@constants'
import styles from './Description.module.scss'

interface Props {
  storage?: string
  sostav?: string
}

export const Description = ({ storage, sostav }: Props) => {
  if (!storage && !sostav) return null

  return (
    <div className={styles.container}>
      {!!storage && (
        <>
          <TextView textStyle={'15-700'} color={theme.black02}>
            {'Условия хранения'}
          </TextView>
          <TextView textStyle={'14-400'} mt={10} lh={17}>
            {storage?.trim()}
          </TextView>
        </>
      )}
      {!!sostav && (
        <>
          <TextView textStyle={'15-700'} color={theme.black02} mt={24}>
            {'Состав'}
          </TextView>
          <TextView textStyle={'14-400'} mt={10} lh={17}>
            {sostav?.trim()}
          </TextView>
        </>
      )}
    </div>
  )
}
