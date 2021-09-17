import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'
import { Menu, Transition } from '@headlessui/react'
import { CogIcon, LogoutIcon, UserCircleIcon } from '@heroicons/react/solid'

import { AppSettingsModalAtom } from 'src/context/AppSettingsModal'

import AppSettingsCell from 'src/components/App/AppSettingsCell'

import { useAuth } from 'src/hooks/useAuth'

import './AppMenu.css'

const AppMenu = () => {
  const { t } = useTranslation()

  const { currentUser, logOut } = useAuth()

  const setSettingsModalOpen = useSetRecoilState(AppSettingsModalAtom)

  return (
    <>
      <AppSettingsCell />
      <Menu as="div" className="menu account-menu">
        <Menu.Button as="button" className="account-menu-button">
          <div className="title-group">
            <span className="hint">{currentUser?.organization?.name}</span>
            <span className="title">{currentUser?.name}</span>
          </div>
          <div>
            <UserCircleIcon
              aria-label={t('App.Menu.accountProfile')}
              className="icon"
            />
          </div>
        </Menu.Button>
        <Transition
          as={React.Fragment}
          enter="duration-400 sm:duration-300 ease-in-out origin-bottom sm:origin-top-right transition transform"
          enterFrom="opacity-0 scale-y-90 sm:scale-90"
          enterTo="opacity-100 scale-y-100"
          leave="duration-300 sm:duration-200 ease-in-out origin-bottom sm:origin-top-right transition transform"
          leaveFrom="opacity-100 scale-y-100"
          leaveTo="opacity-0 scale-y-90 sm:scale-90"
        >
          <Menu.Items as="div" className="menu-items menu-items-right">
            <Menu.Item
              as="button"
              className={({ active }) =>
                clsx('menu-item', active && 'menu-item-active')
              }
              onClick={() => setSettingsModalOpen(true)}
            >
              <CogIcon aria-hidden="true" className="icon" />
              <span>{t('App.Menu.items.settings')}</span>
            </Menu.Item>
            <Menu.Item
              as="button"
              className={({ active }) =>
                clsx('menu-item', active && 'menu-item-active', 'logout')
              }
              onClick={logOut}
            >
              <LogoutIcon aria-hidden="true" className="icon" />
              <span>{t('App.Menu.items.logout')}</span>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default AppMenu
