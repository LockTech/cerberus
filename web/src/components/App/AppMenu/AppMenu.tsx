import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'
import { Menu, Transition } from '@headlessui/react'
import { CogIcon, LogoutIcon, UserCircleIcon } from '@heroicons/react/solid'
import { useAuth } from '@redwoodjs/auth'

import { AppSettingsModalAtom } from 'src/atoms/AppSettingsModal'

import AppSettingsModal from 'src/components/App/AppSettingsModal'

import { useCurrentAccount } from 'src/hooks/useCurrentAccount'

import './AppMenu.css'

const AppMenu = () => {
  const { t } = useTranslation()

  const currentAccount = useCurrentAccount()
  const setSettingsModalOpen = useSetRecoilState(AppSettingsModalAtom)

  const { logOut } = useAuth()

  return (
    <>
      <AppSettingsModal />
      <Menu as="div" className="account-menu menu">
        <Menu.Button as="button" className="account-menu-button">
          <div className="title-group">
            <span className="hint">{currentAccount?.organization?.name}</span>
            <span className="title">{currentAccount?.name}</span>
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
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="menu-items">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={clsx('menu-item', active && 'active')}
                  onClick={() => setSettingsModalOpen(true)}
                >
                  <CogIcon aria-hidden="true" className="icon" />
                  {t('App.Menu.items.settings')}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={clsx('menu-item logout', active && 'active')}
                  onClick={() => logOut()}
                >
                  <LogoutIcon aria-hidden="true" className="icon" />
                  {t('App.Menu.items.logout')}
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default AppMenu
