import { useTranslation } from 'react-i18next'
import { Helmet } from '@redwoodjs/web'

import AppbarTitle from 'src/components/Appbar/AppbarTitle'

import './HomePage.css'

const HomePage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('Home.Page.Helmet.title')}</title>
      </Helmet>
      <AppbarTitle>{t('Home.Page.Appbar.title')}</AppbarTitle>
    </>
  )
}

export default HomePage
