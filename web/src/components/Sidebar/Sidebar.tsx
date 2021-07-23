import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { routes, navigate, useMatch } from '@redwoodjs/router'

import './Sidebar.css'

const Sidebar = () => {
  const { t } = useTranslation()

  const home = useMatch(routes.home()).match
  //
  const activity = false
  const listAccounts = useMatch(routes.listAccounts()).match
  const listRoles = false

  return (
    <div className="sidebar">
      <div className="title">
        <h1>{t('Sidebar.title')}</h1>
        <p className="hint">{t('Sidebar.subtitle')}</p>
      </div>
      <nav>
        <div className="nav-group">
          <p className="nav-group-title">{t('Sidebar.nav.general.title')}</p>
          <button
            className={clsx(home && 'active')}
            onClick={() => navigate(routes.home())}
          >
            {t('Sidebar.nav.general.dashboard')}
          </button>
        </div>
        <div className="nav-group">
          <p className="nav-group-title">{t('Sidebar.nav.accounts.title')}</p>
          <button className={clsx(activity && 'active')}>
            {t('Sidebar.nav.accounts.activity')}
          </button>
          <button
            className={clsx(listAccounts && 'active')}
            onClick={() => navigate(routes.listAccounts())}
          >
            {t('Sidebar.nav.accounts.listAccounts')}
          </button>
          <button className={clsx(listRoles && 'active')}>
            {t('Sidebar.nav.accounts.listRoles')}
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
