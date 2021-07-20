import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { routes, navigate, useMatch } from '@redwoodjs/router'

import './Sidebar.css'

const Sidebar = () => {
  const { t } = useTranslation()

  const home = useMatch(routes.home()).match
  const listAccounts = useMatch(routes.listAccounts()).match

  return (
    <div className="sidebar">
      <div className="title">
        <h1>{t('Sidebar.title')}</h1>
        <p className="hint">{t('Sidebar.subtitle')}</p>
      </div>
      <nav>
        <button
          className={clsx(home && 'active')}
          onClick={() => navigate(routes.home())}
        >
          {t('Sidebar.nav.dashboard')}
        </button>
        <button
          className={clsx(listAccounts && 'active')}
          onClick={() => navigate(routes.listAccounts())}
        >
          {t('Sidebar.nav.listAccounts')}
        </button>
      </nav>
    </div>
  )
}

export default Sidebar
