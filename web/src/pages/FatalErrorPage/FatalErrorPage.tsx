import { navigate, routes } from '@redwoodjs/router'
import { useTranslation } from 'react-i18next'

import { SupportURL } from 'src/constants/variables'

import './FatalErrorPage.css'

export default () => {
  const { t } = useTranslation()

  return (
    <main className="fatal-page">
      <section className="wrapper">
        <div className="content">
          <header className="title-group">
            <h1 className="title">{t('FatalError.Page.title')}</h1>
            <p className="text">{t('FatalError.Page.subtitle')}</p>
          </header>
          <div className="actions">
            <button
              className="button-primary-fill w-full"
              onClick={() => navigate(routes.home())}
            >
              {t('FatalError.Page.actions.dashboard')}
            </button>
            <button
              className="button-gray-outline w-full"
              onClick={() => (window.location.href = SupportURL)}
            >
              {t('FatalError.Page.actions.support')}
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
