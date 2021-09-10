import { useTranslation } from 'react-i18next'
import { ExclamationCircleIcon, RefreshIcon } from '@heroicons/react/outline'

import './FailureCard.css'

export interface FailureCardProps {
  children: React.ReactNode
}

const FailureCard = ({ children }: FailureCardProps) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="card card-failure">
        <ExclamationCircleIcon className="icon" />
        {children || null}
      </div>
      <button
        className="btn btn-primary-ghost btn-failure"
        onClick={() => window.location.reload()}
      >
        <RefreshIcon className="icon" />
        <span>{t('FailureCard.reload')}</span>
      </button>
    </>
  )
}

export default FailureCard
