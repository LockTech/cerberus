import { ExclamationCircleIcon } from '@heroicons/react/outline'

import './FailureCard.css'

export interface FailureCardProps {
  children: React.ReactNode
}

const FailureCard = ({ children }: FailureCardProps) => {
  return (
    <div aria-live="polite" className="card card-failure">
      <ExclamationCircleIcon aria-hidden="true" className="icon" />
      {children || null}
    </div>
  )
}

export default FailureCard
