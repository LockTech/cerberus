import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'
import { MenuIcon } from '@heroicons/react/solid'

import { AppbarTitleAtom } from 'src/atoms/AppbarTitle'
import { SidebarOpenAtom } from 'src/atoms/SidebarOpen'

import AppMenu from 'src/components/AppMenu'

import './Appbar.css'

const Appbar = () => {
  const { t } = useTranslation()

  const title = useRecoilValue(AppbarTitleAtom)

  const [sidebarOpen, setSidebarOpen] = useRecoilState(SidebarOpenAtom)

  return (
    <header className="appbar">
      <button
        aria-label={t('App.Bar.sidebarToggle')}
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <MenuIcon className="icon" />
      </button>
      {title !== '' && typeof title === 'string' && <h1>{title}</h1>}
      <div className="actions">
        <AppMenu />
      </div>
    </header>
  )
}

export default Appbar
