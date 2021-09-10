import { useTranslation } from 'react-i18next'
import { MetaTags } from '@redwoodjs/web'

import AppbarTitle from 'src/components/App/Appbar/AppbarTitle'
import AccountListCell from 'src/components/Account/AccountListCell'

const AccountListPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <MetaTags title={t('Account.List.Page.Helmet.title')} />
      <AppbarTitle>{t('Account.List.Page.Appbar.title')}</AppbarTitle>
      <AccountListCell />
    </>
  )
}

export default AccountListPage
