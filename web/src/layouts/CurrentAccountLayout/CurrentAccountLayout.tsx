import { useTranslation } from 'react-i18next'
import { useAuth } from '@redwoodjs/auth'

import LoadingSpinner from 'src/components/LoadingSpinner'

import { useCurrentAccount } from 'src/hooks/useCurrentAccount'

import './CurrentAccountLayout.css'

type CurrentAccountLayoutProps = {
  children?: React.ReactNode
}

const CurrentAccountLayout = ({ children }: CurrentAccountLayoutProps) => {
  const { t } = useTranslation()

  const { loading } = useAuth()

  const currentAccount = useCurrentAccount()

  if (!currentAccount) return null
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
