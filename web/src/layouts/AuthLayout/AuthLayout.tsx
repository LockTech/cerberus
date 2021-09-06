import { useTranslation } from 'react-i18next'

import BrandBanner from 'src/components/BrandBanner'

import { PrivacyURL, SupportURL } from 'src/constants/variables'

type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { t } = useTranslation()

  return (
    <div className="dark max-w-lg m-auto px-6 sm:px-0 py-6 space-y-6">
      <BrandBanner className="max-w-sm" />
      {children}
      <div className="flex flex-col items-center space-y-3">
        <a className="link" href={PrivacyURL} rel="noreferrer" target="_blank">
          {t('Auth.Layout.privacy')}
        </a>
        <a className="link" href={SupportURL} rel="noreferrer" target="_blank">
          {t('Auth.Layout.support')}
        </a>
      </div>
    </div>
  )
}

export default AuthLayout
