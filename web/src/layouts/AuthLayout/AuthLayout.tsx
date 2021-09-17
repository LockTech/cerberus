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
    <div className="flex flex-col h-full max-w-md m-auto px-6 sm:px-0 pt-6 sm:pt-12 pb-6 space-y-6">
      <div className="flex-grow">{children}</div>
      <div className="flex flex-col items-center space-y-6">
        <div className="w-[14rem]">
          <a href={BrandURL} rel="noreferrer" target="_blank">
            <BrandBanner className="bg-gray-900 m-auto p-4 rounded-lg text-gray-50" />
          </a>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 space-x-0 sm:space-x-6">
          <a
            className="link text-xs"
            href={PrivacyURL}
            rel="noreferrer"
            target="_blank"
          >
            {t('Auth.Layout.privacy')}
          </a>
          <a
            className="link text-xs"
            href={SupportURL}
            rel="noreferrer"
            target="_blank"
          >
            {t('Auth.Layout.support')}
          </a>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
