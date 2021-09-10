import { useTranslation } from 'react-i18next'

import BrandBanner from 'src/components/BrandBanner'

import { BrandURL, PrivacyURL, SupportURL } from 'src/constants/variables'

type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { t } = useTranslation()

  return (
    <div className="max-w-md m-auto px-6 sm:px-0 py-6 space-y-6">
      <a className="dark" href={BrandURL} rel="noreferrer" target="_blank">
        <BrandBanner className="bg-gray-900 max-w-xs px-4 py-2 rounded-lg" />
      </a>
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
