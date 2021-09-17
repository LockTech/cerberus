import { ExclamationIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'

import './UndoneNotice.css'

const UndoneNotice = () => {
  const { t } = useTranslation()

  return (
    <div className="undoneNotice">
      <ExclamationIcon aria-hidden="true" className="icon" />
      <p className="text font-semibold">{t('UndoneNotice')}</p>
      <ExclamationIcon aria-hidden="true" className="icon" />
    </div>
  )
}

export default UndoneNotice
