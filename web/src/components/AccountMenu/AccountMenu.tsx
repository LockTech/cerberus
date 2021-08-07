import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Menu, Transition } from '@headlessui/react'
import { CogIcon, LogoutIcon, UserCircleIcon } from '@heroicons/react/solid'
import { useAuth } from '@redwoodjs/auth'

import { CurrentAccountAtom } from 'src/atoms/CurrentAccount'
import { AppSettingsModalAtom } from 'src/atoms/AppSettingsModal'

import AppSettingsModal from 'src/components/AppSettingsModal'

import './AccountMenu.css'

const AccountMenu = () => {
  const { t } = useTranslation()

  const currentAccount = useRecoilValue(CurrentAccountAtom)
  const setSettingsModalOpen = useSetRecoilState(AppSettingsModalAtom)

  const { logOut } = useAuth()

  return (
    <>
      <AppSettingsModal />
      <Menu as="div" className="menu">
        <Menu.Button as="button" className="account-menu">
          <div className="title-group">
            <span className="hint">{currentAccount?.organization?.name}</span>
            <span className="title">{currentAccount?.name}</span>
          </div>
          <UserCircleIcon
            aria-label={t('Account.Menu.accountProfile')}
            className="icon"
          />
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
                  {t('Account.Menu.items.settings')}
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
                  {t('Account.Menu.items.logout')}
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default AccountMenu
