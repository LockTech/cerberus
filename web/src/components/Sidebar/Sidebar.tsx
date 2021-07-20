import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { routes, useMatch } from '@redwoodjs/router'

import './Sidebar.css'

const Sidebar = () => {
  const { t } = useTranslation()

  return (
    <div className="sidebar">
      <nav>
        <button className={clsx(useMatch(routes.home()) && 'active')}>
          {t('Dashboard.Layout.sidebar.links.home')}
        </button>
        <button>An Example</button>
      </nav>
    </div>
  )
}

export default Sidebar
