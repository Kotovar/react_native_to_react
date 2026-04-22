import styles from './EnergyNutritional.module.scss'

interface Props {
  id: string
}

export const EnergyNutritional = ({ id }: Props) => {
  return (
    <div className={styles.modal}>
      <p>EnergyNutritional - {id}</p>
    </div>
  )
}