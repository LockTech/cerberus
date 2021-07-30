import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'
import { MenuIcon } from '@heroicons/react/solid'

import { AppbarTitleAtom } from 'src/atoms/AppbarTitle'
import { SidebarOpenAtom } from 'src/atoms/SidebarOpen'

import AccountMenu from 'src/components/AccountMenu'

import './Appbar.css'

const Appbar = () => {
  const { t } = useTranslation()

  const title = useRecoilValue(AppbarTitleAtom)

  const [sidebarOpen, setSidebarOpen] = useRecoilState(SidebarOpenAtom)

  return (
    <div className="appbar">
      <button
        aria-label={t('Appbar.sidebarToggle')}
        className="menu-button sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <MenuIcon className="icon" />
      </button>
      {title !== '' && typeof title === 'string' && <h2>{title}</h2>}
      <div className="actions">
        <AccountMenu />
      </div>
    </div>
  )
}

export default Appbar
