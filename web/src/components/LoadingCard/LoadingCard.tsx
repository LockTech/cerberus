import LoadingSpinner from 'src/components/LoadingSpinner'

export interface LoadingCardProps {
  children?: React.ReactNode
}

const LoadingCard = ({ children }: LoadingCardProps) => {
  return (
    <div className="card card-body">
      <LoadingSpinner />
      {children || null}
    </div>
  )
}

export default LoadingCard
