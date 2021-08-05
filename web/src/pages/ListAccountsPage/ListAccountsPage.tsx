import { useTranslation } from 'react-i18next'
import { Helmet } from '@redwoodjs/web'

import AppbarTitle from 'src/components/Appbar/AppbarTitle'
import AccountInviteModal from 'src/components/AccountInviteModal/AccountInviteModal'

const ListAccountsPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('Accounts.List.Page.Helmet.title')}</title>
      </Helmet>
      <AppbarTitle>{t('Accounts.List.Page.Appbar.title')}</AppbarTitle>
      <AccountInviteModal />
    </>
  )
}

export default ListAccountsPage
