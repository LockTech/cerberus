import { useTranslation } from 'react-i18next'

import AppbarTitle from 'src/components/Appbar/AppbarTitle'

const ListAccountsPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <AppbarTitle>{t('Accounts.List.Page.Appbar.title')}</AppbarTitle>
    </>
  )
}

export default ListAccountsPage
