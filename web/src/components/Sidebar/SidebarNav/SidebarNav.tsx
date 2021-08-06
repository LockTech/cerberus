import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { navigate, routes, useMatch } from '@redwoodjs/router'

import './SidebarNav.css'

const SidebarNav = () => {
  const { t } = useTranslation()

  const home = useMatch(routes.home()).match
  //
  const accountActivity = false
  const listAccountsMatch = useMatch(routes.listAccounts()).match
  const accountMatch = useMatch(routes.account()).match
  const listAccounts = listAccountsMatch || accountMatch
  const listRoles = false
  //
  const orgSettings = useMatch(routes.organizationSettings()).match

  return (
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
        <button className={clsx(accountActivity && 'active')}>
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
      <div className="nav-group">
        <p className="nav-group-title">{t('Sidebar.nav.organization.title')}</p>
        <button
          className={clsx(orgSettings && 'active')}
          onClick={() => navigate(routes.organizationSettings())}
        >
          {t('Sidebar.nav.organization.settings')}
        </button>
      </div>
    </nav>
  )
}

export default SidebarNav
