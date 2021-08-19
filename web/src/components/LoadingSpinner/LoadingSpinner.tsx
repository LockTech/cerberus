import clsx from 'clsx'

import './LoadingSpinner.css'

export interface LoadingSpinnerProps {
  className?: string
}

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <svg
      aria-hidden="true"
      className={clsx('spinner', className)}
      viewBox="0 0 250 250"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M250 125C250 194.036 194.036 250 125 250C55.9644 250 0 194.036 0 125C0 55.9644 55.9644 0 125 0C194.036 0 250 55.9644 250 125ZM18.75 125C18.75 183.68 66.3197 231.25 125 231.25C183.68 231.25 231.25 183.68 231.25 125C231.25 66.3197 183.68 18.75 125 18.75C66.3197 18.75 18.75 66.3197 18.75 125Z"
        className="outter"
        fill="currentColor"
      />
      <path
        d="M89.3709 15.0013C87.7754 10.0756 90.4697 4.75245 95.5011 3.53051C114.959 -1.19515 135.272 -1.1765 154.722 3.58487C159.751 4.81604 162.436 10.1442 160.831 15.0669V15.0669C159.227 19.9897 153.94 22.6363 148.895 21.4718C133.237 17.8576 116.959 17.8426 101.295 21.4281C96.2476 22.5833 90.9663 19.9271 89.3709 15.0013V15.0013Z"
        className="inner"
        fill="currentColor"
      />
    </svg>
  )
}

export default LoadingSpinner
