import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { navigate, routes, useMatch } from '@redwoodjs/router'

import './SidebarNav.css'

const SidebarNav = () => {
  const { t } = useTranslation()

  // const home = useMatch(routes.home()).match
  //
  // const accountActivity = false
  const accountsMatch = useMatch(routes.listAccounts()).match
  const accountMatch = useMatch(routes.account()).match
  const accounts = accountsMatch || accountMatch
  //
  const rolesMatch = useMatch(routes.listRoles()).match
  const roleMatch = useMatch(routes.role()).match
  const roles = rolesMatch || roleMatch
  //
  const orgSettings = useMatch(routes.organization()).match

  return (
    <nav>
      {/* Members */}
      <div className="nav-group">
        <p className="nav-group-title">{t('Sidebar.Nav.members.title')}</p>
        <button
          className={clsx(accounts && 'active')}
          onClick={() => navigate(routes.listAccounts())}
        >
          {t('Sidebar.Nav.members.accounts')}
        </button>
        <button
          className={clsx(roles && 'active')}
          onClick={() => navigate(routes.listRoles())}
        >
          {t('Sidebar.Nav.members.roles')}
        </button>
      </div>
      {/* Organization */}
      <div className="nav-group">
        <p className="nav-group-title">{t('Sidebar.Nav.organization.title')}</p>
        <button
          className={clsx(orgSettings && 'active')}
          onClick={() => navigate(routes.organization())}
        >
          {t('Sidebar.Nav.organization.details')}
        </button>
      </div>
    </nav>
  )
}

export default SidebarNav
