import { MetaTags } from '@redwoodjs/web'

import LoadingSpinner from 'src/components/Loading/LoadingSpinner'

const LoadingPage = () => {
  return (
    <>
      <MetaTags title="Cerberus • Loading" />
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <LoadingSpinner className="h-24 w-24" />
        <p
          aria-live="polite"
          className="capitalize text text-center text-sm tracking-widest"
        >
          Loading Cerberus
        </p>
      </div>
    </>
  )
}

export default LoadingPage
