import { useTranslation } from 'react-i18next'
import { MetaTags } from '@redwoodjs/web'

import AppbarTitle from 'src/components/App/Appbar/AppbarTitle'
import RoleUpdateCell from 'src/components/Role/RoleUpdateCell'

export interface RolePageProps {
  id: string
}

const RolePage = ({ id }: RolePageProps) => {
  const { t } = useTranslation()

  return (
    <>
      <MetaTags title={t('Role.Page.Helmet.title')} />
      <AppbarTitle>{t('Role.Page.Appbar.title')}</AppbarTitle>
      <RoleUpdateCell id={id} />
    </>
  )
}

export default RolePage
