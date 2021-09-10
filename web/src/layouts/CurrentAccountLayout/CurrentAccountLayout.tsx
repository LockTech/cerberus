import { useTranslation } from 'react-i18next'

import LoadingSpinner from 'src/components/LoadingSpinner'

import { useAuth } from 'src/hooks/useAuth'

import './CurrentAccountLayout.css'

type CurrentAccountLayoutProps = {
  children?: React.ReactNode
}

const CurrentAccountLayout = ({ children }: CurrentAccountLayoutProps) => {
  const { t } = useTranslation()

  const { currentUser, loading } = useAuth()

  // Safely return `null` as the user should be redirected by Redwood's router.
  if (!currentUser) return null
  else if (!loading) return <>{children}</>
  else
    return (
      <div className="current-account">
        <LoadingSpinner className="loading-indicator" />
        <p className="text">{t('CurrentAccount.Layout.loading')}</p>
      </div>
    )
}

export default CurrentAccountLayout
