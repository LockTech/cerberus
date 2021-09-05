import { Helmet } from '@redwoodjs/web'
import { useTranslation } from 'react-i18next'

import AppbarTitle from 'src/components/App/Appbar/AppbarTitle'
import RoleCreateModal from 'src/components/Role/RoleCreateModal'
import RoleListCell from 'src/components/Role/RoleListCell'

const RoleListPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('Role.List.Page.Helmet.title')}</title>
      </Helmet>
      <AppbarTitle>{t('Role.List.Page.Appbar.title')}</AppbarTitle>
      <div className="page-layout">
        <RoleCreateModal />
        <RoleListCell />
      </div>
    </>
  )
}

export default RoleListPage
