import { useTranslation } from 'react-i18next'
import { Helmet } from '@redwoodjs/web'

import AppbarTitle from 'src/components/App/Appbar/AppbarTitle'
import AccountUpdateCell from 'src/components/Account/AccountUpdateCell'

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
        <AccountUpdateCell id={id} />
      </div>
    </>
  )
}

export default AccountPage