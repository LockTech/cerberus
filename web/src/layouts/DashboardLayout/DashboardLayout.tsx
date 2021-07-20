import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { routes, useMatch } from '@redwoodjs/router'

import Appbar from 'src/components/Appbar'

type DashboardLayoutProps = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row h-full">
      <div className="sidebar">
        <div className="site-title">
          <h1>{t('Dashboard.Layout.sidebar.appname')}</h1>
        </div>
        <nav>
          <button className={clsx(useMatch(routes.home()) && 'active')}>
            {t('Dashboard.Layout.sidebar.links.home')}
          </button>
          <button>An Example</button>
        </nav>
      </div>
      <div className="flex flex-col w-full">
        <Appbar />
        <main className="p-9">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
