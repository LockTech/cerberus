import { Helmet } from '@redwoodjs/web'
import { useTranslation } from 'react-i18next'

import AppbarTitle from 'src/components/Appbar/AppbarTitle'
import RoleCreateModal from 'src/components/RoleCreateModal'

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
      </div>
    </>
  )
}

export default RoleListPage
