import { useTranslation } from 'react-i18next'
import { MetaTags } from '@redwoodjs/web'

import AppbarTitle from 'src/components/App/Appbar/AppbarTitle'
import OrganizationUpdateCell from 'src/components/Organization/OrganizationUpdateCell'

const OrganizationSettingsPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <MetaTags title={t('Organization.Settings.Page.Helmet.title')} />
      <AppbarTitle>{t('Organization.Settings.Page.Appbar.title')}</AppbarTitle>
      <OrganizationUpdateCell />
    </>
  )
}

export default OrganizationSettingsPage
