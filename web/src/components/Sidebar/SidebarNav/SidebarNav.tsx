import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { navigate, routes, useMatch } from '@redwoodjs/router'

import './SidebarNav.css'

const SidebarNav = () => {
  const { t } = useTranslation()

  const home = useMatch(routes.home()).match
  //
  // const accountActivity = false
  const listAccountsMatch = useMatch(routes.listAccounts()).match
  const accountMatch = useMatch(routes.account()).match
  const listAccounts = listAccountsMatch || accountMatch
  //
  const listRolesMatch = useMatch(routes.listRoles()).match
  const roleMatch = useMatch(routes.role()).match
  const listRoles = listRolesMatch || roleMatch
  //
  const orgSettings = useMatch(routes.organization()).match

  return (
    <nav>
      {/* General */}
      <div className="nav-group">
        <p className="nav-group-title">{t('Sidebar.Nav.general.title')}</p>
        <button
          className={clsx(home && 'active')}
          onClick={() => navigate(routes.home())}
        >
          {t('Sidebar.Nav.general.dashboard')}
        </button>
      </div>
      {/* Members */}
      <div className="nav-group">
        <p className="nav-group-title">{t('Sidebar.Nav.members.title')}</p>
        {/* <button className={clsx(accountActivity && 'active')}>
          {t('Sidebar.Nav.members.activity')}
        </button> */}
        <button
          className={clsx(listAccounts && 'active')}
          onClick={() => navigate(routes.listAccounts())}
        >
          {t('Sidebar.Nav.members.listAccounts')}
        </button>
        <button
          className={clsx(listRoles && 'active')}
          onClick={() => navigate(routes.listRoles())}
        >
          {t('Sidebar.Nav.members.listRoles')}
        </button>
      </div>
      {/* Organization */}
      <div className="nav-group">
        <p className="nav-group-title">{t('Sidebar.Nav.organization.title')}</p>
        <button
          className={clsx(orgSettings && 'active')}
          onClick={() => navigate(routes.organization())}
        >
          {t('Sidebar.Nav.organization.settings')}
        </button>
      </div>
    </nav>
  )
}

export default SidebarNav
