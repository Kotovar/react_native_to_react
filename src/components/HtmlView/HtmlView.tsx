import DOMPurify from 'dompurify'
import styles from './HtmlView.module.scss'

interface Props {
  html: string
}

export const HtmlView = ({ html }: Props) => {
  const safeHtml = DOMPurify.sanitize(html)

  return (
    <div
      className={styles.root}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  )
}
