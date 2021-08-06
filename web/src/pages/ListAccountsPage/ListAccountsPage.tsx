import { useTranslation } from 'react-i18next'
import { Helmet } from '@redwoodjs/web'

import AppbarTitle from 'src/components/Appbar/AppbarTitle'
import AccountInviteModal from 'src/components/AccountInviteModal'
import AccountListCell from 'src/components/AccountListCell'

const ListAccountsPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('Accounts.List.Page.Helmet.title')}</title>
      </Helmet>
      <AppbarTitle>{t('Accounts.List.Page.Appbar.title')}</AppbarTitle>
      <div className="page-layout">
        <AccountInviteModal />
        <AccountListCell />
      </div>
    </>
  )
}

export default ListAccountsPage
