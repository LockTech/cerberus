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
      <Menu as="div" className="account-menu">
        <Menu.Button as="button" className="menu-button">
          {currentAccount && (
            <span className="title">{`${currentAccount.firstName} ${currentAccount.lastName}`}</span>
          )}
          <UserCircleIcon
            aria-label={t('AccountMenu.accountProfile')}
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
            <Menu.Item
              as="button"
              className="menu-item"
              onClick={() => setSettingsModalOpen(true)}
            >
              <CogIcon aria-hidden="true" className="icon" />
              {t('AccountMenu.items.settings')}
            </Menu.Item>
            <Menu.Item
              as="button"
              className="menu-item logout"
              onClick={() => logOut()}
            >
              <LogoutIcon aria-hidden="true" className="icon" />
              {t('AccountMenu.items.logout')}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default AccountMenu
