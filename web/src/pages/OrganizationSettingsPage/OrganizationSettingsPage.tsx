import { useTranslation } from 'react-i18next'
import { Helmet } from '@redwoodjs/web'

import AppbarTitle from 'src/components/Appbar/AppbarTitle'

const OrganizationSettingsPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('Organization.Settings.Page.Helmet.title')}</title>
      </Helmet>
      <AppbarTitle>{t('Organization.Settings.Page.Appbar.title')}</AppbarTitle>
    </>
  )
}

export default OrganizationSettingsPage
