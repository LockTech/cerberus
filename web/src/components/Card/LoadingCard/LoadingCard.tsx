import LoadingSpinner from 'src/components/LoadingSpinner'

import './LoadingCard.css'

export interface LoadingCardProps {
  children?: React.ReactNode
}

const LoadingCard = ({ children }: LoadingCardProps) => {
  return (
    <div className="card card-body loading-card">
      <LoadingSpinner className="loader" />
      {children || null}
    </div>
  )
}

export default LoadingCard
