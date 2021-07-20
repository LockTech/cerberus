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
        <div>
          <p>{t('Sidebar.nav.general.title')}</p>
          <button
            className={clsx(home && 'active')}
            onClick={() => navigate(routes.home())}
          >
            {t('Sidebar.nav.general.dashboard')}
          </button>
        </div>
        <div>
          <p>{t('Sidebar.nav.identities.title')}</p>
          <button className={clsx(activity && 'active')}>
            {t('Sidebar.nav.identities.activity')}
          </button>
          <button
            className={clsx(listAccounts && 'active')}
            onClick={() => navigate(routes.listAccounts())}
          >
            {t('Sidebar.nav.identities.listAccounts')}
          </button>
          <button className={clsx(listRoles && 'active')}>
            {t('Sidebar.nav.identities.listRoles')}
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
