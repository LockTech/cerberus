import { useTranslation } from 'react-i18next'
import { MetaTags } from '@redwoodjs/web'

import AppbarTitle from 'src/components/App/Appbar/AppbarTitle'
import AccountDetailCell from 'src/components/Account/AccountDetailCell'

import './AccountPage.css'

export interface AccountPageProps {
  id: string
}

const AccountPage = ({ id }: AccountPageProps) => {
  const { t } = useTranslation()

  return (
    <>
      <MetaTags title={t('Account.Page.Helmet.title')} />
      <AppbarTitle>{t('Account.Page.Appbar.title')}</AppbarTitle>
      <AccountDetailCell id={id} />
    </>
  )
}

export default AccountPage
