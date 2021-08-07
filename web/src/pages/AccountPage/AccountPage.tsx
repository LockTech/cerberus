import { useTranslation } from 'react-i18next'
import { KeyIcon } from '@heroicons/react/solid'
import { Helmet } from '@redwoodjs/web'

import AppbarTitle from 'src/components/Appbar/AppbarTitle'
import AccountUpdateCell from 'src/components/AccountUpdateCell'

import './AccountPage.css'

export interface AccountPageProps {
  id: string
}

const AccountPage = ({ id }: AccountPageProps) => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('Account.Page.Helmet.title')}</title>
      </Helmet>
      <AppbarTitle>{t('Account.Page.Appbar.title')}</AppbarTitle>
      <div className="page-layout">
        <div className="account-page-actions">
          <button className="button-primary-ghost">
            <KeyIcon
              aria-label={t('Account.Page.actions.passwordReset')}
              className="icon"
            />
            <p>{t('Account.Page.actions.passwordReset')}</p>
          </button>
        </div>
        <AccountUpdateCell id={id} />
      </div>
    </>
  )
}

export default AccountPage
