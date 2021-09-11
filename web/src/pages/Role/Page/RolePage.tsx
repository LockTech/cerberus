import { useTranslation } from 'react-i18next'
import { MetaTags } from '@redwoodjs/web'

import AppbarTitle from 'src/components/App/Appbar/AppbarTitle'
import RoleDetailCell from 'src/components/Role/RoleDetailCell'

export interface RolePageProps {
  id: string
}

const RolePage = ({ id }: RolePageProps) => {
  const { t } = useTranslation()

  return (
    <>
      <MetaTags title={t('Role.Page.Helmet.title')} />
      <AppbarTitle>{t('Role.Page.Appbar.title')}</AppbarTitle>
      <RoleDetailCell id={id} />
    </>
  )
}

export default RolePage
