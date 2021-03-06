import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'
import { MenuIcon } from '@heroicons/react/solid'

import { AppbarTitleAtom } from 'src/context/AppbarTitle'
import { SidebarOpenAtom } from 'src/context/SidebarOpen'

import AppMenu from 'src/components/App/AppMenu'

import './Appbar.css'

const Appbar = () => {
  const { t } = useTranslation()

  const title = useRecoilValue(AppbarTitleAtom)

  const [sidebarOpen, setSidebarOpen] = useRecoilState(SidebarOpenAtom)

  return (
    <header className="appbar">
      <div className="appbar-left">
        <button
          aria-label={t('App.Bar.sidebarToggle')}
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <MenuIcon aria-hidden="true" className="icon" />
        </button>
        {title !== '' && typeof title === 'string' && <h1>{title}</h1>}
      </div>
      <div className="actions">
        <AppMenu />
      </div>
    </header>
  )
}

export default Appbar
