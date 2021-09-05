import { useTranslation } from 'react-i18next'
import { Helmet } from '@redwoodjs/web'

import AppbarTitle from 'src/components/Appbar/AppbarTitle'
import RoleUpdateCell from 'src/components/RoleUpdateCell'

export interface RolePageProps {
  id: string
}

const RolePage = ({ id }: RolePageProps) => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('Role.Page.Helmet.title')}</title>
      </Helmet>
      <AppbarTitle>{t('Role.Page.Appbar.title')}</AppbarTitle>
      <div className="page-layout">
        <RoleUpdateCell id={id} />
      </div>
    </>
  )
}

export default RolePage
