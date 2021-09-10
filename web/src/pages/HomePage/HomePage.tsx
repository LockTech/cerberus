import { useTranslation } from 'react-i18next'
import { MetaTags } from '@redwoodjs/web'

import AppbarTitle from 'src/components/App/Appbar/AppbarTitle'

const HomePage = () => {
  const { t } = useTranslation()

  return (
    <>
      <MetaTags title={t('Home.Page.Helmet.title')} />
      <AppbarTitle>{t('Home.Page.Appbar.title')}</AppbarTitle>
    </>
  )
}

export default HomePage
