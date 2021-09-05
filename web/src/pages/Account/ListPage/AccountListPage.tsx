import { useTranslation } from 'react-i18next'
import { Helmet } from '@redwoodjs/web'

import AppbarTitle from 'src/components/Appbar/AppbarTitle'
import AccountInviteModal from 'src/components/AccountInviteModal'
import AccountListCell from 'src/components/AccountListCell'

const AccountListPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('Account.List.Page.Helmet.title')}</title>
      </Helmet>
      <AppbarTitle>{t('Account.List.Page.Appbar.title')}</AppbarTitle>
      <div className="page-layout">
        <AccountInviteModal />
        <AccountListCell />
      </div>
    </>
  )
}

export default AccountListPage
