import { Fragment, useCallback, useMemo } from 'react'
import { TextView } from '@components'
import { theme } from '@constants'
import styles from './EnergyNutritional.module.scss'

const DAILY = {
  PROT: 80,
  FATS: 60,
  CARB: 80,
}

interface Props {
  cal: string
  prot: string
  fats: string
  carb: string
}

export const EnergyNutritional = ({ cal, prot, fats, carb }: Props) => {
  if (!cal) return null

  const DATA = useMemo(() => {
    return [
      { title: 'Жиры', valueDay: DAILY.FATS, weight: fats },
      { title: 'Белки', valueDay: DAILY.PROT, weight: prot },
      { title: 'Углеводы', valueDay: DAILY.CARB, weight: carb },
    ]
  }, [fats, prot, carb])

  const renderData = useCallback(() => {
    return DATA.map((item, i, array) => {
      const numericValue = item.weight ? parseFloat(String(item.weight).replace(',', '.').split(' ')[0]) : 1
      const percent = Math.ceil((100 * numericValue) / item.valueDay)

      if (!item.weight) return

      return (
        <Fragment key={i}>
          <div className={styles.wrapRow}>
            <TextView ml={12} textStyle={'14-700'}>
              {item.title}
            </TextView>
            <div className={styles.wrapValue}>
              <TextView
                textStyle={'14-700'}
                className={styles.flex}
                numberOfLines={1}
              >
                {`${item.weight} г`}
              </TextView>
              <div className={styles.wrapPercent}>
                {!!percent && (
                  <TextView numberOfLines={1} textStyle={'14-700'}>
                    {`${percent} %`}
                  </TextView>
                )}
              </div>
            </div>
          </div>
          {i < array.length - 1 && <div className={styles.decoration} />}
        </Fragment>
      )
    })
  }, [carb, prot, fats])

  return (
    <div className={styles.container}>
      <TextView ml={12} mr={12} textStyle={'20-900'} mt={2} mb={4}>
        {'Энергетическая\nи пищевая ценность'}
      </TextView>
      <div className={styles.decoration} />
      <div className={styles.wrapWeight}>
        <TextView ml={2} textStyle={'12-500'}>
          {'на 100 г продукта'}
        </TextView>
      </div>
      <div className={styles.wrapCal}>
        <TextView textStyle={'15-700'} className={styles.cal}>
          {'Калорийность'}
        </TextView>
        <TextView className={styles.cal2} textStyle={'15-900'} numberOfLines={1}>
          {`${cal.split(' ')?.[0]} ккал`}
        </TextView>
      </div>
      <div className={styles.decoration2} />
      <div className={styles.containerDaily}>
        <div className={styles.empty} />
        <div className={styles.wrapDaily}>
          <TextView ml={15} textStyle={'12-500'}>
            {'Дневная норма %'}
          </TextView>
        </div>
      </div>
      <div className={styles.decoration} />
      {renderData()}
      <div className={styles.decoration2} />
      <div className={styles.wrapText}>
        <TextView textStyle={'12-500'} color={theme.gray}>
          {
            'Процент от суточной нормы показывает, какое количество питательных веществ в порции продукта приходится на суточный рацион. Значения усреднены и основаны на данных общих рекомендательных норм.'
          }
        </TextView>
      </div>
    </div>
  )
}
