import { ExclamationIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'

import './DangerCard.css'

export interface DangerCardProps {
  children: React.ReactNode
}

const DangerCard = ({ children }: DangerCardProps) => {
  const { t } = useTranslation()

  return (
    <div className="card-body card-red danger-card">
      <header className="title-group">
        <div className="title-icon">
          <ExclamationIcon aria-hidden="true" className="icon" />
          <h2 className="title-red">{t('Danger.Card.title')}</h2>
        </div>
        <p className="hint">{t('Danger.Card.subtitle')}</p>
      </header>
      {children || null}
    </div>
  )
}

export default DangerCard
