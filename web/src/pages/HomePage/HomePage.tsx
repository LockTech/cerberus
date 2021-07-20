import { useTranslation } from 'react-i18next'
import { Helmet } from '@redwoodjs/web'

import './HomePage.css'

const HomePage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('Home.Page.Helmet.title')}</title>
      </Helmet>
      <div className="title-group">
        <h2 className="title">{t('Home.Page.title')}</h2>
        <p className="hint">{t('Home.Page.subtitle')}</p>
      </div>
    </>
  )
}

export default HomePage
