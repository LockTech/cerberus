import { useTranslation } from 'react-i18next'
import { Redirect, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import AppbarTitle from 'src/components/App/Appbar/AppbarTitle'

const HomePage = () => {
  const { t } = useTranslation()

  return (
    <>
      <MetaTags title={t('Home.Page.Helmet.title')} />
      <AppbarTitle>{t('Home.Page.Appbar.title')}</AppbarTitle>
      <Redirect to={routes.listAccounts()} />
    </>
  )
}

export default HomePage
