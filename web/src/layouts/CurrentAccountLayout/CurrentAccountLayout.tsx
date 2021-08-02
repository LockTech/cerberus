import { useTranslation } from 'react-i18next'

import LoadingSpinner from 'src/components/LoadingSpinner/LoadingSpinner'

import {
  useCurrentAccount,
  useQueryCurrentAccount,
} from 'src/hooks/useCurrentAccount'

import './CurrentAccountLayout.css'

type CurrentAccountLayoutProps = {
  children?: React.ReactNode
}

const CurrentAccountLayout = ({ children }: CurrentAccountLayoutProps) => {
  const { t } = useTranslation()

  useQueryCurrentAccount()

  const currentAccount = useCurrentAccount()

  if (currentAccount) return <>{children}</>
  else
    return (
      <div className="currentAccount-loader">
        <LoadingSpinner className="loading-indicator" />
        <p className="text">{t('CurrentAccount.Layout.loading')}</p>
      </div>
    )
}

export default CurrentAccountLayout
