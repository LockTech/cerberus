import LoadingSpinner from 'src/components/Loading/LoadingSpinner'

import './LoadingCard.css'

export interface LoadingCardProps {
  children?: React.ReactNode
}

const LoadingCard = ({ children }: LoadingCardProps) => {
  return (
    <div aria-live="polite" className="card body card-loading">
      <LoadingSpinner className="loader" />
      {children || null}
    </div>
  )
}

export default LoadingCard
