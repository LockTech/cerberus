import { Helmet } from '@redwoodjs/web'
import { useTranslation } from 'react-i18next'

import AppbarTitle from 'src/components/Appbar/AppbarTitle'

const RoleListPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('Role.List.Page.Helmet.title')}</title>
      </Helmet>
      <AppbarTitle>{t('Role.List.Page.Appbar.title')}</AppbarTitle>
    </>
  )
}

export default RoleListPage
