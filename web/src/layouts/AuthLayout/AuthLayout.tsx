import { useTranslation } from 'react-i18next'

import BrandBanner from 'src/components/BrandBanner'

import './AuthLayout.css'

type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { t } = useTranslation()

  return (
    <div className="auth-layout">
      <BrandBanner />
      {children}
      <div className="auth-link">
        <a className="link-primary" href="https://locktech.software/privacy">
          {t('Auth.Layout.privacy')}
        </a>
      </div>
    </div>
  )
}

export default AuthLayout
