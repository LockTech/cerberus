import { ExclamationCircleIcon } from '@heroicons/react/solid'

import './FailureCard.css'

export interface FailureCardProps {
  children: React.ReactNode
}

const FailureCard = ({ children }: FailureCardProps) => {
  return (
    <div className="card card-body failure-card">
      <ExclamationCircleIcon className="icon" />
      {children || null}
    </div>
  )
}

export default FailureCard
