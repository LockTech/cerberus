import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { Transition } from '@headlessui/react'
import { routes, navigate, useMatch } from '@redwoodjs/router'

import { SidebarOpenAtom } from 'src/atoms/SidebarOpen'

import { useCloseSidebarOnNavigate } from 'src/hooks/useCloseSidebarOnNavigate'
import { useScreenWidth } from 'src/hooks/useScreenWidth'

import './Sidebar.css'

const Sidebar = () => {
  const { t } = useTranslation()

  useCloseSidebarOnNavigate()

  const [sidebarOpen, setSidebarOpen] = useRecoilState(SidebarOpenAtom)

  const width = useScreenWidth()

  const home = useMatch(routes.home()).match
  //
  const accountActivity = false
  const listAccounts = useMatch(routes.listAccounts()).match
  const listRoles = false
  //
  const orgSettings = false

  const responsiveSidebarOpen = width >= 1024 ? true : sidebarOpen

  return (
    <>
      {width < 1024 && (
        <Transition
          as="div"
          aria-hidden="true"
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          enter="duration-100 ease-in-out transition-opacity"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="duration-100 ease-in-out transition-opacity"
          leaveFrom="opacity-50"
          leaveTo="opacity-0"
          show={responsiveSidebarOpen}
        />
      )}
      <Transition
        appear
        className="sidebar"
        enter="duration-300 ease-in-out transition-transform transform-gpu"
        enterFrom="-translate-x-64 opacity-0"
        enterTo="translate-x-0 opacity-100"
        leave="duration-300 ease-in-out transition-transform transform-gpu"
        leaveFrom="translate-x-0 opacity-100"
        leaveTo="-translate-x-64 opacity-0"
        show={responsiveSidebarOpen}
      >
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
            <p className="nav-group-title">
              {t('Sidebar.nav.organization.title')}
            </p>
            <button className={clsx(orgSettings && 'active')}>
              {t('Sidebar.nav.organization.settings')}
            </button>
          </div>
        </nav>
      </Transition>
    </>
  )
}

export default Sidebar
