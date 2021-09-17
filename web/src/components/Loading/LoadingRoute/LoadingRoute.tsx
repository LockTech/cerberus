import { useTranslation } from 'react-i18next'

import LoadingSpinner from 'src/components/Loading/LoadingSpinner'

const LoadingRoute = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center h-full w-full space-y-6">
      <LoadingSpinner className="h-20 w-20" />
      <p aria-live="polite" className="text text-center">
        {t('Loading.Route.message')}
      </p>
    </div>
  )
}

export default LoadingRoute
