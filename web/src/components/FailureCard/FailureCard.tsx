import { useTranslation } from 'react-i18next'
import { ExclamationCircleIcon, RefreshIcon } from '@heroicons/react/outline'

import './FailureCard.css'

export interface FailureCardProps {
  children: React.ReactNode
}

const FailureCard = ({ children }: FailureCardProps) => {
  const { t } = useTranslation()

  return (
    <div className="failure-wrapper">
      <div className="card-body card-red failure-card">
        <ExclamationCircleIcon className="icon" />
        {children || null}
      </div>
      <button
        className="button-primary-fill reload w-full"
        onClick={() => window.location.reload()}
      >
        <RefreshIcon className="icon" />
        <span>{t('FailureCard.reload')}</span>
      </button>
    </div>
  )
}

export default FailureCard
