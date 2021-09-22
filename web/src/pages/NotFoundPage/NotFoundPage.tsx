import { useTranslation } from 'react-i18next'
import { Link, routes, useLocation } from '@redwoodjs/router'

import { SupportURL } from 'src/constants/variables'

import ColorModeLayout from 'src/layouts/ColorModeLayout'

export default () => {
  const { t } = useTranslation()

  const { pathname } = useLocation()

  return (
    <ColorModeLayout>
      <main>
        <section className="status-page">
          <div className="card body">
            <header className="space-y-1">
              <h1 className="text title">Page Not Found</h1>
            </header>
            <div className="content">
              <p className="text">{t('NotFound.Page.path')}</p>
              <p className="bg-gray-50 dark:bg-gray-900 p-2 font-mono text-red-600 dark:text-red-300">
                {pathname}
              </p>
              <p className="text">{t('NotFound.Page.support')}</p>
            </div>
            <div className="actions">
              <Link className="btn btn-primary-ghost" to={routes.home()}>
                {t('NotFound.Page.actions.dashboard')}
              </Link>
              <a
                className="btn btn-ghost"
                href={SupportURL}
                rel="noreferrer"
                target="_blank"
              >
                {t('NotFound.Page.actions.support')}
              </a>
            </div>
          </div>
        </section>
      </main>
    </ColorModeLayout>
  )
}
