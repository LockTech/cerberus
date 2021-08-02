import { useTranslation } from 'react-i18next'
import { Helmet } from '@redwoodjs/web'

import AppbarTitle from 'src/components/Appbar/AppbarTitle'
import OrganizationSettingsDangerCard from 'src/components/OrganizationSettingsDangerCard'
import OrganizationUpdateCell from 'src/components/OrganizationUpdateCell'

const OrganizationSettingsPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('Organization.Settings.Page.Helmet.title')}</title>
      </Helmet>
      <AppbarTitle>{t('Organization.Settings.Page.Appbar.title')}</AppbarTitle>
      <div className="page-layout">
        <OrganizationUpdateCell />
        <OrganizationSettingsDangerCard />
      </div>
    </>
  )
}

export default OrganizationSettingsPage
