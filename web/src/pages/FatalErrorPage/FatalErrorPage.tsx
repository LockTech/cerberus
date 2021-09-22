import { navigate, routes } from '@redwoodjs/router'
import { useTranslation } from 'react-i18next'

import { SupportURL } from 'src/constants/variables'

export default () => {
  const { t } = useTranslation()

  return (
    <main>
      <section className="status-page">
        <div className="card body">
          <header className="space-y-1">
            <h1 className="text title">{t('FatalError.Page.title')}</h1>
          </header>
          <div className="content">
            <p className="text">{t('FatalError.Page.error')}</p>
            <p className="text">{t('FatalError.Page.support')}</p>
          </div>
          <div className="actions">
            <button
              className="btn btn-primary-ghost"
              onClick={() => navigate(routes.home())}
            >
              {t('FatalError.Page.actions.dashboard')}
            </button>
            <a
              className="btn btn-ghost"
              href={SupportURL}
              rel="noreferrer"
              target="_blank"
            >
              {t('FatalError.Page.actions.support')}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
