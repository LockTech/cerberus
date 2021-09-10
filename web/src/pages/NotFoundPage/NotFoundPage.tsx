import { navigate, routes } from '@redwoodjs/router'
import { useTranslation } from 'react-i18next'

import { SupportURL } from 'src/constants/variables'

import './NotFoundPage.css'

export default () => {
  const { t } = useTranslation()

  return (
    <main className="notFound-page">
      <section className="wrapper">
        <div className="content">
          <header className="space-y-1">
            <h1 className="text title">{t('NotFound.Page.title')}</h1>
          </header>
          <div className="actions">
            <button
              className="btn btn-primary w-full"
              onClick={() => navigate(routes.home())}
            >
              {t('FatalError.Page.actions.dashboard')}
            </button>
            <button
              className="btn w-full"
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
