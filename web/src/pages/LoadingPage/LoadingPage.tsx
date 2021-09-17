import { MetaTags } from '@redwoodjs/web'

import LoadingSpinner from 'src/components/LoadingSpinner'

const LoadingPage = () => {
  return (
    <>
      <MetaTags title="Cerberus • Loading" />
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <LoadingSpinner className="h-24 w-24" />
        <p className="text text-center tracking-wider">
          Loading the Cerberus application
        </p>
      </div>
    </>
  )
}

export default LoadingPage
