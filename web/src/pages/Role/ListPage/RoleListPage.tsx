import { useTranslation } from 'react-i18next'
import { MetaTags } from '@redwoodjs/web'

import AppbarTitle from 'src/components/App/Appbar/AppbarTitle'
import RoleListCell from 'src/components/Role/RoleListCell'

const RoleListPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <MetaTags title={t('Role.List.Page.Helmet.title')} />
      <AppbarTitle>{t('Role.List.Page.Appbar.title')}</AppbarTitle>
      <RoleListCell />
    </>
  )
}

export default RoleListPage
