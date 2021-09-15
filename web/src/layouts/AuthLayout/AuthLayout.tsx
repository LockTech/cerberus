import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from '@redwoodjs/router'

import BrandBanner from 'src/components/BrandBanner'

import { BrandURL, PrivacyURL, SupportURL } from 'src/constants/variables'

import { useAuth } from 'src/hooks/useAuth'

type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { t } = useTranslation()

  const { redirectTo } = useParams()

  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser?.id) window.location.href = !redirectTo ? '/' : redirectTo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, redirectTo])

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
