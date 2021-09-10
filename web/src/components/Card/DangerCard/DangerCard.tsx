import { useTranslation } from 'react-i18next'
import { ExclamationIcon } from '@heroicons/react/outline'

import './DangerCard.css'

export interface DangerCardProps {
  children: React.ReactNode
}

const DangerCard = ({ children }: DangerCardProps) => {
  const { t } = useTranslation()

  return (
    <div className="card body card-danger">
      <header className="title-group">
        <div aria-hidden="true" className="icon">
          <ExclamationIcon />
        </div>
        <div className="space-y-1">
          <h2 className="text title">{t('Danger.Card.title')}</h2>
          <p className="muted hint">{t('Danger.Card.subtitle')}</p>
        </div>
      </header>
      {children || null}
    </div>
  )
}

export default DangerCard
